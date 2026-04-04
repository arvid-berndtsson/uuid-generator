import { generateUUIDv1, generateUUIDv4, generateUUIDv7 } from './uuid';

/**
 * Build the HTML page displaying generated UUIDs.
 */
function buildHTML(): string {
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
			margin-bottom: 2rem;
			color: #f8fafc;
		}

		.uuid-card {
			background: #1e293b;
			border: 1px solid #334155;
			border-radius: 0.75rem;
			padding: 1.25rem;
			margin-bottom: 1rem;
		}

		.uuid-header {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			margin-bottom: 0.75rem;
		}

		.uuid-version {
			font-size: 0.875rem;
			font-weight: 600;
			color: #94a3b8;
		}

		.badge {
			font-size: 0.625rem;
			font-weight: 700;
			text-transform: uppercase;
			letter-spacing: 0.05em;
			padding: 0.125rem 0.5rem;
			border-radius: 9999px;
			background: #22c55e20;
			color: #4ade80;
		}

		.uuid-description {
			font-size: 0.75rem;
			color: #64748b;
			margin-bottom: 0.75rem;
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

		.copy-btn:hover {
			background: #334155;
			color: #f1f5f9;
		}

		.copy-btn svg {
			width: 18px;
			height: 18px;
		}

		.actions {
			display: flex;
			justify-content: center;
			margin-top: 1.5rem;
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

		.refresh-btn:hover {
			background: #2563eb;
		}

		.refresh-btn svg {
			width: 16px;
			height: 16px;
		}

		.footer {
			text-align: center;
			margin-top: 2rem;
			font-size: 0.75rem;
			color: #475569;
		}
	</style>
</head>
<body>
	<div class="container">
		<h1>UUID Generator</h1>

		<div class="uuid-card">
			<div class="uuid-header">
				<span class="uuid-version">UUID v4</span>
				<span class="badge">Recommended</span>
			</div>
			<p class="uuid-description">Random — suitable for most use cases</p>
			<div class="uuid-value-row">
				<code class="uuid-value" id="uuid-v4">${uuids.v4}</code>
				<button class="copy-btn" aria-label="Copy UUID v4" onclick="copyUUID('uuid-v4')">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
				</button>
			</div>
		</div>

		<div class="uuid-card">
			<div class="uuid-header">
				<span class="uuid-version">UUID v7</span>
				<span class="badge">Recommended</span>
			</div>
			<p class="uuid-description">Time-ordered — sortable, ideal for databases</p>
			<div class="uuid-value-row">
				<code class="uuid-value" id="uuid-v7">${uuids.v7}</code>
				<button class="copy-btn" aria-label="Copy UUID v7" onclick="copyUUID('uuid-v7')">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
				</button>
			</div>
		</div>

		<div class="uuid-card">
			<div class="uuid-header">
				<span class="uuid-version">UUID v1</span>
			</div>
			<p class="uuid-description">Time-based — includes timestamp and node identifier</p>
			<div class="uuid-value-row">
				<code class="uuid-value" id="uuid-v1">${uuids.v1}</code>
				<button class="copy-btn" aria-label="Copy UUID v1" onclick="copyUUID('uuid-v1')">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
				</button>
			</div>
		</div>

		<div class="actions">
			<button class="refresh-btn" onclick="window.location.reload()">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.992 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182M20.008 4.357v4.992"/></svg>
				Generate New UUIDs
			</button>
		</div>

		<p class="footer">uuid.arvid.tech — Reload the page or click the button to generate new UUIDs.</p>
	</div>

	<script>
		function copyUUID(id) {
			const text = document.getElementById(id).textContent;
			navigator.clipboard.writeText(text).then(function() {
				var btn = document.getElementById(id).closest('.uuid-value-row').querySelector('.copy-btn');
				var originalColor = btn.style.color;
				btn.style.color = '#4ade80';
				setTimeout(function() { btn.style.color = originalColor; }, 1000);
			});
		}
	</script>
</body>
</html>`;
}

export default {
	async fetch(): Promise<Response> {
		const html = buildHTML();
		return new Response(html, {
			headers: {
				'Content-Type': 'text/html;charset=UTF-8',
				'Cache-Control': 'no-store',
			},
		});
	},
};
