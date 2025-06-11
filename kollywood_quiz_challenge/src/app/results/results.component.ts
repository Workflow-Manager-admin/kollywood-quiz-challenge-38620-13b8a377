import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent implements OnInit {
  score: number = 0;
  total: number = 10;
  answers: any[] = [];
  quizType: string = '';

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // SSR-safe: Only access sessionStorage if browser
    let data: any = {};
    if (isPlatformBrowser(this.platformId) && typeof sessionStorage !== 'undefined') {
      data = JSON.parse(sessionStorage.getItem('kq_results') || '{}');
    }
    this.score = data.score || 0;
    this.total = data.total || 10;
    this.answers = data.answers || [];
    this.quizType = data.quizType || '';
    if (!data.quizType) {
      this.router.navigate(['/dashboard']);
    }
  }

  playAgain() {
    this.router.navigate(['/dashboard']);
  }
}
