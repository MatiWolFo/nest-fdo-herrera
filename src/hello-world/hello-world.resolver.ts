import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  // este "() => String" es lo que va a regresar la query como tal
  @Query(() => String, {
    name: 'helloWorld',
    description: 'Query placeholder ROOT',
  })
  // este ": string" es lo que devuelve el metodo
  helloWorld(): string {
    return 'Hello World';
  }

  @Query(() => Float, {
    name: 'randomNumberFloat',
    description:
      'Generates a random number from 0 to 100, with 2 decimal digits',
  })
  randomNumber(): number {
    return parseFloat((Math.random() * 100).toFixed(2));
  }

  // Int viene de nestGQL, es lo que retorna la query
  @Query(() => Int, {
    name: 'randomNumberInt',
    description: 'Generates a random Integer number from 0 to Args "to"',
  })
  // tipo : number es el tipado de TS
  // implementar el type: condiciona al argumento a ser del tipo que especifica, en este caso no se puede entrar otro numero que no sea un INT
  // puede ponerle nulleable para evitar que sea obligatorio, sin un service que lo especifique (Int! to Int)
  randomIntNumber(
    @Args('to', { nullable: true, type: () => Int }) to: number,
  ): number {
    // recibe el argumento adicional, usandolo en el return
    return Math.ceil(Math.random() * to);
  }
}
