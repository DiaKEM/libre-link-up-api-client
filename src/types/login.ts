export type LoginArgs = {
  username: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  data: Data;
}

export interface Data {
  user: User;
  messages: DataMessages;
  notifications: Notifications;
  authTicket: AuthTicket;
  invitations: string[];
}

export interface AuthTicket {
  token: string;
  expires: number;
  duration: number;
}

export interface DataMessages {
  unread: number;
}

export interface Notifications {
  unresolved: number;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  uiLanguage: string;
  communicationLanguage: string;
  accountType: string;
  uom: string;
  dateFormat: string;
  timeFormat: string;
  emailDay: number[];
  system: System;
  details: Details;
  created: number;
  lastLogin: number;
  programs: Details;
  dateOfBirth: number;
  practices: Details;
  devices: Details;
  consents: Consents;
}

export interface Consents {
  llu: Llu;
}

export interface Llu {
  policyAccept: number;
  touAccept: number;
}

export interface Details {
}

export interface System {
  messages: SystemMessages;
}

export interface SystemMessages {
  firstUsePhoenix: number;
  firstUsePhoenixReportsDataMerged: number;
  lluGettingStartedBanner: number;
  lluNewFeatureModal: number;
  lluOnboarding: number;
  lvWebPostRelease: string;
}

