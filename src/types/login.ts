/* eslint-disable no-use-before-define */

export type LoginArgs = {
  username: string;
  password: string;
};

export interface LoginRedirectResponse {
  status: number;
  data: LoginRedirectData;
}

interface LoginRedirectData {
  redirect: boolean;
  region: string;
}

export interface LoginResponse {
  status: number;
  data: Data;
}

interface Data {
  user: User;
  messages: DataMessages;
  notifications: Notifications;
  authTicket: AuthTicket;
  invitations: string[];
}

interface AuthTicket {
  token: string;
  expires: number;
  duration: number;
}

interface DataMessages {
  unread: number;
}

interface Notifications {
  unresolved: number;
}

interface User {
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

interface Consents {
  llu: Llu;
}

interface Llu {
  policyAccept: number;
  touAccept: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Details {}

interface System {
  messages: SystemMessages;
}

interface SystemMessages {
  firstUsePhoenix: number;
  firstUsePhoenixReportsDataMerged: number;
  lluGettingStartedBanner: number;
  lluNewFeatureModal: number;
  lluOnboarding: number;
  lvWebPostRelease: string;
}
