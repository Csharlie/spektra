# Examples

This directory contains archived reference projects that are no longer actively developed but preserved for historical reference and learning purposes.

## Contents

### baseline (archived)

The original `projects/baseline` reference implementation has been **promoted to a canonical template** at:

```
engine/templates/baseline/
```

**DO NOT** use `projects/examples/baseline` for new projects.

**DO** use the template via:

```bash
cd scripts
node create-client.js new-client-name
```

This archived version remains here as a read-only reference showing the original implementation that proved the Spektra architecture works.

## Purpose of Examples

Projects in this directory:
- Show historical implementations
- Demonstrate architectural evolution
- Serve as learning references
- Are NOT templates for new work

## Creating New Projects

Always use the canonical template:

```bash
# From repository root
cd scripts
node create-client.js your-project-name
```

This ensures you get the latest, maintained project structure.
