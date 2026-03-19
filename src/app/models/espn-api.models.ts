// url for response https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard?dates={YYYYMMDD}

export interface MensCollegeBasketballScoreboardResponse {
  leagues: League[];
  groups: string[];
  day: Day;
  events: EspnEvent[];
  provider: Provider;
  eventsDate: EventsDate;
}

export interface Day {
  date: Date;
}

export interface EspnEvent {
  id: string;
  uid: string;
  date: string;
  name: string;
  shortName: string;
  season: EventSeason;
  competitions: Competition[];
  links: OddLink[];
  status: Status;
}

export interface Competition {
  id: string;
  uid: string;
  date: string;
  attendance: number;
  type: CompetitionType;
  timeValid: boolean;
  neutralSite: boolean;
  conferenceCompetition: boolean;
  playByPlayAvailable: boolean;
  recent: boolean;
  venue: CompetitionVenue;
  competitors: Competitor[];
  notes: Note[];
  status: Status;
  broadcasts: Broadcast[];
  tournamentID: number;
  format: Format;
  tickets: Ticket[];
  startDate: string;
  broadcast: string;
  geoBroadcasts: GeoBroadcast[];
  odds: Odd[];
  highlights: any[];
}

export interface Broadcast {
  market: MarketEnum;
  names: string[];
}

export enum MarketEnum {
  National = 'national',
}

export interface Competitor {
  id: string;
  uid: string;
  type: TypeElement;
  order: number;
  homeAway: HomeAwayElement;
  team: CompetitorTeam;
  score: string;
  curatedRank: CuratedRank;
  statistics: Statistic[];
  records: Record[];
  leaders: CompetitorLeader[];
}

export interface CuratedRank {
  current: number;
}

export enum HomeAwayElement {
  Away = 'away',
  AwaySpread = 'awaySpread',
  Bets = 'bets',
  Bracket = 'bracket',
  Desktop = 'desktop',
  DraftKings = 'draft-kings',
  Event = 'event',
  Game = 'game',
  Home = 'home',
  HomeSpread = 'homeSpread',
  None = 'none',
  Over = 'over',
  Summary = 'summary',
  Under = 'under',
}

export interface CompetitorLeader {
  name: LeaderName;
  displayName: LeaderDisplayName;
  shortDisplayName: LeaderShortDisplayName;
  abbreviation: LeaderAbbreviation;
  leaders: LeaderLeader[];
}

export enum LeaderAbbreviation {
  AST = 'AST',
  Fg = 'FG%',
  Fga = 'FGA',
  Fgm = 'FGM',
  Ft = 'FT%',
  Fta = 'FTA',
  Ftm = 'FTM',
  Pts = 'PTS',
  Reb = 'REB',
  The3P = '3P%',
  The3Pa = '3PA',
  The3Pm = '3PM',
}

export enum LeaderDisplayName {
  AssistsPerGame = 'Assists Per Game',
  PointsPerGame = 'Points Per Game',
  ReboundsPerGame = 'Rebounds Per Game',
}

export interface LeaderLeader {
  displayValue: string;
  value: number;
  athlete: Athlete;
  team: TeamClass;
}

export interface Athlete {
  id: string;
  fullName: string;
  displayName: string;
  shortName: string;
  links: LinkElement[];
  headshot: string;
  jersey: string;
  position: Position;
  team: TeamClass;
  active: boolean;
}

export interface LinkElement {
  rel: LogoRel[];
  href: string;
}

export enum LogoRel {
  Athlete = 'athlete',
  Dark = 'dark',
  Desktop = 'desktop',
  Light = 'light',
  Playercard = 'playercard',
}

export interface Position {
  abbreviation: PositionAbbreviation;
}

export enum PositionAbbreviation {
  C = 'C',
  F = 'F',
  G = 'G',
}

export interface TeamClass {
  id: string;
}

export enum LeaderName {
  AssistsPerGame = 'assistsPerGame',
  PointsPerGame = 'pointsPerGame',
  ReboundsPerGame = 'reboundsPerGame',
}

export enum LeaderShortDisplayName {
  Apg = 'APG',
  Ppg = 'PPG',
  RPG = 'RPG',
}

export interface Record {
  name: RecordName;
  abbreviation: RecordAbbreviation;
  type: RecordType;
  summary: string;
}

export enum RecordAbbreviation {
  Away = 'AWAY',
  Home = 'Home',
  Season = 'Season',
  VsConf = 'VS CONF',
}

export enum RecordName {
  Home = 'Home',
  Overall = 'overall',
  Road = 'Road',
  VsConf = 'vs. Conf.',
}

export enum RecordType {
  Home = 'home',
  Road = 'road',
  Total = 'total',
  Vsconf = 'vsconf',
}

export interface Statistic {
  name: StatisticName;
  abbreviation: LeaderAbbreviation;
  displayValue: string;
  rankDisplayValue: string;
}

export enum StatisticName {
  Assists = 'assists',
  AvgAssists = 'avgAssists',
  AvgPoints = 'avgPoints',
  AvgRebounds = 'avgRebounds',
  FieldGoalPct = 'fieldGoalPct',
  FieldGoalsAttempted = 'fieldGoalsAttempted',
  FieldGoalsMade = 'fieldGoalsMade',
  FreeThrowPct = 'freeThrowPct',
  FreeThrowsAttempted = 'freeThrowsAttempted',
  FreeThrowsMade = 'freeThrowsMade',
  Points = 'points',
  Rebounds = 'rebounds',
  ThreePointFieldGoalPct = 'threePointFieldGoalPct',
  ThreePointFieldGoalsAttempted = 'threePointFieldGoalsAttempted',
  ThreePointFieldGoalsMade = 'threePointFieldGoalsMade',
}

export interface CompetitorTeam {
  id: string;
  uid: string;
  location: string;
  name: string;
  abbreviation: string;
  displayName: string;
  shortDisplayName: string;
  color: string;
  alternateColor: string;
  isActive: boolean;
  venue: TeamClass;
  links: TeamLink[];
  logo: string;
  conferenceID: string;
}

export interface TeamLink {
  rel: TypeElement[];
  href: string;
  text: PurpleText;
  isExternal: boolean;
  isPremium: boolean;
}

export enum TypeElement {
  Clubhouse = 'clubhouse',
  Desktop = 'desktop',
  Roster = 'roster',
  Schedule = 'schedule',
  Stats = 'stats',
  Team = 'team',
}

export enum PurpleText {
  Clubhouse = 'Clubhouse',
  Roster = 'Roster',
  Schedule = 'Schedule',
  Statistics = 'Statistics',
}

export interface Format {
  regulation: Regulation;
}

export interface Regulation {
  periods: number;
}

export interface GeoBroadcast {
  type: GeoBroadcastType;
  market: MarketClass;
  media: Media;
  lang: Lang;
  region: Region;
}

export enum Lang {
  En = 'en',
}

export interface MarketClass {
  id: string;
  type: MarketType;
}

export enum MarketType {
  National = 'National',
}

export interface Media {
  shortName: string;
}

export enum Region {
  Us = 'us',
}

export interface GeoBroadcastType {
  id: string;
  shortName: ShortName;
}

export enum ShortName {
  Tv = 'TV',
}

export interface Note {
  type: HomeAwayElement;
  headline: string;
}

export interface Odd {
  provider: Provider;
  details: string;
  overUnder: number;
  spread: number;
  awayTeamOdds: TeamOdds;
  homeTeamOdds: TeamOdds;
  moneyline: Moneyline;
  pointSpread: PointSpread;
  total: Total;
  link: OddLink;
  header: Header;
  footer: Footer;
}

export interface TeamOdds {
  favorite: boolean;
  underdog: boolean;
  team: AwayTeamOddsTeam;
  favoriteAtOpen: boolean;
}

export interface AwayTeamOddsTeam {
  id: string;
  uid: string;
  abbreviation: string;
  name: string;
  displayName: string;
  logo: string;
}

export interface Footer {
  disclaimer: string;
}

export interface Header {
  logo: HeaderLogo;
  text: HeaderText;
}

export interface HeaderLogo {
  dark: string;
  light: string;
  exclusivesLogoDark: string;
  exclusivesLogoLight: string;
}

export enum HeaderText {
  GameOdds = 'Game Odds',
}

export interface OddLink {
  language: Language;
  rel: HomeAwayElement[];
  href: string;
  text: ShortTextEnum;
  shortText: ShortTextEnum;
  isExternal: boolean;
  isPremium: boolean;
  tracking?: Tracking;
}

export enum Language {
  EnUS = 'en-US',
}

export enum ShortTextEnum {
  AwayBet = 'Away Bet',
  AwayPointSpread = 'Away Point Spread',
  Bracket = 'Bracket',
  Game = 'Game',
  Gamecast = 'Gamecast',
  HomeBet = 'Home Bet',
  HomePointSpread = 'Home Point Spread',
  OverOdds = 'Over Odds',
  SeeMoreOdds = 'See More Odds',
  UnderOdds = 'Under Odds',
}

export interface Tracking {
  campaign: Campaign;
  tags: Tags;
}

export enum Campaign {
  BettingIntegrations = 'betting-integrations',
}

export interface Tags {
  league: LeagueEnum;
  sport: Sport;
  gameID: number;
  betSide: HomeAwayElement;
  betType: BetType;
  betDetails?: string;
}

export enum BetType {
  Straight = 'straight',
}

export enum LeagueEnum {
  MensCollegeBasketball = 'mens-college-basketball',
}

export enum Sport {
  Basketball = 'basketball',
}

export interface Moneyline {
  displayName: MoneylineDisplayName;
  shortDisplayName: MoneylineShortDisplayName;
  home: MoneylineAway;
  away: MoneylineAway;
}

export interface MoneylineAway {
  close: PurpleClose;
  open: PurpleOpen;
}

export interface PurpleClose {
  odds: string;
  link: OddLink;
}

export interface PurpleOpen {
  odds: string;
}

export enum MoneylineDisplayName {
  Moneyline = 'Moneyline',
}

export enum MoneylineShortDisplayName {
  Ml = 'ML',
}

export interface PointSpread {
  displayName: PointSpreadDisplayName;
  shortDisplayName: PointSpreadDisplayName;
  home: OverClass;
  away: OverClass;
}

export interface OverClass {
  close: OverClose;
  open: OverOpen;
}

export interface OverClose {
  line: string;
  odds: string;
  link: OddLink;
}

export interface OverOpen {
  line: string;
  odds: string;
}

export enum PointSpreadDisplayName {
  Spread = 'Spread',
}

export interface Provider {
  id: string;
  name: DisplayNameEnum;
  priority: number;
  logos: LinkElement[];
  displayName?: DisplayNameEnum;
}

export enum DisplayNameEnum {
  DraftKings = 'Draft Kings',
}

export interface Total {
  displayName: TotalDisplayName;
  shortDisplayName: TotalDisplayName;
  over: OverClass;
  under: OverClass;
}

export enum TotalDisplayName {
  Total = 'Total',
}

export interface Status {
  clock: number;
  displayClock: DisplayClock;
  period: number;
  type: StatusType;
}

export enum DisplayClock {
  The000 = '0:00',
}

export interface StatusType {
  id: string;
  name: TypeName;
  state: State;
  completed: boolean;
  description: Description;
  detail: string;
  shortDetail: string;
}

export enum Description {
  Scheduled = 'Scheduled',
}

export enum TypeName {
  StatusScheduled = 'STATUS_SCHEDULED',
}

export enum State {
  Pre = 'pre',
}

export interface Ticket {
  summary: string;
  numberAvailable: number;
  links: TicketLink[];
}

export interface TicketLink {
  href: string;
}

export interface CompetitionType {
  id: string;
  abbreviation: TypeAbbreviation;
}

export enum TypeAbbreviation {
  Trnmnt = 'TRNMNT',
}

export interface CompetitionVenue {
  id: string;
  fullName: string;
  address: Address;
  indoor: boolean;
}

export interface Address {
  city: string;
  state: string;
}

export interface EventSeason {
  year: number;
  type: number;
  slug: SeasonSlug;
}

export enum SeasonSlug {
  PostSeason = 'post-season',
}

export interface EventsDate {
  date: string;
  seasonType: number;
}

export interface League {
  id: string;
  uid: string;
  name: string;
  abbreviation: string;
  midsizeName: string;
  slug: LeagueEnum;
  season: LeagueSeason;
  logos: LeagueLogo[];
  calendarType: string;
  calendarIsWhitelist: boolean;
  calendarStartDate: string;
  calendarEndDate: string;
  calendar: string[];
}

export interface LeagueLogo {
  href: string;
  width: number;
  height: number;
  alt: string;
  rel: string[];
  lastUpdated: string;
}

export interface LeagueSeason {
  year: number;
  startDate: string;
  endDate: string;
  displayName: string;
  type: SeasonType;
}

export interface SeasonType {
  id: string;
  type: number;
  name: string;
  abbreviation: string;
}
