import { loadingLogin, logIn, errorLogin, logOut, ldapType } from '../types/loginTypes';
import { apiUrl } from './../../App';

export const ldapLoginRegister = (email, password) => async (dispatch) => {
	console.log('ldap send: ', email, password);
	dispatch({
		type: loadingLogin
	});
	try {
		let dataForm = '_method=' + encodeURIComponent('POST');
		dataForm += '&email=' + encodeURIComponent(email);
		dataForm += '&password=' + encodeURIComponent(password);
console.log('=======DATAFORM=============================');
console.log(dataForm);
console.log('====================================');
		const response = await fetch(`${apiUrl.link}/api/ldap`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
			},
			body: dataForm
		});
		const data = await response.json();
		console.log('ldap data: ', data);

		if (data.data && response.ok) {
      console.log('====================================');
      console.log("todo deberia venir bien");
      console.log('====================================');
			dispatch({
				type: ldapType,
				payload: data.data,
				cargando: false
			});
		} else {
      console.log('====================================');
      console.log("algo raro");
      console.log('====================================');
			dispatch({
				type: errorLogin,
				error: data.message + response.status,
				cargando: false
			});
		}
	} catch (error) {
		console.log('error action ldap: ', error);
		dispatch({
			type: errorLogin,
			error: error.message,
			cargando: false
		});
	}
};

export const traerToken = (email, password) => async (dispatch) => {
	console.log('Que trae email  y password?: ', email, password);
	dispatch({
		type: loadingLogin
	});
	try {
		let dataForm = '_method=' + encodeURIComponent('POST');
		dataForm += '&grant_type=' + encodeURIComponent('password');
		dataForm += '&client_id=' + encodeURIComponent('2');
		dataForm += '&client_secret=' + encodeURIComponent('fkygOeugMPcJTeOimNRwZdcfRTiJUSwf8nxmF0mQ');
		dataForm += '&username=' + encodeURIComponent(email);
		dataForm += '&password=' + encodeURIComponent("@ppT3cun$3cre7");

		const response = await fetch(`${apiUrl.link}/oauth/token`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
			},
			body: dataForm
		});
		const data = await response.json();
		console.log('url: ', `${apiUrl.link}/api/oauth/token`);
		console.log('data token: ', data);

		if (!response.ok) {
			dispatch({
				type: errorLogin,
				error: 'Usuario no autorizado, ' + response.status,
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
		console.log('error: ', error);
		dispatch({
			type: errorLogin,
			error: error.message,
			cargando: false
		});
	}
};
