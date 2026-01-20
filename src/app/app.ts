import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Signals} from './signals/signals';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Signals],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('signal-test');
  protected readonly counter = signal(0);

protected readonly users = signal<User[]>([
    { id: 1, name: 'John Doe', email: 'asd@asd.it'}
      ]);

  updateTitle() {
    this.title.update(() => 'asdasdas');
    this.users.update(users => [
      ...users,
      { id: 2, name: 'Jane Smith', email: 'asdsadas@.it'}
    ]);
  }

  updateFirstUserName() {
    this.users.update(users => {
      if (users.length === 0) {
        return users;
      }
      const updatedUsers = [...users];
      updatedUsers[0] = {...updatedUsers[0], name: 'Updated Name'};
      return updatedUsers;
    });
  }

  incrementCounter() {
    this.counter.set(this.counter() + Math.random());
  }
}
