import {
	getAllPost,
	getPost,
	showPostCategory,
	loadingPostLike,
	showPost,
	likeOrDislikeNews,
	loadingPost,
	errorPost,
	deleteComment,
	categoryPost,
	commentPost,
	idSearchNew
} from '../types/postType';
import { apiUrl } from '../../App';

export const getNews = (tokenUsr) => async (dispatch) => {
	dispatch({
		type: loadingPost
	});

	try {
		const response = await fetch(`${apiUrl.link}/api/news`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
				Authorization: `Bearer ${tokenUsr}`
			}
		});

		const data = await response.json();
		console.log('post data?: ', data);
		//console.log('Response post:', response);

		if (response.ok) {
			dispatch({
				type: getAllPost,
				payload: data.posts,
				categories: data.categories,
				cargando: false
			});
		} else {
			dispatch({
				type: errorPost,
				error: 'algo salio mal',
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
};

export const getCategory = (idCategory, tokenUsr) => async (dispatch) => {
	//console.log(`${idCategory}`);
	dispatch({
		type: loadingPost
	});
	try {
		const response = await fetch(`${apiUrl.link}/api/categorypost/${idCategory}`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
				Authorization: `Bearer ${tokenUsr}`
			}
		});

		const data = await response.json();

		if (response.ok) {
			dispatch({
				type: categoryPost,
				payload: data.posts,
				categories: data.categories,
				categoryPostName: data.categoryPodcastName,
				idCategory: data.idCategory,
				cargando: false
			});
		}
	} catch (error) {
		//console.log("Si llego aqui es porque hay error en la category", error.message);
		dispatch({
			type: errorPost,
			error: error.message,
			cargando: false
		});
	}
};

export const passOneRecord = (record) => async (dispatch) => {
	dispatch({
		type: getPost,
		payload: record
	});
};

export const getShowPost = (idPost, tokenUsr) => async (dispatch) => {
	//console.log("ID del post: ", idPost);
	dispatch({
		type: loadingPost
	});

	try {
		const response = await fetch(`${apiUrl.link}/api/post/${idPost}`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
				Authorization: `Bearer ${tokenUsr}`
			}
		});

		const data = await response.json();
		//const type = showPost;
		const post = Object.assign({}, data.post);
		//console.log("showData: ", data);
		//console.log("showPost response: ", response);

		//console.log("Que trae DATA.POST: ", data.post);
		//console.log("Que trae POST: ", post);

		//console.log("Que trae el response: ",response);

		if (response.ok) {
			//console.log("test :" , data);
			dispatch({
				type: showPost,
				payload: data.post,
				categoryName: data.categoryName,
				cargando: false
			});
		}
	} catch (error) {
		//console.log('Si llego aqui es porque hay error en Show', error.message);
		dispatch({
			type: errorPost,
			error: error.message,
			cargando: false
		});
	}
};

export const getShowPostCategory = (idPost, tokenUsr) => async (dispatch) => {
	//console.log("ID del post: ", idPost);
	dispatch({
		type: loadingPost
	});

	try {
		const response = await fetch(`${apiUrl.link}/api/post/${idPost}`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
				Authorization: `Bearer ${tokenUsr}`
			}
		});

		const data = await response.json();
		//console.log("showPost response: ", response);

		if (response.ok) {
			//console.log("test :" , data);
			dispatch({
				type: showPostCategory,
				payload: '',
				payload: data.post,
				comment: '',
				comment: data.comments,
				categoryPostName: '',
				categoryPostName: data.categoryName,
				cargando: false
			});
		}
	} catch (error) {
		//console.log("Si llego aqui es porque hay error", error.message);
		dispatch({
			type: errorPost,
			error: error.message,
			cargando: false
		});
	}
};

export const setIdOneRecordAction = (recordArray, postComment) => async (dispatch) => {
	dispatch({
		type: getPost,
		payload: recordArray,
		comment: postComment
	});
};

export const updatePostAfterComment = (post_id, tokenUsr) => async (dispatch) => {
	dispatch({
		type: loadingPost
	});

	const response = await fetch(`${apiUrl.link}/api/post/${post_id}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
			Authorization: `Bearer ${tokenUsr}`
		}
	});

	const data = await response.json();

	dispatch({
		type: showPost,
		payload: data.post,
		categoryName: data.categoryName,
		cargando: false
	});
};

export const uploadMessage = (comment, token) => async (dispatch) => {
	//console.log("Este es token: ",token);
	//console.log("En teoria este es el array de comment: ",comment);
	dispatch({
		type: loadingPost
	});
	try {
		/*console.log("Que trae el post_id: ",post_id);
        console.log("Que trae el message: ",message);
        console.log("Que trae el token: ",token);*/
		let json = JSON.stringify(comment);
		let params = 'json=' + json;

		let dataForm = '_method=' + encodeURIComponent('POST');
		dataForm += '&json=' + encodeURIComponent(comment);
		//console.log("Que trae data form: ",dataForm);
		const response = await fetch(`${apiUrl.link}/api/commentpost`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
				Authorization: `Bearer ${token}`,
				Params: `json ${dataForm}`
			},
			body: params
		});
		const data = await response.json();

		//console.log("Que trae Data: ",data);
		//console.log("Que trae REsponse: ",response);

		if (!response.ok) {
			dispatch({
				type: errorPost,
				error: 'Error Al publicar el comentario, ' + response.status,
				cargando: false
			});
		} else {
			dispatch({
				type: commentPost,
				payload: data.comment,
				cargando: false
			});
			//console.log("Que trae Data", data);
		}
	} catch (error) {
		dispatch({
			type: errorPost,
			error: error.message,
			cargando: false
		});
	}
};

export const deleteMessage = (id, token) => async (dispatch) => {
	dispatch({
		type: loadingPost
	});

	try {
		let json = JSON.stringify(id);
		let params = 'json=' + json;

		let dataForm = '_method=' + encodeURIComponent('POST');
		dataForm += '&json=' + encodeURIComponent(id);

		const response = await fetch(`${apiUrl.link}/api/commentpost/${id.id}`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
				Authorization: `Bearer ${token}`,
				Params: `json ${dataForm}`
			},
			body: params
		});

		const data = await response.json();

		if (response.ok) {
			dispatch({
				type: deleteComment,
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
};

export const likeOrDislike = (postID, token) => async (dispatch) => {
	//console.log("Este es postID: ",postID);
	dispatch({
		type: loadingPost
	});
	try {
		let dataForm = '_method=' + encodeURIComponent('POST');
		dataForm += '&postID=' + encodeURIComponent(postID);
		const response = await fetch(`${apiUrl.link}/api/likeordislikenews`, {
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

		//console.log('LLego aqui?:', data);

		if (!response.ok) {
			dispatch({
				type: errorPodcast,
				error: 'Error Al publicar el like, ' + response.status,
				cargando: false
			});
		} else {
			dispatch({
				type: likeOrDislikePodcast,
				payload: data.message,
				cargando: false
			});
			//console.log("Que trae Data", data);
		}
	} catch (error) {
		dispatch({
			type: errorPost,
			error: error.message,
			cargando: false
		});
	}
};
