# Spektra Project Templates

This directory contains **project scaffolding templates** for creating new Spektra projects.

## Purpose

Templates in this directory are used to scaffold complete project starters.
They contain the initial file structure, configuration, and boilerplate code
for new Spektra-based projects.

## Available Templates

### baseline

The canonical Spektra project template derived from the original `projects/baseline` reference implementation.

**Location**: `engine/templates/baseline/`

**Use via**:
```bash
cd scripts
node create-client.js new-client-name
```

**Contains**:
- Data-driven architecture (`src/data/`)
- Routing setup with react-router-dom
- Engine component integration
- Vite build configuration
- TypeScript & Tailwind CSS setup
- Example pages and layouts

See [baseline/README.md](./baseline/README.md) for full details.

## NOT for UI Components

- This directory is NOT for UI page compositions (use `engine/packages/core/components/layouts` instead)
- This directory is NOT for React components
- The word "template" in Spektra ONLY refers to project scaffolding

## Adding New Templates

New templates should only be added when:
1. A distinct project pattern emerges across multiple clients
2. The pattern requires different structural setup (not just content)
3. The pattern is proven in at least 2 real projects

**DO NOT** create templates for:
- Single-use project configurations
- Minor variations in content or styling
- Experimental architectures
