import {Component, computed, effect, signal} from '@angular/core';
import {Datafactory} from './datafactory';

export interface Author {
  firstName: string;
  lastName: string;
  birthYear?: number;
}

export interface Book {
  id?: number;
  title: string;
  author: Author;
  year: number;
  isbn?: string;
}

@Component({
  selector: 'app-signals',
  imports: [],
  templateUrl: './signals.html',
  styleUrl: './signals.scss',
})
export class Signals {

  protected readonly counter = signal(0);
  // NB: computed signals are read-only, they cannot be set or updated
  protected readonly binaryCounter = computed(() => this.counter().toString(2));
  protected readonly books = signal<Book[]>([]);
  protected readonly counterHistory : number[] = [];
  // Angular will automatically destroy the effect when the component is destroyed
  protected readonly counterHistoryEffect = effect(() => {
    console.log('Counter changed to:', this.counter());
    this.counterHistory.push(this.counter());
  });


  constructor(private readonly datafactory: Datafactory) {
    const book1 = this.datafactory.createBook(1, 'It', 'Stephen', 'King', 1985, '9780450411434');
    const book2 = this.datafactory.createBook(2, 'Ubik', 'Philip K.', 'Dick', 1969, '8834705084');
    this.books.set([book1, book2]);
  }

  incrementCounter() {
    this.counter.set(this.counter() + Math.floor(Math.random() * 100) + 1);
  }

  decrementCounter() {
    if (this.counter() === 0) {
      console.log('Counter is already at zero, cannot decrement further.');
    } else {
      this.counter.set(this.counter() - 1);
    }
  }

  resetCounter() {
    this.counter.set(0);
  }


}
