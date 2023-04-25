import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { UpdateTodoInput, CreateTodoInput, StatusArgs } from './dto';
import { AggregationsType } from './types/aggregations.types';

@Resolver(() => Todo)
export class TodoResolver {
  // injectar los services
  constructor(private readonly todoService: TodoService) { }

  // la query va a devolver algo de tipo ENTIDAD o SCHEMA
  @Query(() => [Todo], {
    description: 'find all TODOS',
  })
  findAll(@Args() statusArgs: StatusArgs): Todo[] {
    // recibe el injectado del service
    return this.todoService.findAll(statusArgs);
  }

  @Query(() => Todo, {
    description: 'find TODO by ID',
  })
  findOne(@Args('id', { type: () => Int }) id: number): Todo {
    return this.todoService.findOne(id);
  }

  // AGGREGATIONS o AGRUPACIONES
  //* estas son manuales, pero pueden ser mejoradas por el aggregation type
  @Query(() => Int, { description: 'counts total TODOS' })
  completedTodos(): number {
    return this.todoService.completedTodos;
  }

  @Query(() => Int, { description: 'counts total TODOS' })
  pendingTodos(): number {
    return this.todoService.pendingTodos;
  }

  @Query(() => Int, { description: 'counts done true TODOS' })
  totalTodos(): number {
    return this.todoService.totalTodos;
  }

  @Query(() => AggregationsType, {
    description: 'has the 3 aggregations into 1',
  })
  aggregations(): AggregationsType {
    return {
      completed: this.todoService.completedTodos,
      pending: this.todoService.pendingTodos,
      total: this.todoService.totalTodos,
      totalTodosCompleted: this.todoService.completedTodos,
    }
  }

  @Mutation(() => Todo, {
    description: 'create a TODO using input',
  })
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.todoService.createTodo(createTodoInput);
  }

  @Mutation(() => Todo, {
    description: 'update a TODO by ID',
  })
  updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    return this.todoService.updateTodo(updateTodoInput.id, updateTodoInput);
  }

  @Mutation(() => Todo, {
    description: 'delete a TODO by ID',
  })
  removeTodo(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.removeTodo(id);
  }
}
