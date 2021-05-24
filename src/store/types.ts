export const SET_USER = "SET_USER";
export const SIGN_OUT = "SIGN_OUT";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const NEED_VERIFICATION = "NEED_VERIFICATION";
export const SET_FORM_SUCCESS = "SET_FORM_SUCCESS";
export const SET_SUCCESS = "SET_SUCCESS";
export const IS_VERIFIED = "IS_VERIFIED";
export const SET_SIGNED_IN = "SET_SIGNED_IN";
export const CLIP_AUDIO = "CLIP_AUDIO";
export const SET_FINAL_GEM = "SET_FINAL_GEM";
export const SET_USER_GEMS = "SET_USER_GEMS";
export const SET_USER_PHOTO = "SET_USER_PHOTO";
export const SET_USER_ORG = "SET_USER_ORG";

export interface User {
  firstName: string;
  email: string;
  id: string;
  createdAt: any;
  gems: Array<any>;
  profilePhoto: string;
  orgName: string;
}

export interface AuthState {
  user: User | null;
  authenticated: boolean;
  loading: boolean;
  error: string;
  needVerification: boolean;
  success: string;
  rssFeedUrl: any;
  gemURL: string;
  userGems: Array<any>;
}

export interface SignUpData {
  firstName: string;
  email: string;
  password: string;
  profilePhoto: string;
  orgName: string;
}

export interface FinalGem {
  gemID: string;
  audioURL: string;
  title: string;
  description: string;
  categories: Array<any>;
  explicit: boolean;
  ownerId: string;
}

export interface SignInData {
  email: string;
  password: string;
}

//Actions
interface GemFormSubmitAction {
  type: typeof SET_FORM_SUCCESS;
  payload: any;
}

interface GetUserGems {
  type: typeof SET_USER_GEMS;
  payload: Array<any>;
}

interface SetUserAction {
  type: typeof SET_USER;
  payload: User;
}

interface SetUserPhoto {
  type: typeof SET_USER_PHOTO;
  payload: string;
}

interface SetUserOrg {
  type: typeof SET_USER_ORG;
  payload: string;
}

interface SubmitFinalGem {
  type: typeof SET_FINAL_GEM;
  payload: FinalGem;
}

interface SetIsVerifiedAction {
  type: typeof IS_VERIFIED;
  // payload: boolean;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

interface SetClipAudioAction {
  type: typeof CLIP_AUDIO;
  payload: string;
}

interface SignOutAction {
  type: typeof SIGN_OUT;
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}

interface NeedVerificationAction {
  type: typeof NEED_VERIFICATION;
}

interface SetSuccessAction {
  type: typeof SET_SUCCESS;
  payload: string;
}

export type AuthAction =
  | SetUserAction
  | SubmitFinalGem
  | SetUserOrg
  | GetUserGems
  | SetUserPhoto
  | SetLoadingAction
  | SignOutAction
  | SetErrorAction
  | SetIsVerifiedAction
  | NeedVerificationAction
  | GemFormSubmitAction
  | SetClipAudioAction
  | SetSuccessAction;
