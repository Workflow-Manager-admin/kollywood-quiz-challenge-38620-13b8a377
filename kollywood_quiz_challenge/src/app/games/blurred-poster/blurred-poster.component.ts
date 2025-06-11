import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { TmdbService } from '../../tmdb.service';
import { QuizUtilService } from '../../shared/quiz-util.service';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizQuestionComponent } from '../../shared/quiz-question/quiz-question.component';

@Component({
  selector: 'app-blurred-poster',
  standalone: true,
  imports: [CommonModule, FormsModule, QuizQuestionComponent],
  templateUrl: './blurred-poster.component.html',
  styleUrl: './blurred-poster.component.css',
})
export class BlurredPosterComponent implements OnInit {
  loading = true;
  questions: any[] = [];
  userAnswers: string[] = [];
  clues: string[][] = [];
  currentIdx = 0;
  total = 10;
  answerRevealed = false;
  score = 0;

  constructor() {}

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.loading = true;
    this.tmdb.getTamilMovies().subscribe((res: any) => {
      const movies = this.quizUtil.shuffle([...res.results as any[]]).slice(0, this.total + 5); // buffer for filter
      this.questions = movies
        .filter((m: any) => m.poster_path && m.title)
        .slice(0, this.total)
        .map((m: any) => ({
          id: m.id,
          imageUrl: this.tmdb.getImageUrl(m.poster_path),
          answer: m.title,
          overview: m.overview,
          release: m.release_date,
          genre: m.genre_ids?.join(', '),
        }));
      // Generate clues
      this.clues = this.questions.map(q => {
        const clue1 = "Release Year: " + (q.release?.substring(0, 4) ?? 'Unknown');
        const clue2 = "About: " + (q.overview?.split(' ').slice(0,12).join(' ') + '...');
        return [clue1, clue2];
      });
      this.userAnswers = Array(this.total).fill('');
      this.loading = false;
    });
  }

  setAnswer(ans: string) {
    this.userAnswers[this.currentIdx] = ans;
  }

  reveal() {
    this.answerRevealed = true;
    // No scoring until Next
  }

  next() {
    const correct = (this.userAnswers[this.currentIdx] || '').trim().toLowerCase()
      === this.questions[this.currentIdx].answer.trim().toLowerCase();
    if (correct) this.score++;
    if (this.currentIdx < this.total - 1) {
      this.answerRevealed = false;
      this.currentIdx++;
    } else {
      this.showResults();
    }
  }

  showResults() {
    const answers = this.questions.map((q, i) => ({
      question: 'Guess the blurred poster',
      correctAnswer: q.answer,
      userAnswer: this.userAnswers[i],
      correct: (this.userAnswers[i] || '').trim().toLowerCase() === q.answer.trim().toLowerCase(),
    }));
    // SSR-safe: Only access sessionStorage if in browser
    if (isPlatformBrowser(this.platformId) && typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('kq_results', JSON.stringify({
        quizType: 'Blurred Poster Quiz',
        score: this.score,
        total: this.total,
        answers,
      }));
    }
    this.router.navigate(['/results']);
  }
}
