# ICS208 Project - React + TypeScript + Vite

This project is a template using React with TypeScript in Vite.

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Radix UI
- Other libraries (see `package.json` for a complete list)

## Project Structure

- `src/`: Contains the main application code
  - `App.tsx`: Main application component
  - `components/`: Reusable React components
  - `context/`: React Context providers
  - `hooks/`: Custom React hooks
  - `lib/`: Utility functions
  - `pages/`: Application pages/routes
- `public/`: Static assets
- `index.html`: Main HTML entry point
- `package.json`: Project dependencies and scripts
- `tailwind.config.ts`: Tailwind CSS configuration
- `vite.config.ts`: Vite configuration
- `tsconfig.json`: TypeScript configuration

## Getting Started

1.  Clone the repository
2.  Install dependencies: `npm install`
3.  Run the development server: `npm run dev`
4.  Open your browser to the address shown in the terminal (usually `http://localhost:5173/`)

## Scripts

- `dev`: Starts the development server
- `build`: Builds the project for production
- `lint`: Runs ESLint to check for code quality issues
- `preview`: Starts a local server to preview the production build

## Expanding the ESLint configuration

For production applications, enable type-aware lint rules in `eslint.config.js`:

```js
export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```
