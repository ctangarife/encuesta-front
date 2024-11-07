This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

```
encuesta-front
├─ .env
├─ .eslintrc.json
├─ .gitignore
├─ README.md
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ public
│  ├─ logo
│  │  ├─ Logo-UManizales-blanco.svg
│  │  ├─ Logo-UManizales-blanco.svg:Zone.Identifier
│  │  └─ Logo-UManizales-blanco.svg:shield
│  ├─ next.svg
│  └─ vercel.svg
├─ src
│  ├─ app
│  │  ├─ Home.module.sass
│  │  ├─ layout.tsx
│  │  ├─ not-found.tsx
│  │  ├─ page.tsx
│  │  └─ survey
│  │     └─ [[...survey]]
│  │        ├─ layout.tsx
│  │        └─ page.tsx
│  ├─ components
│  │  ├─ Home
│  │  │  ├─ SurveyList
│  │  │  │  ├─ SurveyList.module.sass
│  │  │  │  ├─ SurveyList.tsx
│  │  │  │  └─ index.ts
│  │  │  └─ index.ts
│  │  ├─ Survey
│  │  │  ├─ QuestionWrapper.module.sass
│  │  │  ├─ QuestionWrapper.tsx
│  │  │  ├─ SurveyComponent.module.sass
│  │  │  ├─ SurveyComponent.tsx
│  │  │  └─ index.ts
│  │  └─ shared
│  │     ├─ Footer
│  │     │  ├─ Footer.module.sass
│  │     │  ├─ Footer.tsx
│  │     │  └─ index.ts
│  │     ├─ Header
│  │     │  ├─ Header.module.sass
│  │     │  ├─ Header.tsx
│  │     │  └─ index.ts
│  │     ├─ Loader
│  │     │  ├─ Loader.module.sass
│  │     │  ├─ Loader.tsx
│  │     │  └─ index.ts
│  │     └─ index.ts
│  ├─ config
│  │  └─ env.ts
│  ├─ sass
│  │  ├─ _variables.sass
│  │  ├─ global-error.module.sass
│  │  ├─ globals.sass
│  │  ├─ main.sass
│  │  └─ not-found.module.sass
│  ├─ services
│  │  └─ backEncuesta
│  │     ├─ questions.ts
│  │     ├─ response.ts
│  │     ├─ survey.ts
│  │     └─ urls.ts
│  └─ types
│     ├─ Survey.ts
│     └─ index.ts
├─ tsconfig.json
└─ type.d.ts

```