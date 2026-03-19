import { AppEnvironment } from './models';

export const environment: AppEnvironment = {
  production: true,
  appwriteEndpoint: process.env['APPWRITE_ENDPOINT'],
  appwriteProjectID: process.env['APPWRITE_PROJECT_ID'],
  appwriteDatabaseID: process.env['APPWRITE_DATABASE_ID'],
};
