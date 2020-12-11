import { getAllPost, getPost, getDocument, getImage, loadingPost, errorPost, categoryPost, commentPost, likeOrDislikeNews, deleteComment, idSearchNew} from '../types/postType';
import { PURGE } from 'redux-persist';

const INITIAL = {
    posts: [],
    post: [],
    document: [],
    image: [],
    cargando: false,
    error: '',
    category: [],
    comment: [],
    likeOrDislike: [],
    idDestroy: [],
    postId: null
};


export default (state = INITIAL, action) => {
    switch (action.type) {
        case getAllPost:
            return { ...state, posts: action.payload, cargando: action.cargando };
        case loadingPost:
            return { ...state, cargando: true };
        case errorPost:
            return { ...state, error: action.error, cargando: action.cargando };
        case getPost:
            return { ...state, post: action.payload.id, cargando: action.cargando, error: '' };
        case getDocument:
            return { ...state, document: action.payload.featured_document, cargando: action.cargando };
        case getImage:
            return { ...state, image: action.payload.featured_image, cargando: action.cargando };
        case commentPost:
            return { ...state, comment: action.payload, cargando: action.cargando };
        case categoryPost:
            return { ...state, category: action.payload.id, cargando: action.cargando };
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