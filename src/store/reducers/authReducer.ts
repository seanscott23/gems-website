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
  SET_USER_GEMS,
  SET_USER_PHOTO,
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
  userGems: [],
  profilePhoto: "",
};

const authReducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        authenticated: true,
      };

    // case SET_NEW_GEM:
    //   const newGems = Object.assign({}, state.userGems);
    //   newGems[Object.keys(userGems)[Object.keys(userGems).length]] =
    //     action.payload;
    //   return {
    //     ...state,
    //     ...newGems
    //   };
    case SET_USER_GEMS:
      // const newGems = state.userGems;
      // newGems.push(action.payload);
      return {
        ...state,
        userGems: action.payload,
      };
    case SET_USER_PHOTO:
      return {
        ...state,
        profilePhoto: action.payload,
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
        authenticated: false,
      };
    case IS_VERIFIED:
      return {
        ...state,
        authenticated: true,
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
