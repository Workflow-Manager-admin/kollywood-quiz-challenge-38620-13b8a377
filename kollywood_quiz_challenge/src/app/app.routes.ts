import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'quiz/blurred-poster', loadComponent: () => import('./games/blurred-poster/blurred-poster.component').then(m => m.BlurredPosterComponent) },
  { path: 'quiz/character-movie-match', loadComponent: () => import('./games/character-movie-match/character-movie-match.component').then(m => m.CharacterMovieMatchComponent) },
  { path: 'quiz/movie-bingo', loadComponent: () => import('./games/movie-bingo/movie-bingo.component').then(m => m.MovieBingoComponent) },
  { path: 'quiz/movie-timeline', loadComponent: () => import('./games/movie-timeline/movie-timeline.component').then(m => m.MovieTimelineComponent) },
  { path: 'quiz/spin-the-wheel', loadComponent: () => import('./games/spin-the-wheel/spin-the-wheel.component').then(m => m.SpinTheWheelComponent) },
  { path: 'quiz/cast-combo', loadComponent: () => import('./games/cast-combo/cast-combo.component').then(m => m.CastComboComponent) },
  { path: 'results', loadComponent: () => import('./results/results.component').then(m => m.ResultsComponent) },
  { path: '**', redirectTo: 'login' }
];
