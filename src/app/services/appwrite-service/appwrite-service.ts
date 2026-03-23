import { inject, Injectable } from '@angular/core';
import { Client, Models, Query, TablesDB } from 'appwrite';
import {
  EntriesModelType,
  LeaderboardParticipant,
  TeamsModelType,
} from '../../models/appwrite.models';
import { AppwriteStore } from '../../store/appwrite.store';

export type { LeaderboardParticipant };

@Injectable({
  providedIn: 'root',
})
export class AppwriteService {
  private appwriteStore = inject(AppwriteStore);

  private client: Client;
  private tablesDB: TablesDB;

  private ENTRIES_TABLE_ID = 'entries';
  private TEAMS_TABLE_ID = 'teams';

  leaderboardParticipants = this.appwriteStore.leaderboardParticipants;

  constructor() {
    this.client = new Client()
      .setEndpoint(import.meta.env['NG_APP_APPWRITE_ENDPOINT'])
      .setProject(import.meta.env['NG_APP_APPWRITE_PROJECT_ID']);

    this.tablesDB = new TablesDB(this.client);
  }

  async loadEntries(): Promise<EntriesModelType[]> {
    try {
      const entriesRowList = await this.getAllEntries();
      this.appwriteStore.updateEntries(entriesRowList.rows);
      return entriesRowList.rows;
    } catch (error) {
      console.error('Error fetching entries:', error);
      throw error;
    }
  }

  async loadTeams(): Promise<TeamsModelType[]> {
    try {
      const teamsRowList = await this.getAllTeams();
      this.appwriteStore.updateTeams(teamsRowList.rows);
      return teamsRowList.rows;
    } catch (error) {
      console.error('Error fetching teams:', error);
      throw error;
    }
  }

  async getUpdatedLeaderboard(): Promise<void> {
    try {
      // 1. Get all Entry records and all Teams records
      await Promise.all([this.loadEntries(), this.loadTeams()]);
    } catch (error) {
      console.error('Error updating leaderboard:', error);
      throw error;
    }
  }

  private async getAllEntries(): Promise<Models.RowList<EntriesModelType>> {
    try {
      return await this.tablesDB.listRows<EntriesModelType>({
        databaseId: import.meta.env['NG_APP_APPWRITE_DATABASE_ID'],
        tableId: this.ENTRIES_TABLE_ID,
        queries: [Query.limit(1000)], // Assuming there won't be more than 1000 entries; adjust as needed
      });
    } catch (error) {
      console.error('Error fetching entries:', error);
      throw error;
    }
  }

  private async getAllTeams(): Promise<Models.RowList<TeamsModelType>> {
    try {
      return await this.tablesDB.listRows<TeamsModelType>({
        databaseId: import.meta.env['NG_APP_APPWRITE_DATABASE_ID'],
        tableId: this.TEAMS_TABLE_ID,
        queries: [Query.limit(1000)], // Assuming there won't be more than 1000 teams; adjust as needed
      });
    } catch (error) {
      console.error('Error fetching teams:', error);
      throw error;
    }
  }
}
