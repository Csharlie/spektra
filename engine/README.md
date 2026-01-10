# Spektra Engine

Core rendering engine and component library for Spektra design system projects.

## Version

Current version: 0.5.0 ✨

## Features

- Core design system components
- Theme system
- Data utilities
- Type-safe configuration
- Automated release pipeline with semantic-release

## Release Process

Releases are fully automated using [semantic-release](https://semantic-release.gitbook.io/semantic-release/).

Every commit to the `main` branch that affects the engine workspace automatically triggers version evaluation:
- `feat:` commits → **minor** version bump
- `fix:` commits → **patch** version bump  
- `BREAKING CHANGE:` → **major** version bump
- All other commits → **patch** version bump

See [version history](../docs/versioning/version-history.md) for details.

## Development

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test
```
