# next-js-app-macdonalds
App MacDonalds para listar, fazer pedidos e colocar no carrinho.

### install tools

``` 
npm install prisma@6.2.1
npm install @prisma/client@6.2.1
```
-- somente usar em dev

``` npm install -D ts-node@10.9.2 ```
``` npm install -D eslint-plugin-simple-import-sort@12.1.1 ```

### init prisma

``` 
npx prisma init
npx prisma format
``` 

### migration

``` npx prisma migrate dev```

-- parar rodar o seed.ts

``` npx prisma db seed```

### Algumas ferramentas

shadc 

``` npx shadcn@2.3.0 init  ```

``` npx shadcn@2.3.0 add button  ```

``` npx shadcn@2.3.0 add input  ```

``` npx shadcn@2.3.0 add card  ```

``` npx shadcn@2.3.0 add scroll-area  ```

``` npx shadcn@2.3.0 add sheet ```

``` npx shadcn@2.3.0 add drawer ```

``` npx shadcn@2.3.0 add form ```

``` npm install react-number-format@5.4.3 ```

``` npx shadcn@2.3.0 add sonner ```

Tailwind CSS

Prettier 
``` 
npm install -D prettier prettier-plugin-tailwindcss@0.6.5
``` 

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
