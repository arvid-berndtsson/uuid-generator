# UUID Generator

A Cloudflare Worker that generates UUIDs online, available at [uuid.arvid.tech](https://uuid.arvid.tech/).

## Features

- **UUID v7** (default) — time-ordered, sortable, monotonically increasing; ideal for database primary keys
- **UUID v4** — fully random; good general-purpose unique identifier
- **UUID v1** — time-based with a random node ID (available via the API)
- **/history** page — educational content explaining UUID versions and when to use each

## Pages

| Path | Description |
|---|---|
| `/` | Main generator — shows UUID v7 (recommended) and UUID v4 |
| `/history` | UUID Knowledge Base — explains v1, v4, v7, collision probability, and trade-offs |

## Development

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Run tests

```bash
npm test
```

### Type-check

```bash
npm run typecheck
```

### Deploy

```bash
npm run deploy
```

## Project Structure

```
src/
  index.ts   # Worker entry point — request routing and HTML rendering
  uuid.ts    # UUID generation logic (v1, v4, v7)
test/
  index.test.ts   # Integration tests for the Worker routes
  uuid.test.ts    # Unit tests for UUID generation functions
```

## Tech Stack

- [Cloudflare Workers](https://workers.cloudflare.com/) — serverless edge runtime
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/) — CLI for development and deployment
- [Vitest](https://vitest.dev/) + [@cloudflare/vitest-pool-workers](https://www.npmjs.com/package/@cloudflare/vitest-pool-workers) — testing
- TypeScript

## License

[MIT](LICENSE)
