import { Injectable, inject } from '@angular/core';
import { TmdbService } from '../tmdb.service';

// PUBLIC_INTERFACE
@Injectable({providedIn: 'root'})
export class QuizUtilService {
  private readonly tmdb = inject(TmdbService);

  /**
   * PUBLIC_INTERFACE
   * Shuffle (Fisher-Yates) for arrays.
   */
  shuffle<T>(arr: T[]): T[] {
    const a = arr.slice();
    for (let i = a.length-1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i+1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // (Other helper methods can be added as needed per quiz.)
}
