export interface AuthState {
  message: string | null;
  token: string | null;
  isLoading: boolean ;
  isAuth: boolean ;
  user: object | null;
}

type AuthAction =
  | {
      type: 'signUp';
      payload: {token: string; user: null | Object; message: ''};
    }
  | {
      type: 'addMessage';
      payload: string;
    }
  | {
      type: 'removeMessage';
      payload: string;
    }
  | {
      type: 'logout';
      payload: string;
    };

export const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case 'addMessage':
      return {
        ...state,
        user: null,
        message: action.payload,
        token: null,
        isAuth: false,
        isLoading: false,
      };

    case 'removeMessage':
      return {
        ...state,
        message: '',
      };

    case 'signUp':
      return {
        ...state,
        user: action.payload.user,
        message: action.payload.message,
        token: action.payload.token,
        isAuth: true,
        isLoading: false,
      };

    case 'logout':
      return {
        ...state,
        user: null,
        message: '',
        token: null,
        isAuth: false,
        isLoading: false,
      };
    default:
      state;
  }
};
