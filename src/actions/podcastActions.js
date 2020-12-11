import { getAllPodcast, getPodcast, getDocument, getImage, loadingPodcast, errorPodcast, categoryPodcast, commentPodcast, likeOrDislikePodcast, deleteComment, idSearchPodcast} from '../types/podcastType';
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

export const setIdPodcastSearch = podcast => async dispatch => {
    dispatch({
        type: idSearchPodcast,
        payload: podcast
    });
}