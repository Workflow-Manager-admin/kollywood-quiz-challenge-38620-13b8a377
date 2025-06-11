import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cast-combo',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="cast-combo">
    <h2>Cast Combo</h2>
    <p>Coming soon: Guess the movie from actor combos!</p>
  </div>`,
  styles: [`
    .cast-combo {
      padding:2.5rem;
      text-align:center;
      background: linear-gradient(120deg, #fff 60%, #fc03c6 100%);
      min-height:100vh;
    }
    h2 { color: #fc03c6;}
  `]
})
export class CastComboComponent {}
