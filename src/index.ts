import { generateUUIDv4, generateUUIDv7 } from './uuid';

const COPY_ICON =
	'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';

/**
 * Build the main HTML page — features a single primary UUID (v7) with
 * alternative versions available at the bottom.
 */
function buildMainHTML(): string {
	const uuids = {
		v4: generateUUIDv4(),
		v7: generateUUIDv7(),
	};

	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>UUID Generator - Generate UUID v7 &amp; v4 Online</title>
	<meta name="description" content="Free online UUID generator. Instantly generate UUID v7 (time-ordered, sortable) and UUID v4 (random) for databases, APIs, and distributed systems.">
	<meta name="keywords" content="UUID generator, generate UUID, UUID v7, UUID v4, GUID generator, online UUID, unique identifier">
	<meta property="og:title" content="UUID Generator">
	<meta property="og:description" content="Free online UUID generator. Instantly generate UUID v7 and UUID v4 for databases, APIs, and distributed systems.">
	<meta property="og:type" content="website">
	<meta property="og:url" content="https://uuid.arvid.tech/">
	<link rel="canonical" href="https://uuid.arvid.tech/">
	<style>
		* { margin: 0; padding: 0; box-sizing: border-box; }

		body {
			font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif;
			background: #f5f5f7;
			color: #1d1d1f;
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
			color: #1d1d1f;
			letter-spacing: -0.02em;
		}

		.subtitle {
			text-align: center;
			font-size: 0.8rem;
			color: #86868b;
			margin-bottom: 2rem;
		}

		/* ── Primary UUID card ──────────────────────────────────── */
		.primary-card {
			background: #ffffff;
			border: 1px solid #e8e8ed;
			border-radius: 12px;
			padding: 1.5rem;
			margin-bottom: 1.5rem;
			box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
		}

		.primary-header {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			margin-bottom: 0.5rem;
		}

		.primary-version {
			font-size: 1rem;
			font-weight: 600;
			color: #1d1d1f;
		}

		.badge-best {
			font-size: 0.625rem;
			font-weight: 600;
			text-transform: uppercase;
			letter-spacing: 0.05em;
			padding: 0.125rem 0.5rem;
			border-radius: 9999px;
			background: rgba(0, 113, 227, 0.1);
			color: #0071e3;
		}

		.primary-description {
			font-size: 0.8rem;
			color: #6e6e73;
			margin-bottom: 1rem;
			line-height: 1.5;
		}

		.uuid-value-row {
			display: flex;
			align-items: center;
			gap: 0.5rem;
		}

		.uuid-value {
			flex: 1;
			font-family: "SF Mono", "Fira Code", "Fira Mono", Menlo, Consolas, monospace;
			font-size: 0.875rem;
			color: #1d1d1f;
			background: #f5f5f7;
			padding: 0.625rem 0.75rem;
			border-radius: 8px;
			border: 1px solid #e8e8ed;
			word-break: break-all;
			user-select: all;
		}

		.copy-btn {
			background: none;
			border: 1px solid #e8e8ed;
			border-radius: 8px;
			padding: 0.625rem;
			cursor: pointer;
			color: #6e6e73;
			display: flex;
			align-items: center;
			justify-content: center;
			transition: all 0.15s ease;
			flex-shrink: 0;
		}

		.copy-btn:hover { background: #f5f5f7; color: #1d1d1f; border-color: #d2d2d7; }
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
			background: #0071e3;
			color: #fff;
			border: none;
			border-radius: 9999px;
			padding: 0.625rem 1.5rem;
			font-size: 0.875rem;
			font-weight: 400;
			cursor: pointer;
			transition: background 0.15s ease;
			letter-spacing: -0.01em;
		}

		.refresh-btn:hover { background: #0077ed; }
		.refresh-btn svg { width: 16px; height: 16px; }

		/* ── Alternative versions ───────────────────────────────── */
		.alt-section-title {
			font-size: 0.7rem;
			font-weight: 600;
			text-transform: uppercase;
			letter-spacing: 0.08em;
			color: #86868b;
			margin-bottom: 0.75rem;
		}

		.alt-card {
			background: #ffffff;
			border: 1px solid #e8e8ed;
			border-radius: 12px;
			padding: 1rem 1.25rem;
			margin-bottom: 0.75rem;
			cursor: pointer;
			transition: border-color 0.15s ease, box-shadow 0.15s ease;
			box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
		}

		.alt-card:hover { border-color: #d2d2d7; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); }
		.alt-card.active { border-color: #0071e3; }

		.alt-header {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			margin-bottom: 0.5rem;
		}

		.alt-version {
			font-size: 0.875rem;
			font-weight: 600;
			color: #1d1d1f;
		}

		.alt-description {
			font-size: 0.75rem;
			color: #6e6e73;
			margin-bottom: 0.625rem;
			line-height: 1.5;
		}

		/* ── Footer ─────────────────────────────────────────────── */
		.footer {
			text-align: center;
			margin-top: 2rem;
			font-size: 0.75rem;
			color: #86868b;
		}

		.footer a {
			color: #0071e3;
			text-decoration: none;
		}

		.footer a:hover { text-decoration: underline; }
	</style>
</head>
<body>
	<div class="container">
		<h1>UUID Generator</h1>
		<p class="subtitle">Generate a fresh UUID v7, the recommended modern choice.</p>

		<!-- Primary UUID: v7 -->
		<div class="primary-card">
			<div class="primary-header">
				<span class="primary-version" id="primary-label">UUID v7</span>
				<span class="badge-best">Best choice</span>
			</div>
			<p class="primary-description" id="primary-desc">Time-ordered and sortable. Embeds a millisecond-precision Unix timestamp in the first 48 bits, making it ideal for database primary keys and distributed systems.</p>
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
			<p class="alt-description">Fully random. 122 bits of entropy, no embedded timestamp. Suitable for general-purpose use cases.</p>
			<div class="uuid-value-row">
				<code class="uuid-value" id="uuid-v4">${uuids.v4}</code>
				<button class="copy-btn" aria-label="Copy UUID v4" onclick="event.stopPropagation(); copyUUID('uuid-v4')">${COPY_ICON}</button>
			</div>
		</div>

		<p class="footer"><a href="/history">Learn how UUIDs work</a></p>
	</div>

	<script>
		const versions = {
			v7: {
				label: 'UUID v7',
				desc: 'Time-ordered and sortable. Embeds a millisecond-precision Unix timestamp in the first 48 bits, making it ideal for database primary keys and distributed systems.',
				value: ${JSON.stringify(uuids.v7)}
			},
			v4: {
				label: 'UUID v4',
				desc: 'Fully random. 122 bits of entropy, no embedded timestamp. Suitable for general-purpose use cases.',
				value: ${JSON.stringify(uuids.v4)}
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
	<title>How UUIDs Work | UUID Generator</title>
	<meta name="description" content="Learn how UUIDs work, why they are practically always unique, and the differences between UUID v7, v4, and v1. Includes birthday paradox probability math.">
	<meta property="og:title" content="How UUIDs Work">
	<meta property="og:description" content="Learn how UUIDs work, why they are practically always unique, and the differences between UUID versions.">
	<meta property="og:type" content="article">
	<meta property="og:url" content="https://uuid.arvid.tech/history">
	<link rel="canonical" href="https://uuid.arvid.tech/history">
	<style>
		* { margin: 0; padding: 0; box-sizing: border-box; }

		html, body {
			overflow-x: hidden;
		}

		body {
			font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif;
			background: #f5f5f7;
			color: #1d1d1f;
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
			color: #0071e3;
			text-decoration: none;
			margin-bottom: 2rem;
		}

		.back-link:hover { text-decoration: underline; }

		h1 {
			font-size: 1.75rem;
			font-weight: 700;
			color: #1d1d1f;
			margin-bottom: 0.5rem;
			letter-spacing: -0.03em;
		}

		.lead {
			font-size: 0.95rem;
			color: #6e6e73;
			margin-bottom: 2.5rem;
			line-height: 1.6;
		}

		h2 {
			font-size: 1.1rem;
			font-weight: 600;
			color: #1d1d1f;
			margin-bottom: 0.75rem;
			padding-top: 2rem;
			border-top: 1px solid #e8e8ed;
			letter-spacing: -0.01em;
		}

		h2:first-of-type { border-top: none; padding-top: 0; }

		p {
			font-size: 0.9rem;
			line-height: 1.7;
			color: #3a3a3c;
			margin-bottom: 0.875rem;
		}

		.version-grid {
			display: grid;
			gap: 1rem;
			margin: 1.25rem 0;
		}

		.version-card {
			background: #ffffff;
			border: 1px solid #e8e8ed;
			border-radius: 12px;
			padding: 1.25rem;
			box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
		}

		.version-card-header {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			margin-bottom: 0.625rem;
		}

		.version-label {
			font-size: 0.9rem;
			font-weight: 600;
			color: #1d1d1f;
		}

		.badge {
			font-size: 0.6rem;
			font-weight: 600;
			text-transform: uppercase;
			letter-spacing: 0.05em;
			padding: 0.1rem 0.45rem;
			border-radius: 9999px;
		}

		.badge-blue  { background: rgba(0, 113, 227, 0.1); color: #0071e3; }
		.badge-green { background: rgba(37, 162, 68, 0.1); color: #25a244; }
		.badge-slate { background: rgba(142, 142, 147, 0.15); color: #6e6e73; }

		.version-card p { margin-bottom: 0; }

		.structure-row {
			display: flex;
			gap: 2px;
			font-family: "SF Mono", "Fira Code", Menlo, Consolas, monospace;
			font-size: 0.7rem;
			border-radius: 0.4rem;
			overflow-x: auto;
			margin: 0.875rem 0;
		}

		.seg {
			padding: 0.35rem 0.5rem;
			text-align: center;
			white-space: nowrap;
			flex-shrink: 0;
		}

		.seg-ts   { background: rgba(0, 113, 227, 0.1);   color: #0055b3; flex: 3; }
		.seg-ver  { background: rgba(88, 86, 214, 0.1);   color: #5856d6; flex: 0.5; }
		.seg-rand { background: rgba(37, 162, 68, 0.1);   color: #25a244; flex: 3; }
		.seg-var  { background: rgba(255, 149, 0, 0.12);  color: #b86400; flex: 0.5; }
		.seg-node { background: rgba(142, 142, 147, 0.1); color: #6e6e73; flex: 3; }

		.seg-label { font-size: 0.65rem; color: #86868b; margin-top: 0.25rem; }

		.info-box {
			background: #ffffff;
			border-left: 3px solid #0071e3;
			border-radius: 0 8px 8px 0;
			padding: 1rem 1.25rem;
			margin: 1.25rem 0;
			box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
		}

		.info-box p { margin-bottom: 0; }

		.math {
			font-family: "SF Mono", "Fira Code", Menlo, Consolas, monospace;
			font-size: 0.85rem;
			background: #f5f5f7;
			border: 1px solid #e8e8ed;
			border-radius: 8px;
			padding: 0.75rem 1rem;
			display: block;
			margin: 0.75rem 0;
			color: #1d1d1f;
			overflow-x: auto;
		}

		ul {
			padding-left: 1.25rem;
			margin-bottom: 0.875rem;
		}

		ul li {
			font-size: 0.9rem;
			line-height: 1.7;
			color: #3a3a3c;
			margin-bottom: 0.25rem;
		}

		.footer {
			text-align: center;
			margin-top: 3rem;
			font-size: 0.75rem;
			color: #86868b;
		}
	</style>
</head>
<body>
	<div class="container">
		<a class="back-link" href="/">&#8592; Back to generator</a>

		<h1>UUID Knowledge Base</h1>
		<p class="lead">
			A <strong>Universally Unique Identifier (UUID)</strong> is a 128-bit label standardised by
			<a href="https://www.rfc-editor.org/rfc/rfc9562" style="color:#0071e3">RFC&nbsp;9562</a>.
			It is represented as 32 hexadecimal digits grouped by hyphens:
			<code style="color:#0055b3;font-family:monospace">xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx</code>.
			UUIDs are designed so that no central authority is needed to assign them. Any machine can
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
					62 random bits. The result is <em>lexicographically sortable</em>: newer UUIDs always
					sort after older ones, making them an excellent fit for database primary keys, because
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
					UUID v4 is almost entirely random. Only 6 bits are reserved for the version and
					variant markers, leaving <strong>122 bits of entropy</strong>. It contains no
					timestamp and therefore gives away no information about when or where it was created.
					Because it is natively supported by <code style="color:#0055b3;font-size:0.85em">crypto.randomUUID()</code>
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
					The node field was originally the MAC address of the machine, a privacy concern that
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
				At a rate of <strong>one billion UUIDs per second</strong> (far beyond any real workload),
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
			<li><strong>CSPRNG entropy:</strong> UUID v4/v7 rely on a Cryptographically Secure Pseudo-Random Number Generator (CSPRNG) seeded from hardware noise, making the output statistically indistinguishable from true randomness.</li>
			<li><strong>Temporal separation:</strong> UUID v7 uses a millisecond-precision timestamp; two UUIDs generated at different moments occupy disjoint regions of the ID space.</li>
			<li><strong>Monotonic counter:</strong> Within the same millisecond, v7 increments a counter to guarantee strict ordering and prevent duplicates even under high throughput.</li>
			<li><strong>No coordination required:</strong> Unlike auto-increment sequences, UUIDs need no central authority, so distributed systems can generate them independently without risk of overlap.</li>
		</ul>

		<h2>When could you actually get a collision?</h2>

		<p>
			In theory, a broken or exhausted random-number generator could produce repeated outputs.
			In practice, modern operating systems re-seed the CSPRNG continuously from hardware entropy
			sources (thermal noise, interrupt timing, etc.), making this essentially impossible.
			The far more likely source of duplicate IDs in real applications is a <em>bug</em>: for
			example, accidentally inserting the same UUID twice, or copying data without regenerating
			identifiers.
		</p>

		<p class="footer"><a href="/" style="color:#0071e3">Generate a UUID</a></p>
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
