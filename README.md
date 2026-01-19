

1. Levantar la base de datos en local

```
docker compose up -d
```

2. renombar el .env.template por .env
3. remplazar las variables en el .env

#Prisma commands
```
npx prisma init
npx prisma migrate dev
npx prisma generate

```


```
FUNCIONALIDAD DESEADA

Esta app permitira por usuario registrar los pagos de gasolina cada vez que se realizen recaras de combustible. A su vez se podran sacar estadisticas por rango de fechas.


1. se registraran por usuario los pagos
2. se actualizaran, eliminaran (eliminado lógico), registraran, y obtendran pagos
3. se crearan usuarios, se realizara login 
```
