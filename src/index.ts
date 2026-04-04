import { generateUUIDv1, generateUUIDv4, generateUUIDv7 } from './uuid';

const COPY_ICON =
	'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';

/**
 * Build the main HTML page — features a single primary UUID (v7) with
 * alternative versions available at the bottom.
 */
function buildMainHTML(): string {
	const uuids = {
		v1: generateUUIDv1(),
		v4: generateUUIDv4(),
		v7: generateUUIDv7(),
	};

	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>UUID Generator</title>
	<style>
		* { margin: 0; padding: 0; box-sizing: border-box; }

		body {
			font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
			background: #0f172a;
			color: #e2e8f0;
			min-height: 100vh;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 1rem;
		}

		.container {
			max-width: 640px;
			width: 100%;
		}

		h1 {
			font-size: 1.5rem;
			font-weight: 600;
			text-align: center;
			margin-bottom: 0.5rem;
			color: #f8fafc;
		}

		.subtitle {
			text-align: center;
			font-size: 0.8rem;
			color: #64748b;
			margin-bottom: 2rem;
		}

		/* ── Primary UUID card ──────────────────────────────────── */
		.primary-card {
			background: #1e293b;
			border: 1px solid #3b82f6;
			border-radius: 0.75rem;
			padding: 1.5rem;
			margin-bottom: 1.5rem;
		}

		.primary-header {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			margin-bottom: 0.5rem;
		}

		.primary-version {
			font-size: 1rem;
			font-weight: 700;
			color: #f8fafc;
		}

		.badge-best {
			font-size: 0.625rem;
			font-weight: 700;
			text-transform: uppercase;
			letter-spacing: 0.05em;
			padding: 0.125rem 0.5rem;
			border-radius: 9999px;
			background: #3b82f620;
			color: #60a5fa;
		}

		.primary-description {
			font-size: 0.8rem;
			color: #94a3b8;
			margin-bottom: 1rem;
		}

		.uuid-value-row {
			display: flex;
			align-items: center;
			gap: 0.5rem;
		}

		.uuid-value {
			flex: 1;
			font-family: "SF Mono", "Fira Code", "Fira Mono", Menlo, Consolas, monospace;
			font-size: 0.95rem;
			color: #f1f5f9;
			background: #0f172a;
			padding: 0.625rem 0.75rem;
			border-radius: 0.5rem;
			border: 1px solid #334155;
			word-break: break-all;
			user-select: all;
		}

		.copy-btn {
			background: none;
			border: 1px solid #334155;
			border-radius: 0.5rem;
			padding: 0.625rem;
			cursor: pointer;
			color: #94a3b8;
			display: flex;
			align-items: center;
			justify-content: center;
			transition: all 0.15s ease;
			flex-shrink: 0;
		}

		.copy-btn:hover { background: #334155; color: #f1f5f9; }
		.copy-btn svg { width: 18px; height: 18px; }

		/* ── Regenerate button ──────────────────────────────────── */
		.actions {
			display: flex;
			justify-content: center;
			margin-bottom: 2.5rem;
		}

		.refresh-btn {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			background: #3b82f6;
			color: #fff;
			border: none;
			border-radius: 0.5rem;
			padding: 0.625rem 1.25rem;
			font-size: 0.875rem;
			font-weight: 500;
			cursor: pointer;
			transition: background 0.15s ease;
		}

		.refresh-btn:hover { background: #2563eb; }
		.refresh-btn svg { width: 16px; height: 16px; }

		/* ── Alternative versions ───────────────────────────────── */
		.alt-section-title {
			font-size: 0.75rem;
			font-weight: 600;
			text-transform: uppercase;
			letter-spacing: 0.08em;
			color: #475569;
			margin-bottom: 0.75rem;
		}

		.alt-card {
			background: #1e293b;
			border: 1px solid #1e293b;
			border-radius: 0.75rem;
			padding: 1rem 1.25rem;
			margin-bottom: 0.75rem;
			cursor: pointer;
			transition: border-color 0.15s ease;
		}

		.alt-card:hover { border-color: #475569; }
		.alt-card.active { border-color: #3b82f6; }

		.alt-header {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			margin-bottom: 0.5rem;
		}

		.alt-version {
			font-size: 0.875rem;
			font-weight: 600;
			color: #94a3b8;
		}

		.alt-description {
			font-size: 0.75rem;
			color: #64748b;
			margin-bottom: 0.625rem;
		}

		/* ── Footer ─────────────────────────────────────────────── */
		.footer {
			text-align: center;
			margin-top: 2rem;
			font-size: 0.75rem;
			color: #475569;
		}

		.footer a {
			color: #60a5fa;
			text-decoration: none;
		}

		.footer a:hover { text-decoration: underline; }
	</style>
</head>
<body>
	<div class="container">
		<h1>UUID Generator</h1>
		<p class="subtitle">Generating a fresh UUID v7 — the recommended modern choice.</p>

		<!-- Primary UUID: v7 -->
		<div class="primary-card">
			<div class="primary-header">
				<span class="primary-version" id="primary-label">UUID v7</span>
				<span class="badge-best">Best choice</span>
			</div>
			<p class="primary-description" id="primary-desc">Time-ordered &amp; sortable — embeds a millisecond-precision Unix timestamp in the first 48 bits, making it ideal for database primary keys and distributed systems while still being highly random.</p>
			<div class="uuid-value-row">
				<code class="uuid-value" id="primary-uuid">${uuids.v7}</code>
				<button class="copy-btn" aria-label="Copy UUID" onclick="copyUUID('primary-uuid')">${COPY_ICON}</button>
			</div>
		</div>

		<div class="actions">
			<button class="refresh-btn" onclick="window.location.reload()">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.992 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182M20.008 4.357v4.992"/></svg>
				Generate New UUID
			</button>
		</div>

		<!-- Alternative versions -->
		<p class="alt-section-title">Other versions</p>

		<div class="alt-card" id="alt-v4" onclick="selectVersion('v4')">
			<div class="alt-header">
				<span class="alt-version">UUID v4</span>
			</div>
			<p class="alt-description">Fully random — 122 bits of randomness, no embedded timestamp. Suitable for most general-purpose use cases.</p>
			<div class="uuid-value-row">
				<code class="uuid-value" id="uuid-v4">${uuids.v4}</code>
				<button class="copy-btn" aria-label="Copy UUID v4" onclick="event.stopPropagation(); copyUUID('uuid-v4')">${COPY_ICON}</button>
			</div>
		</div>

		<div class="alt-card" id="alt-v1" onclick="selectVersion('v1')">
			<div class="alt-header">
				<span class="alt-version">UUID v1</span>
			</div>
			<p class="alt-description">Time-based (legacy) — encodes a 100ns-precision timestamp with a random node ID. Largely superseded by v7.</p>
			<div class="uuid-value-row">
				<code class="uuid-value" id="uuid-v1">${uuids.v1}</code>
				<button class="copy-btn" aria-label="Copy UUID v1" onclick="event.stopPropagation(); copyUUID('uuid-v1')">${COPY_ICON}</button>
			</div>
		</div>

		<p class="footer">uuid.arvid.tech &mdash; <a href="/history">Learn how UUIDs work and why they&rsquo;re practically always unique &rarr;</a></p>
	</div>

	<script>
		const versions = {
			v7: {
				label: 'UUID v7',
				desc: 'Time-ordered &amp; sortable \u2014 embeds a millisecond-precision Unix timestamp in the first 48 bits, making it ideal for database primary keys and distributed systems while still being highly random.',
				value: ${JSON.stringify(uuids.v7)}
			},
			v4: {
				label: 'UUID v4',
				desc: 'Fully random \u2014 122 bits of randomness, no embedded timestamp. Suitable for most general-purpose use cases.',
				value: ${JSON.stringify(uuids.v4)}
			},
			v1: {
				label: 'UUID v1',
				desc: 'Time-based (legacy) \u2014 encodes a 100ns-precision timestamp with a random node ID. Largely superseded by v7.',
				value: ${JSON.stringify(uuids.v1)}
			}
		};

		let current = 'v7';

		function selectVersion(v) {
			if (v === current) return;
			// Swap current primary into its alt card
			versions[current].value = document.getElementById('primary-uuid').textContent;
			document.getElementById('uuid-' + current).textContent = versions[current].value;
			document.getElementById('alt-' + current).classList.remove('active');

			// Promote the selected version to primary
			current = v;
			document.getElementById('primary-label').textContent = versions[v].label;
			document.getElementById('primary-desc').innerHTML = versions[v].desc;
			document.getElementById('primary-uuid').textContent = versions[v].value;
			document.getElementById('alt-' + v).classList.add('active');
		}

		function copyUUID(id) {
			const text = document.getElementById(id).textContent;
			navigator.clipboard.writeText(text).then(function() {
				const el = document.getElementById(id);
				const btn = el.closest('.uuid-value-row').querySelector('.copy-btn');
				btn.style.color = '#4ade80';
				setTimeout(function() { btn.style.color = ''; }, 1000);
			});
		}
	</script>
</body>
</html>`;
}

/**
 * Build the /history page — educational content about UUIDs.
 */
function buildHistoryHTML(): string {
	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>UUID History &amp; Knowledge Base</title>
	<style>
		* { margin: 0; padding: 0; box-sizing: border-box; }

		body {
			font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
			background: #0f172a;
			color: #e2e8f0;
			min-height: 100vh;
			padding: 2rem 1rem 4rem;
		}

		.container {
			max-width: 720px;
			margin: 0 auto;
		}

		.back-link {
			display: inline-flex;
			align-items: center;
			gap: 0.4rem;
			font-size: 0.8rem;
			color: #60a5fa;
			text-decoration: none;
			margin-bottom: 2rem;
		}

		.back-link:hover { text-decoration: underline; }

		h1 {
			font-size: 1.75rem;
			font-weight: 700;
			color: #f8fafc;
			margin-bottom: 0.5rem;
		}

		.lead {
			font-size: 0.95rem;
			color: #94a3b8;
			margin-bottom: 2.5rem;
			line-height: 1.6;
		}

		h2 {
			font-size: 1.1rem;
			font-weight: 600;
			color: #f1f5f9;
			margin-bottom: 0.75rem;
			padding-top: 2rem;
			border-top: 1px solid #1e293b;
		}

		h2:first-of-type { border-top: none; padding-top: 0; }

		p {
			font-size: 0.9rem;
			line-height: 1.7;
			color: #cbd5e1;
			margin-bottom: 0.875rem;
		}

		.version-grid {
			display: grid;
			gap: 1rem;
			margin: 1.25rem 0;
		}

		.version-card {
			background: #1e293b;
			border: 1px solid #334155;
			border-radius: 0.75rem;
			padding: 1.25rem;
		}

		.version-card-header {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			margin-bottom: 0.625rem;
		}

		.version-label {
			font-size: 0.9rem;
			font-weight: 700;
			color: #f1f5f9;
		}

		.badge {
			font-size: 0.6rem;
			font-weight: 700;
			text-transform: uppercase;
			letter-spacing: 0.05em;
			padding: 0.1rem 0.45rem;
			border-radius: 9999px;
		}

		.badge-blue  { background: #3b82f620; color: #60a5fa; }
		.badge-green { background: #22c55e20; color: #4ade80; }
		.badge-slate { background: #47556920; color: #94a3b8; }

		.version-card p { margin-bottom: 0; }

		.structure-row {
			display: flex;
			gap: 2px;
			font-family: "SF Mono", "Fira Code", Menlo, Consolas, monospace;
			font-size: 0.7rem;
			border-radius: 0.4rem;
			overflow: hidden;
			margin: 0.875rem 0;
		}

		.seg {
			padding: 0.35rem 0.5rem;
			text-align: center;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.seg-ts   { background: #1d4ed840; color: #93c5fd; flex: 3; }
		.seg-ver  { background: #7c3aed40; color: #c4b5fd; flex: 0.5; }
		.seg-rand { background: #065f4640; color: #6ee7b7; flex: 3; }
		.seg-var  { background: #92400e40; color: #fcd34d; flex: 0.5; }
		.seg-node { background: #1e293b;   color: #94a3b8;  flex: 3; }

		.seg-label { font-size: 0.65rem; color: #64748b; margin-top: 0.25rem; }

		.info-box {
			background: #1e293b;
			border-left: 3px solid #3b82f6;
			border-radius: 0 0.5rem 0.5rem 0;
			padding: 1rem 1.25rem;
			margin: 1.25rem 0;
		}

		.info-box p { margin-bottom: 0; }

		.math {
			font-family: "SF Mono", "Fira Code", Menlo, Consolas, monospace;
			font-size: 0.85rem;
			background: #0f172a;
			border: 1px solid #334155;
			border-radius: 0.4rem;
			padding: 0.75rem 1rem;
			display: block;
			margin: 0.75rem 0;
			color: #a5f3fc;
			overflow-x: auto;
		}

		ul {
			padding-left: 1.25rem;
			margin-bottom: 0.875rem;
		}

		ul li {
			font-size: 0.9rem;
			line-height: 1.7;
			color: #cbd5e1;
			margin-bottom: 0.25rem;
		}

		.footer {
			text-align: center;
			margin-top: 3rem;
			font-size: 0.75rem;
			color: #475569;
		}
	</style>
</head>
<body>
	<div class="container">
		<a class="back-link" href="/">&#8592; Back to generator</a>

		<h1>UUID Knowledge Base</h1>
		<p class="lead">
			A <strong>Universally Unique Identifier (UUID)</strong> is a 128-bit label standardised by
			<a href="https://www.rfc-editor.org/rfc/rfc9562" style="color:#60a5fa">RFC&nbsp;9562</a>.
			It is represented as 32 hexadecimal digits grouped by hyphens:
			<code style="color:#a5f3fc;font-family:monospace">xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx</code>.
			UUIDs are designed so that no central authority is needed to assign them — any machine can
			generate one independently and it will almost certainly never collide with any other.
		</p>

		<h2>UUID versions explained</h2>

		<div class="version-grid">
			<div class="version-card">
				<div class="version-card-header">
					<span class="version-label">UUID v7</span>
					<span class="badge badge-blue">Best choice</span>
					<span class="badge badge-green">RFC 9562</span>
				</div>
				<div class="structure-row" title="Bit layout">
					<div class="seg seg-ts">48-bit Unix timestamp (ms)</div>
					<div class="seg seg-ver">ver</div>
					<div class="seg seg-rand">12-bit counter + 62 random bits</div>
					<div class="seg seg-var">var</div>
				</div>
				<p>
					UUID v7 encodes the current Unix time in <strong>millisecond precision</strong> in the
					most-significant 48 bits. The remaining bits hold a version nibble, a 12-bit monotonic
					counter (to preserve strict ordering within the same millisecond), a variant marker, and
					62 random bits. The result is <em>lexicographically sortable</em> — newer UUIDs always
					sort after older ones — making them an excellent fit for database primary keys, because
					B-tree pages stay ordered and hot, avoiding the random-write fragmentation caused by v4.
				</p>
			</div>

			<div class="version-card">
				<div class="version-card-header">
					<span class="version-label">UUID v4</span>
					<span class="badge badge-green">Widely supported</span>
				</div>
				<div class="structure-row">
					<div class="seg seg-rand" style="flex:1">122 random bits</div>
					<div class="seg seg-ver">ver</div>
					<div class="seg seg-var">var</div>
				</div>
				<p>
					UUID v4 is almost entirely random — only 6 bits are reserved for the version and
					variant markers, leaving <strong>122 bits of entropy</strong>. It contains no
					timestamp and therefore gives away no information about when or where it was created.
					Because it is natively supported by <code style="color:#a5f3fc;font-size:0.85em">crypto.randomUUID()</code>
					in all modern runtimes and browsers, it is the simplest choice for general-purpose
					identifiers. Its only drawback is that random inserts can fragment database indexes.
				</p>
			</div>

			<div class="version-card">
				<div class="version-card-header">
					<span class="version-label">UUID v1</span>
					<span class="badge badge-slate">Legacy</span>
				</div>
				<div class="structure-row">
					<div class="seg seg-ts">60-bit timestamp (100ns)</div>
					<div class="seg seg-ver">ver</div>
					<div class="seg seg-rand">14-bit clock seq</div>
					<div class="seg seg-var">var</div>
					<div class="seg seg-node">48-bit node</div>
				</div>
				<p>
					UUID v1 also encodes a timestamp, but uses a quirky <strong>100-nanosecond interval
					since 15 October 1582</strong> (the Gregorian calendar adoption date) rather than the
					Unix epoch. The timestamp bytes are spread across the first three fields in a
					<em>little-endian</em> order that makes v1 UUIDs <em>not</em> naturally sortable.
					The node field was originally the MAC address of the machine — a privacy concern that
					led RFC 9562 to recommend randomising it. For new systems, v7 is strictly better.
				</p>
			</div>
		</div>

		<h2>Why are UUIDs practically always unique?</h2>

		<p>
			The intuition comes from the <strong>birthday paradox</strong>: in a room of just 23 people
			there is already a 50% chance two share a birthday. Collisions arrive far sooner than most
			people expect. But UUIDs occupy an astronomically larger space than 365 days.
		</p>

		<p>
			A UUID v4 uses 122 bits of randomness. The total number of possible v4 UUIDs is:
		</p>
		<code class="math">2¹²² ≈ 5.3 × 10³⁶</code>

		<p>
			The probability <em>p</em> of at least one collision after generating <em>n</em> UUIDs
			can be approximated as:
		</p>
		<code class="math">p ≈ 1 − e^(−n² / 2N)   where N = 2¹²²</code>

		<p>To reach even a <strong>50% chance of a single collision</strong> you would need to generate:</p>
		<code class="math">n ≈ √(2 · ln(2) · N) ≈ 2.7 × 10¹⁸  UUIDs</code>

		<div class="info-box">
			<p>
				At a rate of <strong>one billion UUIDs per second</strong> — far beyond any real workload —
				it would take roughly <strong>85 years</strong> of continuous generation before you had a
				50% chance of seeing even one collision across your entire dataset.
			</p>
		</div>

		<p>
			UUID v7 has slightly less raw randomness (74 random bits after reserving space for the
			timestamp, version, and monotonic counter), but the timestamp component actually
			<em>reduces</em> collision risk in practice: two UUIDs generated at different milliseconds
			can never collide in their timestamp field, so only UUIDs generated within the exact same
			millisecond compete on the random portion.
		</p>

		<h2>Practical sources of uniqueness</h2>

		<ul>
			<li><strong>CSPRNG entropy</strong> — UUID v4/v7 rely on a Cryptographically Secure Pseudo-Random Number Generator (CSPRNG) seeded from hardware noise, making the output statistically indistinguishable from true randomness.</li>
			<li><strong>Temporal separation</strong> — UUID v7 uses a millisecond-precision timestamp; two UUIDs generated at different moments occupy disjoint regions of the ID space.</li>
			<li><strong>Monotonic counter</strong> — Within the same millisecond, v7 increments a counter to guarantee strict ordering and prevent duplicates even under high throughput.</li>
			<li><strong>No coordination required</strong> — Unlike auto-increment sequences, UUIDs need no central authority, so distributed systems can generate them independently without risk of overlap.</li>
		</ul>

		<h2>When could you actually get a collision?</h2>

		<p>
			In theory, a broken or exhausted random-number generator could produce repeated outputs.
			In practice, modern operating systems re-seed the CSPRNG continuously from hardware entropy
			sources (thermal noise, interrupt timing, etc.), making this essentially impossible.
			The far more likely source of duplicate IDs in real applications is a <em>bug</em> — for
			example, accidentally inserting the same UUID twice, or copying data without regenerating
			identifiers.
		</p>

		<p class="footer">uuid.arvid.tech &mdash; <a href="/" style="color:#60a5fa">Generate a UUID &rarr;</a></p>
	</div>
</body>
</html>`;
}

export default {
	async fetch(request: Request): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname === '/history') {
			return new Response(buildHistoryHTML(), {
				headers: {
					'Content-Type': 'text/html;charset=UTF-8',
					'Cache-Control': 'no-store',
				},
			});
		}

		return new Response(buildMainHTML(), {
			headers: {
				'Content-Type': 'text/html;charset=UTF-8',
				'Cache-Control': 'no-store',
			},
		});
	},
};
