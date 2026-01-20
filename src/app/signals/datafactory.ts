import { Injectable } from '@angular/core';
import {Author, Book} from './signals';

@Injectable({
  providedIn: 'root',
})
export class Datafactory {

  createBook(id: number | undefined, title: string, firstName: string, lastName: string, year: number, isbn?: string) : Book {
    return {
      id: id,
      title: title,
      author: {
        firstName: firstName,
        lastName: lastName,
      },
      year: year,
      isbn: isbn,
    };
  }

  createAuthor(firstName: string, lastName: string, birthYear?: number) : Author {
    return {
      firstName: firstName,
      lastName: lastName,
      birthYear: birthYear,
    };
  }
}
