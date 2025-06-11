import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { TmdbService } from '../../tmdb.service';
import { QuizUtilService } from '../../shared/quiz-util.service';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-character-movie-match',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-movie-match.component.html',
  styleUrl: './character-movie-match.component.css',
})
export class CharacterMovieMatchComponent implements OnInit {
  loading = true;
  questions: string[] = [];
  pairs: {character: string, movie: string, correctMovie: string}[] = [];
  matches: {[character: string]: string} = {};
  total = 10;
  score = 0;

  constructor(
    private tmdb: TmdbService,
    private quizUtil: QuizUtilService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.getCharacters();
  }

  getCharacters() {
    this.tmdb.getTamilMovies().subscribe((res: any) => {
      const movies = this.quizUtil.shuffle((res.results as any[]).filter((m: any) => m.id && m.title)).slice(0, this.total * 2);
      this.pairs = [];
      let idx = 0;
      for (const m of movies.slice(0, this.total)) {
        this.pairs.push({
          character: `Character ${(idx+1)}`,
          movie: '',
          correctMovie: (m as any).title
        });
        idx++;
      }
      this.questions = movies.slice(0, this.total).map((m: any) => m.title);
      this.matches = {};
      this.loading = false;
    });
  }

  match(character: string, movie: string) {
    this.matches[character] = movie;
    if (Object.keys(this.matches).length === this.total) {
      this.scoreGame();
    }
  }

  scoreGame() {
    let score = 0;
    this.pairs.forEach(pair => {
      if ((this.matches[pair.character] || '').toLowerCase() === pair.correctMovie.toLowerCase()) {
        score++;
      }
    });
    this.score = score;

    const answers = this.pairs.map(pair => ({
      question: `Match for ${pair.character}`,
      correctAnswer: pair.correctMovie,
      userAnswer: this.matches[pair.character],
      correct: (this.matches[pair.character] || '').toLowerCase() === pair.correctMovie.toLowerCase(),
    }));
    if (isPlatformBrowser(this.platformId) && typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('kq_results', JSON.stringify({
        quizType: 'Character-Movie Match',
        score: score,
        total: this.total,
        answers,
      }));
    }
    this.router.navigate(['/results']);
  }
}
