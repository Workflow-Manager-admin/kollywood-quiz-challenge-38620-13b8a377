import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-timeline',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="movie-timeline">
    <h2>Movie Timeline Challenge</h2>
    <p>Coming soon: Arrange movies in the right timeline!</p>
  </div>`,
  styles: [`
    .movie-timeline {
      padding:2.5rem;
      text-align:center;
      background: linear-gradient(120deg, #fff 60%, #fc03c6 100%);
      min-height:100vh;
    }
    h2 { color: #fc03c6;}
  `]
})
export class MovieTimelineComponent {}
