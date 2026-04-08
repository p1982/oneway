# Wallet App (Next.js + TypeScript)

A mobile-first wallet demo application built for a test task.

The app includes:

- Transactions list screen
- Transaction details screen (dynamic slug route)
- Local JSON data source loaded via `axios`
- State management with `zustand`
- UI components styled with `MUI` + extracted style files
- Unit tests with `Vitest`
- Linting/formatting and Git hooks (`ESLint`, `Prettier`, `Husky`, `lint-staged`)
- CI workflow for lint, test, and build checks

## Tech Stack

- `Next.js 15` (App Router)
- `TypeScript`
- `Axios`
- `Zustand`
- `MUI`
- `FontAwesome`
- `Vitest` + `Testing Library`

## Project Structure

- `src/app` - routes and pages
- `src/components/wallet/overview` - list screen composition and summary cards
- `src/components/wallet/transactions` - transaction list item and icon components
- `src/components/wallet/details` - transaction details screen components
- `src/shared/api` - API layer and abstract axios service
- `src/store` - zustand store
- `src/lib` - utility and formatting functions
- `src/types` - shared TypeScript types
- `public/data/wallet.json` - local test data source

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

### Development

```bash
npm run dev
```

### Production build

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

### Tests

```bash
npm run test
```

Watch mode:

```bash
npm run test:watch
```

Coverage (80% threshold):

```bash
npm run test:coverage
```

### Formatting

```bash
npm run format
npm run format:check
```

## Data Source

The app fetches wallet data from:

- `GET /data/wallet.json`

This file is located at:

- `public/data/wallet.json`

## Architecture Decisions

### Why Zustand

- Lightweight and fast state manager with minimal boilerplate.
- Great fit for this project size (simple global state without Redux-level complexity).
- Easy to keep async actions (`fetchWallet`) close to the state they update.

### Why Normalized Store (`transactions` + `transactionsId`)

- `transactions` as an object provides O(1) lookup by id for detail pages.
- `transactionsId` keeps predictable rendering order for the list screen.
- This structure avoids repeated array scans (`find`) and scales better with larger datasets.

### Why Abstract Axios Service

- Shared request/response behavior is centralized (headers, interceptors, error normalization).
- Feature services (like `TransactionsApiService`) stay small and focused on endpoint contracts.
- Easier testing and future extension (auth refresh, retry policies, additional APIs).

### Why Utility Layer for Formatting

- Formatting and domain rules are isolated in `src/lib` (`walletFormat.ts`).
- UI components remain focused on rendering, improving readability and testability.
- Business rules (daily points formula, date formatting strategy) are covered by unit tests.

## Notes

- If you see hydration warnings in development, they may be caused by browser extensions modifying the DOM before React hydration.
- The project is configured with Husky pre-commit hooks and CI checks to keep the codebase consistent.
