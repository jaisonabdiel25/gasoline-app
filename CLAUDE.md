# gasoline-app

App de seguimiento de pagos de combustible. Los usuarios registran pagos por vehículo, ven estadísticas y gestionan su perfil.

## Comandos

```bash
pnpm dev                                    # servidor de desarrollo
pnpm build                                  # build de producción
pnpm lint                                   # linter
npx prisma migrate dev --name <nombre>      # crear y aplicar migración
npx prisma generate                         # regenerar Prisma Client
npx prisma studio                           # GUI de base de datos
```

## Arquitectura

**Next.js App Router con dos grupos de rutas:**
- `app/(app)/` — páginas autenticadas (`/payment`, `/vehicle`, `/profile`)
- `app/(auth)/` — páginas públicas (`/signin`, `/register`)
- `app/api/` — rutas REST (payment, vehicle, user, auth)

**Flujo de datos:**
1. Las páginas llaman hooks en `hooks/` (ej. `useCreatePayment`, `useVehicle`)
2. Los hooks llaman funciones en `services/` que llegan a las rutas API
3. Las rutas API usan Prisma directamente via `lib/prisma.ts`
4. Los formularios se validan con schemas en `validator/` (Yup/Zod via React Hook Form)
5. Las interfaces TypeScript están centralizadas en `interface/`

**Imágenes:** Cloudinary para fotos de perfil.

**Archivos clave:**
- `lib/prisma.ts` — cliente Prisma singleton
- `constant.tsx` — constantes globales
- `next.config.ts` — output standalone, dominios permitidos (Google, Gravatar, Cloudinary)
- `components.json` — configuración de shadcn/ui

## Reglas

- **No modificar `components/ui/`** — son generados por shadcn/ui y se sobreescriben en actualizaciones. Las personalizaciones van en los componentes de cada módulo bajo `modules/`.
- **No instalar dependencias** sin aprobación explícita.
- **No usar `any` como tipo** — siempre tipar correctamente.
- **Siempre manejar errores** en las rutas API.
- **No modificar `/config`** sin preguntar primero.