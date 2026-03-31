/**
 * Generate a UUID v1 (time-based).
 * Uses current timestamp and random node ID.
 */
export function generateUUIDv1() {
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

	const hex = (val, len) => val.toString(16).padStart(len, '0');

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
export function generateUUIDv4() {
	return crypto.randomUUID();
}

/**
 * Generate a UUID v7 (Unix Epoch time-based, sortable).
 * Per RFC 9562.
 */
export function generateUUIDv7() {
	const now = Date.now();
	const timestamp = BigInt(now);

	const randomBytes = new Uint8Array(10);
	crypto.getRandomValues(randomBytes);

	// Bytes 0-5: 48-bit timestamp (big-endian)
	const bytes = new Uint8Array(16);
	bytes[0] = Number((timestamp >> 40n) & 0xffn);
	bytes[1] = Number((timestamp >> 32n) & 0xffn);
	bytes[2] = Number((timestamp >> 24n) & 0xffn);
	bytes[3] = Number((timestamp >> 16n) & 0xffn);
	bytes[4] = Number((timestamp >> 8n) & 0xffn);
	bytes[5] = Number(timestamp & 0xffn);

	// Bytes 6-7: version (4 bits) + 12 bits random
	bytes[6] = (0x70 | (randomBytes[0] & 0x0f)); // version 7
	bytes[7] = randomBytes[1];

	// Bytes 8-9: variant (2 bits) + 6 bits random + 8 bits random
	bytes[8] = (0x80 | (randomBytes[2] & 0x3f)); // variant 10xx
	bytes[9] = randomBytes[3];

	// Bytes 10-15: 48 bits random
	bytes[10] = randomBytes[4];
	bytes[11] = randomBytes[5];
	bytes[12] = randomBytes[6];
	bytes[13] = randomBytes[7];
	bytes[14] = randomBytes[8];
	bytes[15] = randomBytes[9];

	const hex = (b) => b.toString(16).padStart(2, '0');
	const h = Array.from(bytes).map(hex);
	return [
		h.slice(0, 4).join(''),
		h.slice(4, 6).join(''),
		h.slice(6, 8).join(''),
		h.slice(8, 10).join(''),
		h.slice(10, 16).join(''),
	].join('-');
}
