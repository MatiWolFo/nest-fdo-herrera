# para crear app nest + yarn:

- nest new project-name

# para instalar graphql:

- yarn add @nestjs/graphql @nestjs/apollo @apollo/server graphql

# configurar en la raiz roo del app.module.ts

```ts
GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // debug: false,
      // playground: false,
    }),
```

- en los import, primero los de node, luego nest, luego los de gql y studio

## arreglar el error de 1 schema existente, agregar:

```ts
autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
```

## arreglar fix query root:

```ts
1. nest g mo helloWorld // generar un modulo
2. nest g r helloWorld --no-spec // genera un resolver "provider" para el modulo
3. agregar la query de root para evitar errores, despues se reemplaza

@Query(() => String, { description: 'Query placeholder ROOT' })
  helloWorld(): string {
    return 'Hello World';
  }

4. fin, app nest + gql andando
```

# acceder a playground http://localhost:{numero}/graphql:

- viene integrado con graphql, se puede desactivar con: playground: false, en el app module

# instalar Apollo Studio en vez de playground:

```ts
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
```
