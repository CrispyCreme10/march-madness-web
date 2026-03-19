export interface AppEnvironment {
  production: boolean;
  appwriteEndpoint: string | undefined;
  appwriteProjectID: string | undefined;
  appwriteDatabaseID: string | undefined;
}
