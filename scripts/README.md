# create-project

Interactive script for creating new Spektra projects from the baseline template.

## Features

- ✅ Interactive prompts for project setup
- ✅ Automatic baseline template copying
- ✅ Package.json configuration
- ✅ Environment variable setup (.env)
- ✅ Brand name integration via VITE_SITE_NAME

## Usage

From the repository root:

```bash
pnpm create-project
```

## Interactive Flow

The script will prompt you for:

### 1. Project Folder Name
```
Projekt mappa név (csak kisbetűk, számok, kötőjelek):
```

- Must contain only lowercase letters, numbers, and dashes
- Will be used as the folder name under `projects/`
- Will be used as the package.json `name` field

Example: `my-client`

### 2. Website/Brand Display Name
```
Weboldal / márka megjelenítendő név:
```

- Can contain any characters (spaces, capitals, special chars)
- Will be set as `VITE_SITE_NAME` in the `.env` file
- Will appear as the site name in the application

Example: `My Client`

## What it does

1. **Validates input**
   - Folder name format
   - Destination doesn't exist
   - Display name not empty

2. **Copies template**
   - Source: `engine/templates/baseline/`
   - Target: `projects/<folder-name>/`
   - All files and folders recursively

3. **Updates package.json**
   - Sets `name` field to folder name

4. **Creates .env file**
   - Sets `VITE_SITE_NAME=<display-name>`
   - Preserves existing env variables if any

5. **Integration with site.ts**
   - The baseline template uses:
     ```typescript
     name: import.meta.env.VITE_SITE_NAME || 'Spektra Project'
     ```
   - Your brand name automatically appears in the application

## Example

```bash
$ pnpm create-project

🚀 Új projekt létrehozása

Projekt mappa név (csak kisbetűk, számok, kötőjelek): acme-corp
Weboldal / márka megjelenítendő név: ACME Corporation

📦 Projekt létrehozása...

✅ Projekt sikeresen létrehozva!

📦 Mappa név:        acme-corp
🏷️  Megjelenített név: ACME Corporation
📍 Helye:            projects/acme-corp

Következő lépések:
  cd projects/acme-corp
  pnpm install
  pnpm dev
```

## Result Structure

```
projects/acme-corp/
├── .env                    # VITE_SITE_NAME=ACME Corporation
├── package.json            # { "name": "acme-corp" }
├── src/
│   └── data/
│       └── site.ts         # Uses import.meta.env.VITE_SITE_NAME
└── ... (all baseline files)
```

## Requirements

- Node.js >=18.0.0
- pnpm >=8.0.0
- tsx (installed as dev dependency)

## Error Handling

The script validates and provides clear error messages for:

- Empty folder name
- Invalid folder name format (uppercase, special chars)
- Folder already exists
- Empty display name
- Missing baseline template

All errors exit with non-zero code and descriptive Hungarian messages.
