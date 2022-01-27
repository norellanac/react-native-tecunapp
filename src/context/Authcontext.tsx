import React, {createContext, useReducer} from 'react';
import loginApi from '../api/apiEndpoints';
import {LoginData} from '../interfaces/appinterfaces';
import {authReducer, AuthState} from './authReducer';
type AuthContextProps = {
  message: string;
  token: string;
  isLoading: boolean;
  isAuth: boolean;
  user: Object | null;
  signUp: () => void;
  signIn: (loginData: LoginData) => void;
  logout: () => void;
  remove: () => void;
};

const authInitialState: AuthState = {
  isAuth: false,
  token: null,
  user: null,
  message: null,
  isLoading: false,
};
export const Authcontext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);
  const signUp: () => {};
  const signIn = async ({userEmail, password}: LoginData) => {
    //const [email, password] = LoginData;
    try {
      //...
      const resp = await loginApi.post(
        'https://scoring-demo.credolab.com/v6.0/account/login',
        {userEmail, password},
      );
      dispatch({
        type: 'signUp',
        payload: {
          token: `bearer ${resp.data?.access_token}`,
          user: {userEmail, ...resp},
          message: 'hello',
        },
      });
      console.log('resp: ', resp.data);
    } catch (error) {
      //...
      console.log('error: ', error);
    }
  };
  const logout: () => {};
  const remove: () => {};

  return (
    <Authcontext.Provider
      value={{
        ...state,
        signUp,
        signIn,
        logout,
        remove,
      }}>
      {children}
    </Authcontext.Provider>
  );
};
