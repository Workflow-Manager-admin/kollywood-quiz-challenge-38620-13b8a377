import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  username: string = '';
  quizzes = [
    {
      title: 'Blurred Poster Quiz',
      description: 'Guess the movie from a blurred poster & clues.',
      route: '/quiz/blurred-poster',
      icon: '🎬'
    },
    {
      title: 'Character-Movie Match',
      description: 'Match Kollywood characters to movies.',
      route: '/quiz/character-movie-match',
      icon: '👩‍🎤'
    },
    {
      title: 'Movie Bingo',
      description: 'Bingo! Click all that fit the movie category.',
      route: '/quiz/movie-bingo',
      icon: '🔲'
    },
    {
      title: 'Movie Timeline Challenge',
      description: 'Arrange Kollywood films by release date.',
      route: '/quiz/movie-timeline',
      icon: '📅'
    },
    {
      title: 'Spin the Wheel',
      description: 'Spin for a star/year combo, guess the movie!',
      route: '/quiz/spin-the-wheel',
      icon: '🎡'
    },
    {
      title: 'Cast Combo',
      description: 'Which film stars these actors?',
      route: '/quiz/cast-combo',
      icon: '👥'
    }
  ];

  constructor() {}

  ngOnInit() {
    let user: string | null = null;
    if (isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined') {
      user = localStorage.getItem('kq_username');
    }
    if (!user) {
      this.router.navigate(['/login']);
    }
    this.username = user ?? '';
  }

  startQuiz(route: string) {
    this.router.navigate([route]);
  }
}
