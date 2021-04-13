import { getAllPost, getPost, showPost, loadingPost, loadingPostLike, errorPost, categoryPost, showPostCategory, commentPost, likeOrDislikeNews, deleteComment, idSearchNew } from '../types/postType';
import { PURGE } from 'redux-persist';

const INITIAL = {
    posts: [],
    post: [],
    postCategory: [],
    document: [],
    image: [],
    cargando: false,
    cargandoLike: false,
    error: '',
    idCategory: '',
    category: [],
    categories: [],
    categoryPostName: [],
    likePost: [],
    idCategory: '',
    likeOrDislike: [],
    idDestroy: [],
    postId: null,
    categories: []
};


export default (state = INITIAL, action) => {
    switch (action.type) {
        case getAllPost:
            return { ...state, posts: action.payload, categories: action.categories, cargando: action.cargando, error: '' };
        case loadingPost:
            return { ...state, cargando: true };
        case errorPost:
            return { ...state, error: action.error, cargando: action.cargando, cargandoLike: action.cargando };
        case commentPost:
            return { ...state, comment: action.payload, cargando: action.cargando };
        case categoryPost:
            return {
                ...state, posts: action.payload,
                categories: action.categories,
                categoryPostName: action.categoryPostName,
                idCategory: action.idCategory,
                cargando: action.cargando
            };
        case showPost:
            return {
                ...state, 
                post: action.payload,
                categoryPostName: action.categoryName,
                likePost: action.likePost,
                cargando: action.cargando
            };
        case showPostCategory:
            return {
                ...state, 
                post: [], 
                categoryPostName: [],
                post: action.payload,
                categoryPostName: action.categoryName,
                cargando: action.cargando
            };
        case getPost:
            return {...state, post: action.payload };
        case loadingPostLike:
            return { ...state, cargandoLike: true };
        case likeOrDislikeNews:
            return { ...state, likeOrDislike: action.payload, cargando: action.cargandoLike };
        case deleteComment:
            return { ...state, cargando: action.cargando };
        case idSearchNew:
            return { ...state, postId: action.payload.id, post: action.payload }
        case PURGE:
            return INITIAL;
        default:
            return state;
    }
}