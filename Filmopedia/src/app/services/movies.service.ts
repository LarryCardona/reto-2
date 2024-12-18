import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs'

import { CreditsDto } from '../types/credits'
import { ImagesDto } from '../types/image'
import { GenresDot, Movie, MoviesDto } from '../types/movie'
import { VideosDto } from '../types/video'

@Injectable()
export class MoviesService {
  private apiUrl = 'https://api.themoviedb.org/3'
  private apiKey = '8d148bf4bd856f091d7aaa282f4c7fba'
  constructor(private http: HttpClient) {}

  getMoviesByType(type: string, count = 20) {
    return this.http
      .get<MoviesDto>(`${this.apiUrl}/movie/${type}?api_key=${this.apiKey}`)
      .pipe(map((data) => data.results.slice(0, count)))
  }

  getSimilarMovies(id: string, count = 20) {
    return this.http
      .get<MoviesDto>(
        `${this.apiUrl}/movie/${id}/similar?api_key=${this.apiKey}`
      )
      .pipe(map((data) => data.results.slice(0, count)))
  }

  getMovieById(id: string) {
    return this.http.get<Movie>(
      `${this.apiUrl}/movie/${id}?api_key=${this.apiKey}`
    )
  }

  getMovieVideos(id: string) {
    return this.http
      .get<VideosDto>(
        `${this.apiUrl}/movie/${id}/videos?api_key=${this.apiKey}`
      )
      .pipe(map((data) => data.results))
  }

  getMovieImages(id: string) {
    return this.http
      .get<ImagesDto>(
        `${this.apiUrl}/movie/${id}/images?api_key=${this.apiKey}`
      )
      .pipe(map((data) => data.backdrops))
  }

  getMovieCast(id: string) {
    return this.http
      .get<CreditsDto>(
        `${this.apiUrl}/movie/${id}/credits?api_key=${this.apiKey}`
      )
      .pipe(map((data) => data.cast))
  }

  searchMovies(page: number, searchValue?: string) {
    const url = searchValue ? 'search/movie' : 'movie/popular'

    return this.http.get<MoviesDto>(
      `${this.apiUrl}/${url}?query=${searchValue}&page=${page}&include_adult=true&api_key=${this.apiKey}`
    )
  }

  getMovieGenres() {
    return this.http
      .get<GenresDot>(`${this.apiUrl}/genre/movie/list?api_key=${this.apiKey}`)
      .pipe(map((data) => data.genres))
  }

  getMoviesByGenre(genreId?: string, pageNumber = 1) {
    return genreId
      ? this.http.get<MoviesDto>(
          `${this.apiUrl}/discover/movie?with_genres=${genreId}&page=${pageNumber}&api_key=${this.apiKey}`
        )
      : this.http.get<MoviesDto>(
          `${this.apiUrl}/movie/popular?api_key=${this.apiKey}`
        )
  }
}
