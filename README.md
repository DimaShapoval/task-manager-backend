

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Migrations
### Generate
```bash
npm run typeorm -- migration:generate ./migrations/NameOfMigration -d src/data-source.ts
```
### Run
```bash
npm run typeorm -- migration:run -d src/data-source.ts
```

