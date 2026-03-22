import { Injectable, signal, computed } from '@angular/core';
import {
  EntriesModelType,
  LeaderboardParticipant,
  TeamsModelType,
} from '../models/appwrite.models';

export interface AppwriteStoreState {
  entries: EntriesModelType[];
  teams: TeamsModelType[];
}

@Injectable({
  providedIn: 'root',
})
export class AppwriteStore {
  private _store = signal<AppwriteStoreState>({
    entries: [],
    teams: [],
  });

  store = this._store.asReadonly();

  readonly entryToTeamsMap = computed(() => {
    const { entries, teams } = this._store();
    const map = new Map<string, TeamsModelType[]>();
    for (const entry of entries) {
      const teamNames = entry.Entry_Teams.split(',').map((t) => t.trim());
      map.set(
        entry.$id,
        teams.filter((t) => teamNames.includes(t.Teams)),
      );
    }
    return map;
  });

  readonly leaderboardParticipants = computed((): LeaderboardParticipant[] => {
    const { entries } = this._store();
    const entryToTeams = this.entryToTeamsMap();

    const participants: LeaderboardParticipant[] = entries.map((entry) => {
      const teams = entryToTeams.get(entry.$id) ?? [];
      let totalPoints = entry.Entry_Points;
      const teamStatus = teams.map((team) => {
        totalPoints += team.Total_Points;
        return { teamName: team.Teams, isAlive: team.Alive === 'TRUE' };
      });
      return {
        entryId: entry.$id,
        participantName: entry.Entry_Name,
        teamsAlive: entry.Teams_Alive,
        teamStatus,
        points: totalPoints,
        pointsBehind: 0,
      };
    });

    const sorted = participants.sort((a, b) => b.points - a.points);
    const leader = sorted[0];
    return sorted.map((p, i) =>
      i === 0 ? p : { ...p, pointsBehind: leader ? leader.points - p.points : 0 },
    );
  });

  updateEntries(entries: EntriesModelType[]) {
    this._store.update((state) => ({ ...state, entries }));
  }

  updateTeams(teams: TeamsModelType[]) {
    this._store.update((state) => ({ ...state, teams }));
  }
}
