import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AppNavigationService {
  private router = inject(Router);

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goToLeaderboard() {
    this.router.navigate(['/leaderboard']);
  }

  goToTournament() {
    this.router.navigate(['/tournament']);
  }

  goToEntryDetails(entryId: string) {
    this.router.navigate(['/entry', entryId]);
  }
}
