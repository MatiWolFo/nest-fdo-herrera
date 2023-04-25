/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Field, Int, ObjectType } from '@nestjs/graphql';
// quiero que un registro luzca como este objeto, es una entidad y ademas un ojto personalizado
// puede ser un schema en vez de una entidad
@ObjectType()
export class Todo {

  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => Boolean, { nullable: true })
  done: boolean = false;
}
