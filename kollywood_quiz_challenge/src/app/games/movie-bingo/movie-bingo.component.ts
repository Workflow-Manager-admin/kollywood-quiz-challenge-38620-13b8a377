import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-bingo',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="movie-bingo">
    <h2>Movie Bingo</h2>
    <p>Coming soon: Play movie bingo!</p>
  </div>`,
  styles: [`
    .movie-bingo {
      padding:2.5rem;
      text-align:center;
      background: linear-gradient(120deg, #fff 60%, #fc03c6 100%);
      min-height:100vh;
    }
    h2 { color: #fc03c6;}
  `]
})
export class MovieBingoComponent {}
