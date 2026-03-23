import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MainLayout } from '../../layouts/main-layout/main-layout';
import { EspnApiService } from '../../services/espn-api/espn-api';
import { Competition, Competitor, EspnEvent, TypeName } from '../../models/espn-api.models';
import { CommonModule } from '@angular/common';
import { interval, Subscription, tap } from 'rxjs';
import { calculateTimeRemaining } from '../../core/utils';
import { CardModule } from 'primeng/card';

interface LiveGame {
  event: EspnEvent;
  competitor1: Competitor;
  competitor2: Competitor;
  competition: Competition;
}

interface GameGroup {
  label: string;
  typeNames: TypeName[];
  games: LiveGame[];
}

@Component({
  selector: 'app-tournament-page',
  imports: [CommonModule, MainLayout, CardModule],
  templateUrl: './tournament-page.html',
  styleUrl: './tournament-page.css',
})
export class TournamentPage implements OnInit, OnDestroy {
  espnApiService = inject(EspnApiService);

  private subscription!: Subscription;
  private readonly SCOREBOARD_REFRESH_RATE_MS = 1000 * 60; // 1 min
  private _liveGames = signal<LiveGame[]>([]);
  private _scoreboardRefreshTimeRemaining = signal<string>('calculating...');
  private _isFetchingScoreboardData = signal<boolean>(false);
  private readonly GROUP_ORDER: { typeNames: TypeName[]; label: string }[] = [
    { typeNames: [TypeName.StatusInProgress, TypeName.StatusHalfTime], label: 'In Progress' },
    { typeNames: [TypeName.StatusFinal], label: 'Final' },
    { typeNames: [TypeName.StatusScheduled], label: 'Scheduled' },
  ];

  liveGames = this._liveGames.asReadonly();
  groupedGames = computed<GameGroup[]>(() => {
    const games = this._liveGames();
    return this.GROUP_ORDER.map(({ typeNames, label }) => ({
      label,
      typeNames,
      games: games.filter((g) => typeNames.includes(g.event.status.type.name)),
    })).filter((group) => group.games.length > 0);
  });
  scoreboardRefreshTimeRemaining = this._scoreboardRefreshTimeRemaining.asReadonly();
  isFetchingScoreboardData = this._isFetchingScoreboardData.asReadonly();

  ngOnInit(): void {
    // TODO: setup timer in session storage so refreshes don't re-trigger updates outside of interval

    this.startTimer();

    // Run initial call
    this.fetchScoreboardData();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private createLiveGameFromResponseEvent(event: EspnEvent): LiveGame {
    const competition = event.competitions[0];
    const [competitor1, competitor2] = competition.competitors;

    return {
      event,
      competitor1,
      competitor2,
      competition,
    };
  }

  startTimer() {
    this.subscription = interval(1000)
      .pipe(
        tap(() => {
          const formattedTime = calculateTimeRemaining(this.SCOREBOARD_REFRESH_RATE_MS);
          this._scoreboardRefreshTimeRemaining.set(formattedTime);
          if (formattedTime === '00:00') {
            this.fetchScoreboardData();
          }
        }),
      )
      .subscribe();
  }

  fetchScoreboardData() {
    this._isFetchingScoreboardData.set(true);
    const today = new Date();
    const year = today.getFullYear().toString();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const day = today.getDate().toString().padStart(2, '0');
    this.espnApiService.getScoreboardDataByDate(year, month, day).subscribe({
      next: (response) => {
        const liveGames: LiveGame[] =
          response?.events?.map((event) => this.createLiveGameFromResponseEvent(event)) ?? [];

        this._liveGames.set(liveGames);
        this._isFetchingScoreboardData.set(false);
      },
      error: (err) => {
        this._isFetchingScoreboardData.set(false);
        console.log(`Error fetching scoreboard data: ${err}`);
      },
    });
  }
}
