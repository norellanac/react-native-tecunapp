import { getAllPost, getPost, showPost, likeOrDislikeNews, loadingPost, errorPost, deleteComment, categoryPost, commentPost, idSearchNew } from '../types/postType';
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
        /*console.log("newsAll: ", data.posts);
        console.log("categoriesPost: ", data.categories);
        console.log("Response:", response.ok);*/

        if (response.ok) {
            dispatch({
                type: getAllPost,
                payload: data.posts,
                categories: data.categories,
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

export const getCategory = (idCategory,tokenUsr) => async dispatch => {
    //console.log(`${idCategory}`);
    dispatch({
        type: loadingPost
    });
    try {
        const response = await fetch(`${apiUrl.link}/api/categorypost/${idCategory}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                Authorization: `Bearer ${tokenUsr}`
            }
        });

        const data = await response.json();
        console.log("postCategory: ", data);/*
        console.log("categoriesPost: ", data.categoryPostName);
        console.log("Response:", response.ok);*/

        if(response.ok){
            dispatch({
                type: categoryPost,
                payload: data.posts,
                categories: data.categories,
                categoryPostName: data.categoryPodcastName,
                cargando: false
            });
        }

    } catch (error) {
        console.log("Si llego aqui es porque hay error", error.message);
        dispatch({
            type: errorPost,
            error: error.message,
            cargando: false
        });
    }
}

export const getShowPost = (idPost, tokenUsr) => async dispatch => {
    //console.log("ID del post: ", idPost);
    dispatch({
        type: loadingPost
    });

    try {
        const response = await fetch(`${apiUrl.link}/api/post/${idPost}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                Authorization: `Bearer ${tokenUsr}`
            }
        });

        const data = await response.json();
        console.log("showPost response: ", response);


        if(response.ok){
            console.log("test :" , data);
            dispatch({
                type: showPost,
                payload: data.post,
                comment: data.comments,
                categoryPostName: data.categoryName,
                cargando: false
            });
        }

    } catch (error) {
        console.log("Si llego aqui es porque hay error", error.message);
        dispatch({
            type: errorPost,
            error: error.message,
            cargando: false
        });
    }
}

export const getShowPostCategory = (idPost, tokenUsr) => async dispatch => {
    //console.log("ID del post: ", idPost);
    dispatch({
        type: loadingPost
    });

    try {
        const response = await fetch(`${apiUrl.link}/api/post/${idPost}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                Authorization: `Bearer ${tokenUsr}`
            }
        });

        const data = await response.json();
        console.log("showPost response: ", response);


        if(response.ok){
            console.log("test :" , data);
            dispatch({
                type: showPost,
                payload: data.post,
                comment: data.comments,
                categoryPostName: data.categoryName,
                cargando: false
            });
        }

    } catch (error) {
        console.log("Si llego aqui es porque hay error", error.message);
        dispatch({
            type: errorPost,
            error: error.message,
            cargando: false
        });
    }
}

export const setIdOneRecordAction = recordArray => async dispatch => {
    dispatch({
        type: getPost,
        payload: recordArray
    });

};