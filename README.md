# text-edit

An Electron application with Vue and TypeScript

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Project Setup

### Install

```bash
$ pnpm install
```

### Development

```bash
$ pnpm dev
```

### Build

```bash
# For windows
$ pnpm build:win

# For macOS
$ pnpm build:mac

# For Linux
$ pnpm build:linux
```

```
text-edit
├─ .editorconfig
├─ .npmrc
├─ .prettierignore
├─ .prettierrc.yaml
├─ build
│  ├─ entitlements.mac.plist
│  ├─ icon.icns
│  ├─ icon.ico
│  └─ icon.png
├─ dev-app-update.yml
├─ electron-builder.yml
├─ electron.vite.config.ts
├─ eslint.config.mjs
├─ package.json
├─ pnpm-lock.yaml
├─ README.md
├─ resources
│  └─ icon.png
├─ src
│  ├─ main
│  │  └─ index.ts
│  ├─ preload
│  │  ├─ index.d.ts
│  │  └─ index.ts
│  └─ renderer
│     ├─ index.html
│     └─ src
│        ├─ App.vue
│        ├─ assets
│        ├─ components
│        │  └─ Versions.vue
│        ├─ env.d.ts
│        └─ main.ts
├─ tsconfig.json
├─ tsconfig.node.json
└─ tsconfig.web.json

```

```
text-edit
├─ .editorconfig
├─ .npmrc
├─ .prettierignore
├─ .prettierrc.yaml
├─ build
│  ├─ entitlements.mac.plist
│  ├─ icon.icns
│  ├─ icon.ico
│  └─ icon.png
├─ dev-app-update.yml
├─ electron-builder.yml
├─ electron.vite.config.ts
├─ eslint.config.mjs
├─ fast-init-vue.sh
├─ package.json
├─ pnpm-lock.yaml
├─ README.md
├─ resources
│  └─ icon.png
├─ src
│  ├─ main
│  │  └─ index.ts
│  ├─ preload
│  │  ├─ index.d.ts
│  │  └─ index.ts
│  └─ renderer
│     ├─ auto-imports.d.ts
│     ├─ components.d.ts
│     ├─ index.html
│     └─ src
│        ├─ App.vue
│        ├─ assets
│        ├─ components
│        │  ├─ TopGuide.vue
│        │  └─ Versions.vue
│        ├─ env.d.ts
│        ├─ main.ts
│        ├─ store
│        │  ├─ exampleStore.ts
│        │  └─ index.ts
│        └─ views
├─ tsconfig.json
├─ tsconfig.node.json
└─ tsconfig.web.json

```
