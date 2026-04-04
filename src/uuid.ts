/**
 * Generate a UUID v1 (time-based).
 * Uses current timestamp and random node ID.
 */
export function generateUUIDv1(): string {
	const now = Date.now();
	// UUID epoch offset: difference between UUID epoch (1582-10-15) and Unix epoch (1970-01-01) in ms
	const UUID_EPOCH_OFFSET = 122192928000000000n;
	// Convert current time to 100-nanosecond intervals since UUID epoch
	const timestamp = BigInt(now) * 10000n + UUID_EPOCH_OFFSET;

	const timeLow = timestamp & 0xffffffffn;
	const timeMid = (timestamp >> 32n) & 0xffffn;
	const timeHiAndVersion = ((timestamp >> 48n) & 0x0fffn) | 0x1000n; // version 1

	// Random clock sequence (14 bits) with variant bits
	const randomBytes = new Uint8Array(8);
	crypto.getRandomValues(randomBytes);
	const clockSeq =
		(((randomBytes[0] & 0x3f) << 8) | randomBytes[1]) & 0x3fff;
	const clockSeqHiAndVariant = ((clockSeq >> 8) & 0x3f) | 0x80; // variant 10xx
	const clockSeqLow = clockSeq & 0xff;

	// Random node (6 bytes) with multicast bit set to indicate random
	const node = randomBytes.slice(2, 8);
	node[0] |= 0x01; // set multicast bit

	const hex = (val: number, len: number) => val.toString(16).padStart(len, '0');

	return [
		hex(Number(timeLow), 8),
		hex(Number(timeMid), 4),
		hex(Number(timeHiAndVersion), 4),
		hex(clockSeqHiAndVariant, 2) + hex(clockSeqLow, 2),
		Array.from(node)
			.map((b) => hex(b, 2))
			.join(''),
	].join('-');
}

/**
 * Generate a UUID v4 (random).
 * Uses the built-in crypto.randomUUID().
 */
export function generateUUIDv4(): string {
	return crypto.randomUUID();
}

// Monotonic state for UUIDv7 — ensures strict ordering within a millisecond
// per RFC 9562 Section 6.2 Method 3 (fixed-length dedicated counter).
let v7LastTimestamp = -1;
let v7Counter = 0;

/**
 * Generate a UUID v7 (Unix Epoch time-based, sortable).
 * Per RFC 9562 with a monotonic counter in rand_a to guarantee strict
 * ordering when multiple UUIDs are generated within the same millisecond.
 */
export function generateUUIDv7(): string {
	const ms = Date.now();

	if (ms > v7LastTimestamp) {
		// New millisecond: advance the monotonic clock and reset the counter
		// to a random low value so the full rand_a range stays available.
		const seed = new Uint8Array(1);
		crypto.getRandomValues(seed);
		v7Counter = seed[0] & 0x0f; // 0–15 start offset keeps headroom
		v7LastTimestamp = ms;
	} else {
		// Same millisecond (or rare clock-skew): increment the counter.
		v7Counter++;
		if (v7Counter > 0xfff) {
			// Counter exhausted — advance the logical clock by one millisecond.
			v7LastTimestamp++;
			v7Counter = 0;
		}
	}

	// Always derive the UUID timestamp from the monotonic state, never from
	// the raw Date.now() value, so ordering is preserved even across clock skew.
	const timestamp = BigInt(v7LastTimestamp);
	const randA = v7Counter; // 12-bit monotonic counter in rand_a field

	// 8 random bytes for rand_b (bytes 8–15)
	const randomBytes = new Uint8Array(8);
	crypto.getRandomValues(randomBytes);

	const bytes = new Uint8Array(16);

	// Bytes 0–5: 48-bit Unix timestamp in milliseconds (big-endian)
	bytes[0] = Number((timestamp >> 40n) & 0xffn);
	bytes[1] = Number((timestamp >> 32n) & 0xffn);
	bytes[2] = Number((timestamp >> 24n) & 0xffn);
	bytes[3] = Number((timestamp >> 16n) & 0xffn);
	bytes[4] = Number((timestamp >> 8n) & 0xffn);
	bytes[5] = Number(timestamp & 0xffn);

	// Byte 6: version nibble (0x7) | top 4 bits of rand_a
	bytes[6] = 0x70 | ((randA >> 8) & 0x0f);
	// Byte 7: low 8 bits of rand_a
	bytes[7] = randA & 0xff;

	// Byte 8: variant bits (10xx) | 6 random bits
	bytes[8] = 0x80 | (randomBytes[0] & 0x3f);
	// Bytes 9–15: fully random (rand_b)
	bytes[9] = randomBytes[1];
	bytes[10] = randomBytes[2];
	bytes[11] = randomBytes[3];
	bytes[12] = randomBytes[4];
	bytes[13] = randomBytes[5];
	bytes[14] = randomBytes[6];
	bytes[15] = randomBytes[7];

	const h = Array.from(bytes).map((b) => b.toString(16).padStart(2, '0'));
	return [
		h.slice(0, 4).join(''),
		h.slice(4, 6).join(''),
		h.slice(6, 8).join(''),
		h.slice(8, 10).join(''),
		h.slice(10, 16).join(''),
	].join('-');
}
