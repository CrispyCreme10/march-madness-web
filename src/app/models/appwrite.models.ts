import { Models } from 'appwrite';

export interface EntriesModel {
  Entry_Name: string;
  Entry_Teams: string; // Comma delimited list of strings
  Entry_Points: number;
  Teams_Alive: number;
}

export interface TeamsModel {
  Teams: string; // Team Name
  Seed: number;
  RD1: number;
  RD2: number;
  RD3: number;
  RD4: number;
  RD5: number;
  RD6: number;
  Alive: 'TRUE' | 'FALSE';
  Selections: number; // Total selections from entries
  Total_Points: number;
}

export type EntriesModelType = Models.Row & EntriesModel;
export type TeamsModelType = Models.Row & TeamsModel;

export interface LeaderboardParticipant {
  entryId: string;
  rank: number;
  participantName: string;
  teamsAlive: number;
  teamStatus: {
    teamName: string;
    isAlive: boolean;
  }[];
  points: number;
  pointsBehind: number;
}
