import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainLayout } from '../../layouts/main-layout/main-layout';
import { AppwriteStore } from '../../store/appwrite.store';
import { AppwriteService } from '../../services/appwrite-service/appwrite-service';
import { EntryDetailsModel } from '../../models/entry-details.models';
import { TableModule } from 'primeng/table';
import { Column } from '../../core/ui/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TeamsModelType } from '../../models/appwrite.models';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-entry-details-page',
  imports: [
    CommonModule,
    MainLayout,
    TableModule,
    MultiSelectModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    CardModule,
  ],
  templateUrl: './entry-details-page.html',
  styleUrl: './entry-details-page.css',
})
export class EntryDetailsPage implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private store = inject(AppwriteStore);
  private appwriteService = inject(AppwriteService);

  private subscription = new Subscription();
  private _entryId = signal<string | null>(null);
  private _isLoading = signal<boolean>(false);

  isLoading = this._isLoading.asReadonly();
  entryDetails = computed((): EntryDetailsModel | null => {
    const entryId = this._entryId();
    if (!entryId) return null;

    const entry = this.store.store().entries.find((e) => e.$id === entryId);
    if (!entry) return null;

    const teams = this.store.entryToTeamsMap().get(entryId) ?? [];
    const rankn = this.store.leaderboardParticipants().findIndex((p) => p.entryId === entryId);
    const rank = rankn === -1 ? 0 : rankn + 1;
    return { entry, teams, rank };
  });
  cols!: Column[];
  selectedColumns!: Column[];
  teamPoints = computed(() => {
    const details = this.entryDetails();
    if (!details) return 0;
    return this.calculateTeamPoints(details.teams);
  });
  totalPoints = computed(() => {
    const details = this.entryDetails();
    if (!details) return 0;
    return details.entry.Entry_Points + this.teamPoints();
  });

  ngOnInit(): void {
    this.subscription.add(
      this.route.params.subscribe((params) => {
        this._entryId.set(params['entryId']);
      }),
    );

    if (!this.store.store().entries.length) {
      this.loadData();
    }

    this.cols = [
      { field: 'Teams', header: 'Team' },
      { field: 'Seed', header: 'Seed' },
      { field: 'Alive', header: 'Alive' },
      { field: 'RD1', header: '1st Round' },
      { field: 'RD2', header: '2nd Round' },
      { field: 'RD3', header: 'Sweet 16' },
      { field: 'RD4', header: 'Elite 8' },
      { field: 'RD5', header: 'Final 4' },
      { field: 'RD6', header: 'Championship' },
      { field: 'Total_Points', header: 'Total Points' },
    ];
    this.selectedColumns = this.cols;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private async loadData() {
    this._isLoading.set(true);
    try {
      await this.appwriteService.getUpdatedLeaderboard();
    } finally {
      this._isLoading.set(false);
    }
  }

  calculateTeamPoints(teams: TeamsModelType[]): number {
    return teams.reduce((total: number, team: any) => total + team.Total_Points, 0);
  }
}
