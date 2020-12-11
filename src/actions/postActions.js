import { getAllPost, getPost, getImage, getDocument, likeOrDislikeNews, loadingPost, errorPost, deleteComment, categoryPost, commentPost, idSearchNew } from '../types/postType';
import { apiUrl } from '../../App';


export const getNews = tokenUsr => async dispatch => {
    dispatch({
        type: loadingPost
    });

    try {
        const response = await fetch(`${apiUrl.link}/api/news`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                Authorization: `Bearer ${tokenUsr}`
            }
        });

        const data = await response.json();
        console.log("newsAll: ", data.posts);
        console.log("Response:", response.ok);

        if (response.ok) {
            dispatch({
                type: getAllPost,
                payload: data.posts,
                cargando: false
            });
        }

    } catch (error) {
        dispatch({
            type: errorPost,
            error: error.message,
            cargando: false
        });
    }
}

export const setIdNewSearch = post => async dispatch => {
    dispatch({
        type: idSearchNew,
        payload: post
    });
}