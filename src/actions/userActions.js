import { getUser, loadingUser, errorUser } from "../types/userTypes";
import { apiUrl } from './../../App';

export const traerUser = tokenUsr => async dispatch => {
  dispatch({
    type: loadingUser
  });
  try {
    const response = await fetch(`${apiUrl.link}/api/users`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        Authorization: `Bearer ${tokenUsr}`
      }
    });
    const data = await response.json();
    console.log("data: ", data);
    console.log('response: ', response.ok);
    
    
    if (response.ok) {
      dispatch({
        type: getUser,
        payload: data.data,
        cargando: false,
        token: tokenUsr,
      });  
    }
  } catch (error) {
    console.log("error: ", error);
    dispatch({
      type: errorUser,
      error: error.message,
      cargando: false
    });
  }
};

export const registerUsers = ( dpi, name, lastname, email, phone, password ) => async dispatch => {
  dispatch({
    type: loadingUser
  });
  try {
    let dataForm = "_method=" + encodeURIComponent("POST");
    dataForm += "&dpi=" + encodeURIComponent(dpi);
    dataForm += "&name=" + encodeURIComponent(name);
    dataForm += "&lastname=" + encodeURIComponent(lastname);
    dataForm += "&email=" + encodeURIComponent(email);
    dataForm += "&phone=" + encodeURIComponent(phone);
    dataForm += "&password=" + encodeURIComponent(password);
    dataForm += "&role_id=" + encodeURIComponent("4");
    dataForm += "&status_id=" + encodeURIComponent("1");

    const response = await fetch(`${apiUrl.link}/api/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
      },
      body: dataForm
    });
    const data = await response.json();    
    if (!response.ok) {
      dispatch({ 
        type: errorLogin,
        error: data.error,
        cargando: false
      });
    } else {
      dispatch({
        type: registerUser,
        userRegister: data,
        cargando: false
      });
    }
  } catch (error) {
    dispatch({
      type: errorLogin,
      error: error.message,
      cargando: false
    });
    console.log(error.message);
  }
};

