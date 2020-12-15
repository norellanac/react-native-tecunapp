import { getAllPost, getPost, showPost, loadingPost, errorPost, categoryPost, commentPost, likeOrDislikeNews, deleteComment, idSearchNew } from '../types/postType';
import { PURGE } from 'redux-persist';

const INITIAL = {
    posts: [],
    post: [],
    document: [],
    image: [],
    cargando: false,
    error: '',
    idCategory: '',
    category: [],
    categories: [],
    categoryPostName: '',
    comment: [],
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
            return { ...state, error: action.error, cargando: action.cargando };
        case getPost:
            return { ...state, post: action.payload, cargando: action.cargando, error: '', };
        case commentPost:
            return { ...state, comment: action.payload, cargando: action.cargando };
        case categoryPost:
            return {
                ...state, posts: action.payload,
                categories: action.categories,
                categoryPostName: action.categoryPostName,
                cargando: action.cargando
            };
        case showPost:
            return {
                ...state, post: action.payload,
                comment: action.comment,
                categoryPostName: action.categoryPostName,
                cargando: action.cargando
            };
        case likeOrDislikeNews:
            return { ...state, likeOrDislike: action.payload, cargando: action.cargando };
        case deleteComment:
            return { ...state, idDestroy: action.payload.id, cargando: action.cargando };
        case idSearchNew:
            return { ...state, postId: action.payload.id, post: action.payload }
        case PURGE:
            return INITIAL;
        default:
            return state;
    }
}