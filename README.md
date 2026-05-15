# Gasoline App

Aplicación web para registrar y analizar los pagos de combustible por vehículo. Permite llevar un historial de recargas, ver estadísticas de gasto por mes y gestionar múltiples vehículos por usuario.

## Stack

- **Framework:** Next.js 15 (App Router)
- **Auth:** NextAuth.js v4 — credenciales, GitHub y Google OAuth
- **Base de datos:** PostgreSQL 15 · Prisma ORM
- **UI:** shadcn/ui · TailwindCSS v4 · Recharts
- **Imágenes:** Cloudinary
- **Estado global:** Zustand · React Hook Form

## Requisitos previos

- Node.js 18+
- Docker

## Instalación

1. **Clonar el repositorio e instalar dependencias**

   ```bash
   npm install
   ```

2. **Configurar variables de entorno**

   Renombrar `.env.template` a `.env` y completar los valores:

   ```env
   DATABASE_URL="postgresql://admin:admin@localhost:5433/gasolineDB"

   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=                  # openssl rand -base64 32

   GITHUB_ID=""
   GITHUB_SECRET=""

   GOOGLE_CLIENT_ID=""
   GOOGLE_CLIENT_SECRET=""

   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=
   ```

3. **Levantar la base de datos**

   ```bash
   docker compose up -d
   ```

4. **Aplicar migraciones y generar el cliente de Prisma**

   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Iniciar el servidor de desarrollo**

   ```bash
   npm run dev
   ```

   La app estará disponible en [http://localhost:3000](http://localhost:3000).

## Comandos disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción |
| `npm run lint` | Linter |
| `npx prisma migrate dev --name <nombre>` | Crear y aplicar nueva migración |
| `npx prisma generate` | Regenerar Prisma Client |
| `npx prisma studio` | GUI para explorar la base de datos |
