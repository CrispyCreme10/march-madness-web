import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensCollegeBasketballScoreboardResponse } from '../../models/espn-api.models';

@Injectable({
  providedIn: 'root',
})
export class EspnApiService {
  http = inject(HttpClient);

  private readonly baseScoreboardUrl =
    'https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard';

  getScoreboardDataByDate(
    year: string,
    month: string,
    day: string,
  ): Observable<MensCollegeBasketballScoreboardResponse> {
    return this.http.get<MensCollegeBasketballScoreboardResponse>(this.baseScoreboardUrl, {
      params: { dates: `${year}${month}${day}` },
    });
  }
}
