import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MainLayout } from '../../layouts/main-layout/main-layout';
import { AppwriteService } from '../../services/appwrite-service/appwrite-service';
import { interval, Subscription, tap } from 'rxjs';
import { calculateTimeRemaining } from '../../core/utils';
import { AppNavigationService } from '../../services/app-navigation-service/app-navigation-service';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leaderboard-page',
  imports: [CommonModule, MainLayout, TableModule, CardModule],
  templateUrl: './leaderboard-page.html',
  styleUrl: './leaderboard-page.css',
})
export class LeaderboardPage implements OnInit, OnDestroy {
  appwriteService = inject(AppwriteService);
  appNavigationService = inject(AppNavigationService);

  private subscription!: Subscription;
  private readonly LEADERBOARD_REFRESH_RATE_MS = 1000 * 60; // 1 min
  private _leaderboardRefreshTimeRemaining = signal<string>('calculating...');
  private _isFetchingLeaderboardData = signal<boolean>(false);

  leaderboardParticipants = this.appwriteService.leaderboardParticipants;
  leaderboardRefreshTimeRemaining = this._leaderboardRefreshTimeRemaining.asReadonly();
  isFetchingLeaderboardData = this._isFetchingLeaderboardData.asReadonly();

  async ngOnInit(): Promise<void> {
    // TODO: setup timer in session storage so refreshes don't re-trigger updates outside of interval

    // DISABLING timer to reduce unnecessary calls - JR 03/20/26
    // this.startTimer();

    // Run initial call
    await this.fetchLeaderboardData();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  startTimer() {
    this.subscription = interval(1000)
      .pipe(
        tap(async () => {
          const formattedTime = calculateTimeRemaining(this.LEADERBOARD_REFRESH_RATE_MS);
          this._leaderboardRefreshTimeRemaining.set(formattedTime);
          if (formattedTime === '00:00') {
            await this.fetchLeaderboardData();
          }
        }),
      )
      .subscribe();
  }

  async fetchLeaderboardData() {
    this._isFetchingLeaderboardData.set(true);
    try {
      await this.appwriteService.getUpdatedLeaderboard();
      this._isFetchingLeaderboardData.set(false);
    } catch (error) {
      this._isFetchingLeaderboardData.set(false);
    }
  }

  openEntryDetails(entryId: string) {
    this.appNavigationService.goToEntryDetails(entryId);
  }
}
