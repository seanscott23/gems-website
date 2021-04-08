export const SET_USER = "SET_USER";
export const SIGN_OUT = "SIGN_OUT";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const NEED_VERIFICATION = "NEED_VERIFICATION";
export const SET_FORM_SUCCESS = "SET_FORM_SUCCESS";
export const SET_SUCCESS = "SET_SUCCESS";
export const IS_VERIFIED = "IS_VERIFIED";
export const SET_SIGNED_IN = "SET_SIGNED_IN";

export interface User {
  firstName: string;
  email: string;
  id: string;
  createdAt: any;
}

export interface AuthState {
  user: User | null;
  authenticated: boolean;
  loading: boolean;
  error: string;
  needVerification: boolean;
  success: string;
  formSuccess: GemFormData | null;
}
// export interface Parser {

// }
// export interface CustomFeed { foo: string };
// export interface CustomItem { bar: number };

export interface SignUpData {
  firstName: string;
  email: string;
  password: string;
}

export interface GemFormData {
  rssFeed: string;
}
export interface SignInData {
  email: string;
  password: string;
}

//Actions
interface GemFormSubmitAction {
  type: typeof SET_FORM_SUCCESS;
  payload: GemFormData;
}

interface SetUserAction {
  type: typeof SET_USER;
  payload: User;
}

interface SetIsVerifiedAction {
  type: typeof IS_VERIFIED;
  payload: boolean;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
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
  | SetLoadingAction
  | SignOutAction
  | SetErrorAction
  | SetIsVerifiedAction
  | NeedVerificationAction
  | GemFormSubmitAction
  | SetSuccessAction;
