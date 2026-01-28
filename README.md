# ICE Services - Royalty Processing System

A music distribution system for tracking royalty calculations and issuing invoices. Built as a take-home assignment for Senior Frontend Engineer - Royalty Processing position. Developed by Miguel Angel Nadal.

## Overview

The assignment simulates a music distribution platform (like Spotify or Apple Music) that generates invoices to pay authors for streamed music.

This is an intentional **MVP**. Tables lack sorting and search, features I'd add in iteration. The goal is to demonstrate my approach: clean architecture, type safety, testing, and accessibility. A foundation that could evolve with pagination, filtering, and persistence as requirements grow.

### What I Built

**Server**: An Express endpoint that serves 10 songs with ID, name, author, and progress values.

**Client**: A React application with two main components:

- **Songs Table**: Displays songs with an "Issue Invoice" button. After clicking, shows the date and progress from that moment.
- **Invoice History**: Lists all issued invoices sorted by date (newest first).

## Setup and Run

### Prerequisites

- Node.js >= 18
- pnpm

### Quick Start

```bash
pnpm install    # Install all dependencies
pnpm dev        # Start both server (port 3001) and client (port 5173)
```

The client proxies `/api` requests to the server, so no CORS issues during development.

### Running Tests

```bash
pnpm test        # Watch mode
pnpm test:run    # Single run
```

### Production Build

```bash
pnpm build       # Build both server and client
```

## Project Structure

```
ice-services/
├── client/                     # React frontend
│   ├── src/
│   │   ├── api/                # React Query options + fetch logic
│   │   ├── components/         # UI components
│   │   │   ├── table/          # Table-specific (SongsTableHead)
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── InvoiceHistory.tsx
│   │   │   ├── SongsTable.tsx
│   │   │   └── TableSkeleton.tsx
│   │   ├── contexts/           # Invoice state management
│   │   ├── types/              # Zod schemas + inferred types
│   │   └── __test__/           # Tests (components, api, integration)
│   ├── vitest.config.ts
│   └── vite.config.ts
│
├── server/                     # Express backend
│   ├── src/
│   │   ├── data/               # Mock songs data (10 songs from assignment)
│   │   ├── types/              # TypeScript interfaces
│   │   └── index.ts            # GET /api/songs endpoint
│   └── tsconfig.json
│
└── README.md
```

## Technical Choices

### State Management: Context vs Redux

The assignment mentions "appropriate state management pattern". I chose React Context + TanStack Query over Redux/Zustand:

1. **Server state** (songs list): TanStack Query handles fetching, caching, and refetching. This data belongs to the API, not the client.

2. **Client state** (issued invoices): A simple Context with `useState`. The invoice list only exists in the browser session.

Adding Redux for one piece of client state felt like overkill. The Context implementation is ~40 lines:

```tsx
// contexts/InvoiceContext.tsx
const [issuedInvoices, setIssuedInvoices] = useState<IssuedInvoice[]>([]);

const issueInvoice = (author, progress, songId, songName) => {
  const newInvoice = {
    id: crypto.randomUUID(),
    author,
    progress,
    songId,
    songName,
    issuedAt: new Date(),
  };

  setIssuedInvoices((prev) => [...prev, newInvoice]);
};
```

### Types: Separate vs Shared

I kept client and server types separate rather than creating a shared package:

- **Client**: Zod schemas that validate at runtime and infer TypeScript types
- **Server**: Plain TypeScript interfaces

This means changing the API shape requires updating both. But the client validates what it receives, catching contract mismatches early rather than failing silently.

## Tech Stack Justification

| Technology          | Why I chose it                                                                          |
| ------------------- | --------------------------------------------------------------------------------------- |
| **React 19**        | Suspense integration with `use()` hook, React Compiler support                          |
| **TanStack Query**  | Handles caching, deduplication, works great with Suspense                               |
| **Tailwind CSS v4** | Vite plugin integration, zero runtime cost, utility classes keep styles close to markup |
| **Zod**             | Runtime validation for API responses, catches issues before they become silent bugs     |
| **Vite**            | Fast HMR, native ESM, simple config. Proxy setup for `/api` is just a few lines         |
| **Express**         | Minimal setup for a single endpoint, no framework overhead needed                       |

## Accessibility

I focused on making the tables accessible since they're the core UI:

### Tables

- `aria-labelledby` pointing to visible headings
- `aria-describedby` for screen reader descriptions (hidden with `sr-only`)
- Proper `<thead>`, `<tbody>`, `<th scope="col">` structure

### Loading State

The skeleton has `role="status"` and `aria-busy="true"`:

```tsx
<div role="status" aria-busy="true" aria-label="Loading songs table">
```

### Buttons

Each "Issue Invoice" button includes the song name in its accessible label:

```tsx
<button aria-label={`Issue invoice for ${song.songName}`}>
```

Screen reader users know which song they're acting on, not just hearing "Issue Invoice" repeated 10 times.

## Code Quality

- [**Husky**](https://typicode.github.io/husky/) - Pre-commit hooks
- [**lint-staged**](https://github.com/lint-staged/lint-staged) - Only lint changed files
- [**Prettier**](https://prettier.io/) - Formatting
- [**ESLint**](https://eslint.org/) - TypeScript + React hooks rules
- [**TypeScript**](https://www.typescriptlang.org/) - Strict mode enabled

Pre-commit runs `typecheck` → `lint-staged` on client, `build` → `lint` on server.

## Testing Strategy

### Tools

- **Vitest** - Fast, Vite-native test runner
- **Testing Library** - User-centric queries
- **MSW** - Network-level API mocking

### Test Structure

```
__test__/
├── components/
│   ├── TableSkeleton.test.tsx   # Loading state, row count, a11y attrs
│   ├── SongsTableHead.test.tsx  # Column headers render correctly
│   └── InvoiceHistory.test.tsx  # Empty state, table rendering, sorting
├── api/
│   └── songs.test.tsx           # Fetch, Zod validation, error handling
├── App.test.tsx                 # Full integration tests
├── mocks/
│   ├── handlers.ts              # MSW request handlers
│   └── server.ts                # MSW server setup
└── setup.ts                     # Global cleanup + jest-dom matchers
```

## Future Improvements

### End-to-End Testing

Add Playwright for full user flow tests, like clicking through the UI, verifying invoice history updates. Current tests mock the API, and E2E would hit the real server.

### Git History

The repository shows my iterative development with small commits. For a production PR, I'd use `git rebase -i` to squash into logical chunks (one per feature/phase). I kept the history to demonstrate how I work.

### Server Improvements

The server returns hardcoded mock data per assignment requirements. To scale:

1. **SQLite** for MVP persistence (simple, no external deps)
2. **PostgreSQL** when data grows or we need concurrent writes
3. **Prisma/Drizzle** for type-safe queries
4. **Zod validation** on server too (same approach as client)
5. **tRPC** for type-safe API layer between client and server

### Feature Ideas

- **Table Library**: At scale, introduce [TanStack Table](https://tanstack.com/table) for pagination, sorting, filtering, virtualization, and column resizing. Current manual implementation shows understanding of table semantics, and a library would be next when these features become requirements.
- **Invoice Export**: Download history as CSV

### Performance

- **Virtualization**: `@tanstack/react-virtual` for large tables (or TanStack Table's built-in virtualization)
- **Optimistic Updates**: Show invoice immediately, sync with server after

## Tech Stack Summary

| Category             | Technology                    |
| -------------------- | ----------------------------- |
| **Frontend**         | React 19, TypeScript          |
| **Styling**          | Tailwind CSS v4               |
| **State Management** | TanStack Query, React Context |
| **Validation**       | Zod                           |
| **Build Tool**       | Vite                          |
| **Backend**          | Express, TypeScript           |
| **Testing**          | Vitest, Testing Library, MSW  |
| **Code Quality**     | ESLint, Prettier, Husky       |
| **Package Manager**  | pnpm                          |
