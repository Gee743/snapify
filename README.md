## [Demo](https://rent-appartment-application.vercel.app/)

### Full Stack Airbnb Clone with Next.js 13 App Router: React, Tailwind, Prisma, MongoDB, NextAuth 2023

![Screenshot 2023-09-09 at 01 29 42](https://github.com/KChakhalyan/airbnb-clone/assets/10487372/41cff2ba-4d86-465f-8567-82e9e6869ecf)

```shell
git clone https://github.com/KChakhalyan/airbnb-clone.git
```

### Prerequisites

**Node version 14.x**

### Cloning the repository

```shell
git clone https://github.com/AntonioErdeljac/next13-airbnb-clone.git
```

### Install packages

```shell
npm i
```

### Setup .env file

```js
DATABASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=
NEXTAUTH_SECRET=
ADMIN_USERNAME=
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
```

`ADMIN_USERNAME` and `ADMIN_PASSWORD` are the shared credentials for `/admin`.
Keep them private and configure them in your deployment environment. Generate a
separate random `ADMIN_SESSION_SECRET` with at least 32 characters (for example,
`openssl rand -hex 32`). Do not reuse `NEXTAUTH_SECRET`.

### Setup Prisma

```shell
npx prisma db push

```

### Start the app

```shell
npm run dev
```

On the first successful admin dashboard load, the existing built-in public
spaces are imported into the database once. From then on, the team can add,
edit, and remove public spaces at `/admin`; each one appears at
`/community/<slug>`.

## Available commands

Running commands with npm `npm run [command]`

| command | description                              |
| :------ | :--------------------------------------- |
| `dev`   | Starts a development instance of the app |
