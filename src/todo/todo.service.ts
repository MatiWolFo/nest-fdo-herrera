import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { UpdateTodoInput, CreateTodoInput, StatusArgs } from './dto';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: 'texto 1 prueba', done: false },
    { id: 2, description: 'texto 2 prueba', done: false },
    { id: 3, description: 'texto 3 prueba', done: true },
    { id: 4, description: 'texto 4 prueba', done: true },
  ];

  // para acceder al bloque anterior
  get totalTodos() {
    return this.todos.length;
  }

  get completedTodos() {
    return this.todos.filter((todo) => todo.done === true).length;
  }

  get pendingTodos() {
    return this.todos.filter((todo) => todo.done === false).length;
  }

  findAll(statusArgs: StatusArgs): Todo[] {
    const { status } = statusArgs;

    // filtrar los todo segun su estado DONE segun el valor del ARGS que esta entrando
    if (status !== undefined) {
      return this.todos.filter((todo) => todo.done === status);
    }
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new NotFoundException(`TODO of ID ${id} not found...`);
    }
    return todo;
  }

  createTodo({ description }: CreateTodoInput): Todo {
    const todo = new Todo();
    todo.description = description;
    todo.id = Math.max(...this.todos.map((todo) => todo.id), 0) + 1;
    todo.done;

    this.todos.push(todo);

    return todo;
  }

  updateTodo(id: number, { description, done }: UpdateTodoInput) {
    const todoToUpdate = this.findOne(id);

    if (!todoToUpdate) {
      throw new NotFoundException(`TODO of ID ${id} not found...`);
    }

    if (description) {
      todoToUpdate.description = description;
    }

    if (done !== undefined) {
      todoToUpdate.done = done;
    }

    this.todos = this.todos.map((dbTodo) => {
      if (dbTodo.id === id) {
        return todoToUpdate;
      } else {
        return dbTodo;
      }
    });
    return todoToUpdate;
  }

  removeTodo(id: number) {
    const todoToRemove = this.findOne(id);
    this.todos = this.todos.filter((dbTodo) => dbTodo.id !== id);

    return todoToRemove;
  }
}
