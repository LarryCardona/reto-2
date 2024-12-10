import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs'
import { Tvshow, TvshowsDto } from '../types/tvshow'
import { CreditsDto } from '../types/credits'
import { ImagesDto } from '../types/image'
import { VideosDto } from '../types/video'

@Injectable()
export class TvshowsService {
  private apiUrl = 'https://api.themoviedb.org/3'
  private apiKey = '8d148bf4bd856f091d7aaa282f4c7fba'
  constructor(private http: HttpClient) {}

  getTvShowsByType(type: string, count = 20) {
    return this.http
      .get<TvshowsDto>(`${this.apiUrl}/tv/${type}?api_key=${this.apiKey}`)
      .pipe(map((data) => data.results.slice(0, count)))
  }

  getSimilarTvshows(id: string, count = 20) {
    return this.http
      .get<TvshowsDto>(`${this.apiUrl}/tv/${id}/similar?api_key=${this.apiKey}`)
      .pipe(map((data) => data.results.slice(0, count)))
  }

  getTvshowById(id: string) {
    return this.http.get<Tvshow>(
      `${this.apiUrl}/tv/${id}?api_key=${this.apiKey}`
    )
  }

  getTvshowVideos(id: string) {
    return this.http
      .get<VideosDto>(`${this.apiUrl}/tv/${id}/videos?api_key=${this.apiKey}`)
      .pipe(map((data) => data.results))
  }

  getTvshowImages(id: string) {
    return this.http
      .get<ImagesDto>(`${this.apiUrl}/tv/${id}/images?api_key=${this.apiKey}`)
      .pipe(map((data) => data.backdrops))
  }

  getTvshowCast(id: string) {
    return this.http
      .get<CreditsDto>(`${this.apiUrl}/tv/${id}/credits?api_key=${this.apiKey}`)
      .pipe(map((data) => data.cast))
  }
  searchTvshows(page: number, searchValue?: string) {
    const url = searchValue ? 'search/tv' : 'tv/popular'

    return this.http.get<TvshowsDto>(
      `${this.apiUrl}/${url}?query=${searchValue}&page=${page}&include_adult=true&api_key=${this.apiKey}`
    )
  }
}
