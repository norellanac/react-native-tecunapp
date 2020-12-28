import { getAllPodcast, showPodcast, commentPodcast, loadingPodcast, errorPodcast, categoryPodcast,  likeOrDislikePodcast, deleteComment, idSearchPodcast} from '../types/podcastType';
import { PURGE } from 'redux-persist';

const INITIAL = {
    podcasts: [],
    podcast: [],
    document: [],
    image: [],
    cargando: false,
    error: '',
    idCategory: '',
    category: [],
    categories: [],
    categoryPodcastName: [],
    idCategory: '',
    comment: [],
    object: [],
    likeOrDislike: [],
    idDestroy: [],
    podcastId: null,
    categories: []
};


export default (state = INITIAL, action) => {
    switch (action.type) {
        case getAllPodcast:
            return { ...state, podcasts: action.payload, categories: action.categories, cargando: action.cargando, error: '' };
        case loadingPodcast:
            return { ...state, cargando: true };
        case errorPodcast:
            return { ...state, error: action.error, cargando: action.cargando };
        case commentPodcast:
            return { ...state, comment: action.payload, cargando: action.cargando };
        case categoryPodcast:
            return {
                ...state, podcasts: action.payload,
                categories: action.categories,
                categoryPodcastName: action.categoryPodcastName,
                comment: action.comment,
                idCategory: action.idCategory,
                cargando: [],
                cargando: action.cargando
            };
        case showPodcast:
            return {
                ...state, 
                podcast: action.payload,
                categoryPodcastName: action.categoryName,
                cargando: action.cargando
            };
        case likeOrDislikePodcast:
            return { 
                ...state, 
                likeOrDislike: action.payload, 
                object: action.object, 
                cargando: [],
                cargando: action.cargando 
            };
        case deleteComment:
            return { ...state, cargando: action.cargando };
        case idSearchPodcast:
            return { ...state, podcastId: action.payload.id, podcast: action.payload }
        case PURGE:
            return INITIAL;
        default:
            return state;
    }
}