import { loadingContacts, getAllContacts, errorContacts, clearContacts } from "../types/contactsTypes";
import { apiUrl } from './../../App';

export const searchContactsAction = (searchNombre, searchDepartamento, searchPais, searchPuesto, token) => async dispatch => {
    dispatch({
        type: loadingContacts
    });
    try {
        let dataForm = "_method=" + encodeURIComponent("POST");
        dataForm += "&searchNombre=" + encodeURIComponent(searchNombre);
        dataForm += "&searchDepartamento=" + encodeURIComponent(searchDepartamento);
        dataForm += "&searchPais=" + encodeURIComponent(searchPais);
        dataForm += "&searchPuesto=" + encodeURIComponent(searchPuesto);
        console.log("form contacts:", dataForm);
        const response = await fetch(`http://192.168.1.49:3000/api/contacts`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                Authorization: `Bearer ${token}`,
            },
            body: dataForm
        });
        const data = await response.json();
        console.log("Buscar contactos", data);
        if (!response.ok) {
            dispatch({
                type: errorContacts,
                error: "Error al buscar contactos, " + response.status,
                cargando: false
            });
        } else {
            dispatch({
                type: getAllContacts,
                payload: data.data,
                cargando: false
            });
        }
    } catch (error) {
        dispatch({
            type: errorContacts,
            error: error.message,
            cargando: false
        });
    }
};


export const clearContactsAction = () => async dispatch => {
    dispatch({
        type: clearContacts
    });
}
