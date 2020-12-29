import { loadingLogin, logIn, errorLogin, logOut } from "../types/loginTypes";
import { apiUrl } from './../../App';

export const traerToken = (email, password) => async dispatch => {
  console.log("Que trae email  y password?: ", email, password);
  dispatch({
    type: loadingLogin
  });
  try {
    let dataForm = "_method=" + encodeURIComponent("POST");
    dataForm += "&grant_type=" + encodeURIComponent("password");
    dataForm += "&client_id=" + encodeURIComponent("2");
    dataForm += "&client_secret=" + encodeURIComponent("601wJRCBOLINrcP4RoCY7IzeQc6MmaTGif2l2Utm");
    dataForm += "&username=" + encodeURIComponent(email);
    dataForm += "&password=" + encodeURIComponent(password);

    const response = await fetch(`${apiUrl.link}/oauth/token`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
      },
      body: dataForm
    });
    const data = await response.json();
    console.log("url: ", `${apiUrl.link}/api/oauth/token`);
    console.log('data token: ', data);
    
    
    if (!response.ok) {
      dispatch({
        type: errorLogin,
        error: "Usuario no autorizado, " + response.status,
        cargando: false
      });
    } else {
      dispatch({
        type: logIn,
        tokenUser: data.access_token,
        cargando: false
      });
    }
  } catch (error) {
    console.log("error: ", error);
    dispatch({
      type: errorLogin,
      error: error.message,
      cargando: false
    });
  }
};

