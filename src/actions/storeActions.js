import { getAllStore, getStore, loadingStore, errorStore } from '../types/storeType';
import { apiUrl } from './../../App';


export const getStores = tokenUsr => async dispatch => {
    dispatch({
        type: loadingStore
    });

    try {
        const response = await fetch(`${apiUrl.link}/api/stores`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                Authorization: `Bearer ${tokenUsr}`
            }
        });

        const data = await response.json();
        console.log("Traer todas las agencias: ", data);
        console.log("response: ", response.ok);

        if(response.ok) {
            dispatch({
                type: getAllStore,
                payload: data.store,
                cargando: false
            });
        }

    } catch (error) {
        dispatch({
            type: errorStore,
            error: error.message,
            cargando: false
        });
    }
};

export const getSearchStore = search => async dispatch => {
    dispatch({
        type: loadingStore
    });

    try {
        const response = await fetch(`${apiUrl.link}/api/stores`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                Authorization: `Bearer ${search}`
            }
        });

        const data = await response.json();
        console.log("Traer todas las agencias: ", data);
        console.log("response: ", response.ok);

        if(response.ok) {
            dispatch({
                type: getStore,
                payload: data.stores,
                cargando: false
            });
        }

    } catch (error) {
        dispatch({
            type: errorStore,
            error: error.message,
            cargando: false
        });
    }
};
