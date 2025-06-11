import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

// PUBLIC_INTERFACE
@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  /** TMDb API URL */
  private readonly baseUrl = environment.tmdbBaseUrl;
  /** TMDb API KEY - not inlined in code, loaded from env config */
  private readonly apiKey = environment.tmdbApiKey;
  private readonly http = inject(HttpClient);

  /**
   * PUBLIC_INTERFACE
   * Fetches a list of Kollywood (Tamil) movies, sorted by popularity.
   * Only returns movies with the language code 'ta' (Tamil).
   */
  getTamilMovies(page: number = 1): Observable<any> {
    const url = `${this.baseUrl}/discover/movie`;
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'en-US')
      .set('with_original_language', 'ta')
      .set('sort_by', 'popularity.desc')
      .set('page', String(page));
    return this.http.get(url, { params });
  }

  /**
   * PUBLIC_INTERFACE
   * Gets TMDb movie details for a given TMDb movie ID.
   * @param id TMDb movie ID
   */
  getMovieDetails(id: number): Observable<any> {
    const url = `${this.baseUrl}/movie/${id}`;
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'en-US');
    return this.http.get(url, { params });
  }

  /**
   * PUBLIC_INTERFACE
   * Returns a full TMDb image URL (poster, backdrop, profile) for use in <img src>.
   * Default size is 'w500', but you can use 'original' or other sizes as per TMDb image API.
   * @param path Partial TMDb image path (from poster_path, backdrop_path, etc.)
   * @param size Image size (e.g., 'w500', 'original')
   */
  getImageUrl(path: string | null, size: string = 'w500'): string | null {
    if (!path) return null;
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }
}
