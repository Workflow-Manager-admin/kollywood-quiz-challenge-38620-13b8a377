import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spin-the-wheel',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="spin-the-wheel">
    <h2>Spin the Wheel</h2>
    <p>Coming soon: Guess the movie from spin combos!</p>
  </div>`,
  styles: [`
    .spin-the-wheel {
      padding:2.5rem;
      text-align:center;
      background: linear-gradient(120deg, #fff 60%, #fc03c6 100%);
      min-height:100vh;
    }
    h2 { color: #fc03c6;}
  `]
})
export class SpinTheWheelComponent {}
