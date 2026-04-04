import { describe, it, expect } from 'vitest';
import { SELF } from 'cloudflare:test';

describe('Worker — main page', () => {
	it('responds with HTML featuring UUID v7 as primary', async () => {
		const response = await SELF.fetch('https://uuid.arvid.tech/');
		expect(response.status).toBe(200);
		expect(response.headers.get('Content-Type')).toBe(
			'text/html;charset=UTF-8'
		);

		const html = await response.text();
		expect(html).toContain('UUID Generator');
		// v7 is the primary/best-choice UUID
		expect(html).toContain('UUID v7');
		expect(html).toContain('Best choice');
		// v4 is present as alternative
		expect(html).toContain('UUID v4');
		// Link to history page
		expect(html).toContain('/history');
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

describe('Worker — /history page', () => {
	it('responds with 200 and HTML', async () => {
		const response = await SELF.fetch('https://uuid.arvid.tech/history');
		expect(response.status).toBe(200);
		expect(response.headers.get('Content-Type')).toBe(
			'text/html;charset=UTF-8'
		);
	});

	it('sets Cache-Control to no-store', async () => {
		const response = await SELF.fetch('https://uuid.arvid.tech/history');
		expect(response.headers.get('Cache-Control')).toBe('no-store');
	});

	it('contains educational content about UUID versions', async () => {
		const response = await SELF.fetch('https://uuid.arvid.tech/history');
		const html = await response.text();
		expect(html).toContain('UUID Knowledge Base');
		expect(html).toContain('UUID v7');
		expect(html).toContain('UUID v4');
		expect(html).toContain('UUID v1');
		expect(html).toContain('birthday paradox');
		expect(html).toContain('2¹²²');
	});

	it('contains a link back to the generator', async () => {
		const response = await SELF.fetch('https://uuid.arvid.tech/history');
		const html = await response.text();
		expect(html).toContain('href="/"');
	});
});
