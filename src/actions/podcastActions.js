import {
	getAllPodcast,
	getPodcast,
	showPodcastCategory,
	loadingPodcastLike,
	showPodcast,
	likeOrDislikePodcast,
	loadingPodcast,
	errorPodcast,
	deleteComment,
	categoryPodcast,
	commentPodcast,
	idSearchNew
} from '../types/podcastType';
import { apiUrl } from '../../App';


export const getPodcasts = tokenUsr => async dispatch => {
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

        console.log('Que trae data? ',data);

        if(response.ok){
            dispatch({
                type: categoryPodcast,
                payload: data.podcasts,
                categories: data.categories,
                categoryPodcastName: data.categoryPodcastName,
                idCategory: data.idCategory,
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

        console.log("ActionPodcast :" , data);

        if(response.ok){
            //console.log("test :" , data);
            dispatch({
                type: showPodcast,
                payload: data.podcast,
                categoryName: data.categoryName,
                likePodcast: data.likes,
                cargando: false
            });
        }

    } catch (error) {
        //console.log("Si llego aqui es porque hay error en Show", error.message);
        dispatch({
            type: errorPodcast,
            error: error.message,
            cargando: false
        });
    }
}

export const updatePodcastAfterComment = (podcast_id, tokenUsr) => async (dispatch) => {
	dispatch({
		type: loadingPodcast
	});

	const response = await fetch(`${apiUrl.link}/api/post/${podcast_id}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
			Authorization: `Bearer ${tokenUsr}`
		}
	});

	const data = await response.json();

	dispatch({
		type: showPodcast,
		payload: data.podcast,
		categoryName: data.categoryName,
		cargando: false
	});
};

export const uploadMessage = (comment, token) => async dispatch => {

    console.log("Comment ",comment);
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

        console.log("data ",data);

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

export const likeOrDislike = (podcastID, token) => async (dispatch) => {
	//console.log("Este es podcastID: ",podcastID);
	dispatch({
		type: loadingPodcast
	});
	try {

		let dataForm = '_method=' + encodeURIComponent('POST');
		dataForm += '&podcastID=' + encodeURIComponent(podcastID);
		const response = await fetch(`${apiUrl.link}/api/likeordislikepodcast`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
				Authorization: `Bearer ${token}`,
				Params: `json ${dataForm}`
			},
			body: dataForm
		});

		const data = await response.json();

		console.log('LLego aqui?:', data);

		if (!response.ok) {
			dispatch({
				type: errorPost,
				error: 'Error Al publicar el like, ' + response.status,
				cargando: false
			});
		} else {
			dispatch({
				type: likeOrDislikeNews,
				payload: data.message,
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
};

export const setIdPodcastSearch = podcast => async dispatch => {
    dispatch({
        type: idSearchPodcast,
        payload: podcast
    });
}