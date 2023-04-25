import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: 'TODO quick aggregations' })
export class AggregationsType {

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  pending: number;

  @Field(() => Int)
  completed: number;

  // EJEMPLO campo deprecado
  @Field(() => Int, { deprecationReason: 'USE COMPLETED AND TOTAL INSTEAD' })
  totalTodosCompleted: number;
}