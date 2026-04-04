import { describe, it, expect } from 'vitest';
import { SELF } from 'cloudflare:test';

describe('Worker', () => {
	it('responds with HTML containing UUIDs', async () => {
		const response = await SELF.fetch('https://uuid.arvid.tech/');
		expect(response.status).toBe(200);
		expect(response.headers.get('Content-Type')).toBe(
			'text/html;charset=UTF-8'
		);

		const html = await response.text();
		expect(html).toContain('UUID Generator');
		expect(html).toContain('UUID v4');
		expect(html).toContain('UUID v7');
		expect(html).toContain('UUID v1');
		expect(html).toContain('Recommended');
	});

	it('sets Cache-Control to no-store', async () => {
		const response = await SELF.fetch('https://uuid.arvid.tech/');
		expect(response.headers.get('Cache-Control')).toBe('no-store');
	});

	it('returns different UUIDs on each request', async () => {
		const response1 = await SELF.fetch('https://uuid.arvid.tech/');
		const response2 = await SELF.fetch('https://uuid.arvid.tech/');
		const html1 = await response1.text();
		const html2 = await response2.text();
		expect(html1).not.toBe(html2);
	});
});
