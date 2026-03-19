import { Injectable } from '@angular/core';
import { Client, Databases, ID, Models, Query, TablesDB } from 'appwrite';
import { environment } from '../../../environments/environment'; // Store your IDs here
import {
  EntriesModel,
  EntriesModelType,
  TeamsModel,
  TeamsModelType,
} from '../../models/appwrite.models';

export interface LeaderboardParticipant {
  participantName: string;
  teamsAlive: number;
  teamStatus: {
    teamName: string;
    isAlive: boolean;
  }[];
  points: number;
}

@Injectable({
  providedIn: 'root',
})
export class AppwriteService {
  private client: Client;
  private tablesDB: TablesDB;

  private ENTRIES_TABLE_ID = 'entries';
  private TEAMS_TABLE_ID = 'teams';

  constructor() {
    this.client = new Client()
      .setEndpoint(environment.appwriteEndpoint!)
      .setProject(environment.appwriteProjectID!);

    this.tablesDB = new TablesDB(this.client);
  }

  async getUpdatedLeaderboard(): Promise<LeaderboardParticipant[]> {
    try {
      // 1. Get all Entry records and all Teams records
      const entriesRowList = await this.getAllEntries();
      const entries: EntriesModel[] = entriesRowList.rows;
      const teamsRowList = await this.getAllTeams();
      const teams: TeamsModel[] = teamsRowList.rows;

      const teamNameMap = new Map<string, TeamsModel>(teams.map((team) => [team.Teams, team]));

      // 2. Create a link between an Entry, it's teams, and the Teams records
      const leaderboardParticipants: LeaderboardParticipant[] = [];
      entries.forEach((entry) => {
        const leaderboardParticipant: LeaderboardParticipant = {
          participantName: entry.Entry_Name,
          teamsAlive: entry.Teams_Alive,
          teamStatus: [],
          points: 0,
        };
        let totalParticipantPoints = entry.Entry_Points;
        const teamNames = entry.Entry_Teams.split(',');
        teamNames.forEach((teamName) => {
          const team = teamNameMap.get(teamName);
          if (team) {
            totalParticipantPoints += team.Total_Points;
            leaderboardParticipant.teamStatus = [
              ...leaderboardParticipant.teamStatus,
              {
                teamName: team.Teams,
                isAlive: team.Alive === 'TRUE',
              },
            ];
          } else {
            console.error(`Team (${teamName}) not found for participant ${entry.Entry_Name}`);
          }
        });

        leaderboardParticipant.points = totalParticipantPoints;
        leaderboardParticipants.push(leaderboardParticipant);
      });

      return leaderboardParticipants.sort((a, b) => b.points - a.points);
    } catch (error) {
      console.error('Error updating leaderboard:', error);
      throw error;
    }
  }

  private async getAllEntries(): Promise<Models.RowList<EntriesModelType>> {
    try {
      return await this.tablesDB.listRows<EntriesModelType>({
        databaseId: environment.appwriteDatabaseID!,
        tableId: this.ENTRIES_TABLE_ID,
        queries: [Query.limit(1000)],
      });
    } catch (error) {
      console.error('Error fetching entries:', error);
      throw error;
    }
  }

  private async getAllTeams(): Promise<Models.RowList<TeamsModelType>> {
    try {
      return await this.tablesDB.listRows<TeamsModelType>({
        databaseId: environment.appwriteDatabaseID!,
        tableId: this.TEAMS_TABLE_ID,
        queries: [Query.limit(1000)],
      });
    } catch (error) {
      console.error('Error fetching teams:', error);
      throw error;
    }
  }
}
