import { EntriesModelType, TeamsModelType } from './appwrite.models';

export interface EntryDetailsModel {
  entry: EntriesModelType;
  teams: TeamsModelType[];
}
