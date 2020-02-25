import { loginTypes, cargandoLogin, errorLogin, getUser, userLogout, registerUser, updatePass, updatePhon } from "../types/loginTypes";

export const traerToken = (email, password) => async dispatch => {
  dispatch({
    type: cargandoLogin
  });
  try {
    let dataForm = "_method=" + encodeURIComponent("POST");
    dataForm += "&grant_type=" + encodeURIComponent("password");
    dataForm += "&client_id=" + encodeURIComponent("7");
    dataForm += "&client_secret=" + encodeURIComponent("dni5WEaKOhF26EoYyp5zQRM9YIqaxtq7WnvIorGD");
    dataForm += "&username=" + encodeURIComponent(email);
    dataForm += "&password=" + encodeURIComponent(password);

    const response = await fetch("http://canjeaton.com/oauth/token", {
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
        error: "Usuario no autorizado, " + response.status,
        cargando: false
      });
    } else {
      dispatch({
        type: loginTypes,
        tokenUser: data.access_token,
        cargando: false
      });
    }
  } catch (error) {
    console.log("error:");
    dispatch({
      type: errorLogin,
      error: error.message,
      cargando: false
    });
  }
};

export const traerUser = tokenUsr => async dispatch => {
  dispatch({
    type: cargandoLogin
  });
  try {
    const response = await fetch("http://canjeaton.com/api/userInfo", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        Authorization: `Bearer ${tokenUsr}`
      }
    });
    const data = await response.json();
    if (!response.ok) {
      dispatch({
        type: errorLogin,
        error: "Algo salió mal, " + response.status,
        cargando: false
      });
    } else {
      dispatch({
        type: getUser,
        payload: data.user,
        wallet: data.wallet,
        cargando: false
      });      
    }
  } catch (error) {
    console.log("error:");
    dispatch({
      type: errorLogin,
      error: error.message,
      cargando: false
    });
  }
};

export const registerUsers = ( dpi, name, lastname, email, phone, password ) => async dispatch => {
  dispatch({
    type: cargandoLogin
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

    const response = await fetch("http://canjeaton.com/api/newUserStorage", {
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
        error: data.message,
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

export const updateUsersPhon = ( phone, token) => async dispatch => {
  dispatch({
    type: cargandoLogin
  });
  try {
    let dataForm = "_method=" + encodeURIComponent("POST");
    dataForm += "&phone=" + encodeURIComponent(phone);
    
    const response = await fetch("http://canjeaton.com/api/updatePhon", {
      method: "POST",
      headers: {
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
				Authorization: `Bearer ${token}`,
			},
      body: dataForm
    });    
    const data = await response.json();    
    if (!response.ok) {
      dispatch({
        type: errorLogin,
        error: "Usuario no autorizado, " + response.status,
        cargando: false
      });
    } else {
      dispatch({
        type: updatePhon,
        payload: data,
        cargando: false
      });
      console.log("Data 2", data);
    }
  } catch (error) {
    dispatch({
      type: errorLogin,
      error: error.message,
      cargando: false
    });
  }
};

export const updateUsersPass = ( password, password2, token) => async dispatch => {
  dispatch({
    type: cargandoLogin
  });
  try {
    let dataForm = "_method=" + encodeURIComponent("POST");
    dataForm += "&password=" + encodeURIComponent(password);
    dataForm += "&password2=" + encodeURIComponent(password2);
    
    const response = await fetch("http://canjeaton.com/api/updatePass", {
      method: "POST",
      headers: {
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
				Authorization: `Bearer ${token}`,
			},
      body: dataForm
    });    
    const data = await response.json();    
    if (!response.ok) {
      dispatch({
        type: errorLogin,
        error: "Usuario no autorizado, " + response.status,
        cargando: false
      });
    } else {
      dispatch({
        type: updatePass,
        payload: data,
        cargando: false
      });
      console.log("Data", data);
    }
  } catch (error) {
    dispatch({
      type: errorLogin,
      error: error.message,
      cargando: false
    });
  }
};

export const logoutUser = () => dispatch => {
  /*dispara el evento y contacta al reducer  */
  dispatch({
    type: userLogout,
  });
};
