import { describe, it, expect } from 'vitest';
import { generateUUIDv1, generateUUIDv4, generateUUIDv7 } from '../src/uuid';

const UUID_REGEX =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

describe('generateUUIDv1', () => {
	it('returns a valid UUID string', () => {
		const uuid = generateUUIDv1();
		expect(uuid).toMatch(UUID_REGEX);
	});

	it('has version 1 in the version nibble', () => {
		const uuid = generateUUIDv1();
		expect(uuid[14]).toBe('1');
	});

	it('has correct variant bits', () => {
		const uuid = generateUUIDv1();
		const variantNibble = parseInt(uuid[19], 16);
		// variant bits should be 10xx (0x8-0xb)
		expect(variantNibble).toBeGreaterThanOrEqual(0x8);
		expect(variantNibble).toBeLessThanOrEqual(0xb);
	});

	it('generates unique values', () => {
		const uuids = new Set(Array.from({ length: 50 }, () => generateUUIDv1()));
		expect(uuids.size).toBe(50);
	});
});

describe('generateUUIDv4', () => {
	it('returns a valid UUID string', () => {
		const uuid = generateUUIDv4();
		expect(uuid).toMatch(UUID_REGEX);
	});

	it('has version 4 in the version nibble', () => {
		const uuid = generateUUIDv4();
		expect(uuid[14]).toBe('4');
	});

	it('has correct variant bits', () => {
		const uuid = generateUUIDv4();
		const variantNibble = parseInt(uuid[19], 16);
		expect(variantNibble).toBeGreaterThanOrEqual(0x8);
		expect(variantNibble).toBeLessThanOrEqual(0xb);
	});

	it('generates unique values', () => {
		const uuids = new Set(Array.from({ length: 50 }, () => generateUUIDv4()));
		expect(uuids.size).toBe(50);
	});
});

describe('generateUUIDv7', () => {
	it('returns a valid UUID string', () => {
		const uuid = generateUUIDv7();
		expect(uuid).toMatch(UUID_REGEX);
	});

	it('has version 7 in the version nibble', () => {
		const uuid = generateUUIDv7();
		expect(uuid[14]).toBe('7');
	});

	it('has correct variant bits', () => {
		const uuid = generateUUIDv7();
		const variantNibble = parseInt(uuid[19], 16);
		expect(variantNibble).toBeGreaterThanOrEqual(0x8);
		expect(variantNibble).toBeLessThanOrEqual(0xb);
	});

	it('generates unique values', () => {
		const uuids = new Set(Array.from({ length: 50 }, () => generateUUIDv7()));
		expect(uuids.size).toBe(50);
	});

	it('encodes a recent timestamp in the first 48 bits', () => {
		const before = Date.now();
		const uuid = generateUUIDv7();
		const after = Date.now();
		const hexTimestamp = uuid.replace(/-/g, '').slice(0, 12);
		const ts = parseInt(hexTimestamp, 16);
		expect(ts).toBeGreaterThanOrEqual(before);
		expect(ts).toBeLessThanOrEqual(after);
	});

	it('is monotonically increasing when generated in rapid succession', () => {
		const uuids = Array.from({ length: 100 }, () => generateUUIDv7());
		for (let i = 1; i < uuids.length; i++) {
			expect(uuids[i] > uuids[i - 1]).toBe(true);
		}
	});
});
