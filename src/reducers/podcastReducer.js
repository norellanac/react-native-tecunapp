import { getAllPodcast, getPodcast, getDocument, getImage, loadingPodcast, errorPodcast, categoryPodcast, commentPodcast, likeOrDislikePodcast, deleteComment, idSearchPodcast} from '../types/podcastType';
import { PURGE } from 'redux-persist';

const INITIAL = {
    podcasts: [],
    podcast: [],
    document: [],
    image: [],
    cargando: false,
    error: '',
    category: [],
    comment: [],
    likeOrDislike: [],
    idDestroy: [],
    podcastId: null,
    categories: []
};


export default (state = INITIAL, action) => {
    switch (action.type) {
        case getAllPodcast:
            return { ...state, podcasts: action.payload, categories: action.categories, cargando: action.cargando };
        case loadingPodcast:
            return { ...state, cargando: true };
        case errorPodcast:
            return { ...state, error: action.error, cargando: action.cargando };
        case getPodcast:
            return { ...state, podcast: action.payload.id, cargando: action.cargando, error: '' };
        case getDocument:
            return { ...state, document: action.payload.featured_document, cargando: action.cargando };
        case getImage:
            return { ...state, image: action.payload.featured_image, cargando: action.cargando };
        case commentPodcast:
            return { ...state, comment: action.payload, cargando: action.cargando };
        case categoryPodcast:
            return { ...state, category: action.payload.id, cargando: action.cargando };
        case likeOrDislikePodcast:
            return { ...state, likeOrDislike: action.payload, cargando: action.cargando };
        case deleteComment:
            return { ...state, idDestroy: action.payload.id, cargando: action.cargando };
        case idSearchPodcast:
            return { ...state, podcastId: action.payload.id, podcast: action.payload }
        case PURGE:
            return INITIAL;
        default:
            return state;
    }
}