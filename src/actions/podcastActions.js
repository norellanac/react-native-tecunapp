import { getAllPodcast, getPodcast, showPodcast, getDocument, getImage, loadingPodcast, errorPodcast, categoryPodcast, commentPodcast, likeOrDislikePodcast, deleteComment, idSearchPodcast} from '../types/podcastType';
import { apiUrl } from '../../App';


export const allPodcast = tokenUsr => async dispatch => {
    dispatch({
        type: loadingPodcast
    });

    try {
        const response = await fetch(`${apiUrl.link}/api/podcasts`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                Authorization: `Bearer ${tokenUsr}`
            }
        });

        const data = await response.json();
        /*console.log("podcastAll: ", data.podcasts);
        console.log("categoriesPodcast: ", data.categories);
        console.log("Response:", response.ok);*/

        if (response.ok) {
            dispatch({
                type: getAllPodcast,
                payload: data.podcasts,
                categories: data.categories,
                cargando: false
            });
        }

    } catch (error) {
        dispatch({
            type: errorPodcast,
            error: error.message,
            cargando: false
        });
    }
}

export const getCategory = (idCategory,tokenUsr) => async dispatch => {
    dispatch({
        type: loadingPodcast
    });

    try {
        const response = await fetch(`${apiUrl.link}/api/categoryPodcast/${idCategory}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                Authorization: `Bearer ${tokenUsr}`
            }
        });

        const data = await response.json();

        console.log("Como viene los likes? ",data.podcast.like);

        if(response.ok){
            dispatch({
                type: categoryPodcast,
                payload: data.podcast,
                categories: data.categories,
                categoryPodcastName: data.categoryPodcastName,
                comment: data.comments,
                cargando: false
            });
        }

    } catch (error) {
        //console.log("Si llego aqui es porque hay error en la category", error.message);
        dispatch({
            type: errorPodcast,
            error: error.message,
            cargando: false
        });
    }
}

export const getShowPodcast = (idPodcast, tokenUsr) => async dispatch => {
    dispatch({
        type: loadingPodcast
    });

    try {
        const response = await fetch(`${apiUrl.link}/api/podcast/${idPodcast}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                Authorization: `Bearer ${tokenUsr}`
            }
        });

        const data = await response.json();

        if(response.ok){
            //console.log("test :" , data);
            dispatch({
                type: showPodcast,
                payload: data.podcast,
                categoryName: data.categoryName,
                cargando: false
            });
        }

    } catch (error) {
        console.log("Si llego aqui es porque hay error en Show", error.message);
        dispatch({
            type: errorPodcast,
            error: error.message,
            cargando: false
        });
    }
}

export const uploadMessage = (comment, token) => async dispatch => {
    dispatch({
        type: loadingPodcast
    });

    try {
        let json = JSON.stringify(comment);
        let params = 'json='+json;

        let dataForm = "_method=" + encodeURIComponent("POST");
        dataForm += "&json=" + encodeURIComponent(comment);

        const response = await fetch(`${apiUrl.link}/api/commentpodcast`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                Authorization: `Bearer ${token}`,
                Params: `json ${dataForm}`,
            },
            body: params
        });

        const data = await response.json();

        if (!response.ok) {
            dispatch({
              type: errorPodcast,
              error: "Error Al publicar el comentario, " + response.status,
              cargando: false
            });
          } else {
            dispatch({
              type: commentPodcast,
              payload: data.comment,
              cargando: false
            });
          }
    } catch (error) {
        dispatch({
            type: errorPodcast,
            error: error.message,
            cargando: false
        });
        }
}

export const deleteMessage = (id, token) => async dispatch => {
    dispatch({
        type: loadingPodcast
    });

    try {
        let json = JSON.stringify(id);
        let params = 'json='+json;

        let dataForm = "_method=" + encodeURIComponent("POST");
        dataForm += "&json=" + encodeURIComponent(id);

        const response = await fetch(`${apiUrl.link}/api/commentpodcast/${id.id}`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                Authorization: `Bearer ${token}`,
                Params: `json ${dataForm}`,
            },
            body: params
        });

        const data = await response.json(); 

        if(response.ok){
            dispatch({
                type: deleteComment,
                cargando: false
            });
        }
    } catch (error) {
        dispatch({
            type: errorPodcast,
            error: error.message,
            cargando: false
        });
    }
}

export const likeOrDislike = (likeObject, token) => async dispatch => {
    console.log("Que trae el objecto?: ",likeObject);
    dispatch({
        type: loadingPodcast
    });

    try {
        let json = JSON.stringify(likeObject);
        let params = 'json='+json;

        let dataForm = "_method=" + encodeURIComponent("POST");
        dataForm += "&json=" + encodeURIComponent(params);

        const response = await fetch(`${apiUrl.link}/api/likeordislikepodcast`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                Authorization: `Bearer ${token}`,
                Params: `json ${dataForm}`,
            },
            body: params
        }); 

        const data = await response.json();

        console.log("Mensaje: ",data.message);
        console.log("Que trae data.object? ",data.object);

        if (!response.ok) {
            dispatch({
              type: errorPodcast,
              error: "Error Al publicar el like, " + response.status,
              cargando: false
            });
          } else {
            dispatch({
              type: likeOrDislikePodcast,
              payload: data.message,
              object: data.object,
              cargando: false
            });
            //console.log("Que trae Data", data);
          }
        } catch (error) {
            dispatch({
              type: errorPodcast,
              error: error.message,
              cargando: false
            });
        }
}

export const setIdPodcastSearch = podcast => async dispatch => {
    dispatch({
        type: idSearchPodcast,
        payload: podcast
    });
}