# Repository Guidelines

## Project Structure & Module Organization

- `src/index.ts` exposes the component, plugin, types, and keyboard data. The package is ESM-only.
- `src/core.ts` implements `MacKeyboard` using Vue's `defineComponent`, `setup`, and render functions. `src/types.ts` defines props and events; `src/constants.ts` contains key definitions.
- `src/style.scss` provides library styles, published separately as `vue-mac-keyboard/style`.
- `tests/index.spec.ts` covers component behavior and plugin registration.
- `playground/` contains the Vite demo, with Vue components under `src/` and static assets under `public/`. `screenshots/` holds README images.
- `dist/` contains generated JavaScript, declarations, and CSS; edit source files instead.

## Build, Test, and Development Commands

Use the pnpm version declared in `package.json` and the Node version selected by `.node-version`.

- `pnpm install` installs workspace dependencies.
- `pnpm build` bundles the library with tsdown, generates declarations, and compiles Sass.
- `pnpm dev` watches and rebuilds the library.
- `pnpm play` starts the playground; build the library first and keep `pnpm dev` running when editing it.
- `pnpm play:build` builds the playground for production.
- `pnpm lint` runs ESLint; `pnpm typecheck` checks TypeScript without emitting files.
- `pnpm test` runs Vitest once; `pnpm exec vitest --watch` enables watch mode.

## Coding Style & Naming Conventions

Use two-space indentation, LF endings, and a final newline. Follow existing TypeScript style: single quotes, no semicolons, and explicit `import type` declarations. Keep strict typing.

Use camelCase for variables and functions, PascalCase for components and types, and `useX` for composables. Playground components use `<script lang="ts" setup>`. Follow the shared `@ntnyq` ESLint and Prettier configurations. The Husky pre-commit hook runs nano-staged with `eslint --fix` on matching staged files.

## Testing Guidelines

Use Vitest with Vue Test Utils and the configured `happy-dom` environment. Name tests `tests/*.spec.ts`, group behavior with `describe`, and use descriptive `it` cases. Cover changed props, emitted events, disabled interactions, and plugin registration as applicable. Await asynchronous Vue updates. No coverage threshold is configured.

## Commit & Pull Request Guidelines

Follow the history's Conventional Commit style, such as `chore(deps): update dependencies`, `build: set platform to browser`, or `feat!: change public API`.

Describe the problem, behavior changes, and validation in PRs; link relevant issues and include playground screenshots for visual changes. Update README examples for public API changes. Run lint, typecheck, build, and tests before submission; CI checks these on PRs to `main`.
