import {
  AuthAction,
  AuthState,
  SET_USER,
  SET_ERROR,
  SET_LOADING,
  SET_SUCCESS,
  NEED_VERIFICATION,
  SIGN_OUT,
  IS_VERIFIED,
  SET_FORM_SUCCESS,
  CLIP_AUDIO,
  SET_FINAL_GEM,
} from "../types";

const initialState: AuthState = {
  user: null,
  authenticated: false,
  loading: false,
  error: "",
  needVerification: false,
  success: "",
  rssFeedUrl: {},
  gemURL: "",
  FinalGem: {}
};

const authReducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        authenticated: true,
      };
    case SET_FORM_SUCCESS:
      return {
        ...state,
        rssFeedUrl: action.payload,
      };
    case CLIP_AUDIO:
      return {
        ...state,
        gemURL: action.payload,
      };
    case SET_FINAL_GEM:
      return {
        ...state,
        FinalGem: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SIGN_OUT:
      return {
        ...state,
        user: null,
        authenticated: false,
        loading: false,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case NEED_VERIFICATION:
      return {
        ...state,
        needVerification: true,
      };
    case IS_VERIFIED:
      return {
        ...state,
        needVerification: false,
      };
    case SET_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
