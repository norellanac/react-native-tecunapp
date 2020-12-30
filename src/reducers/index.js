import {combineReducers} from 'redux'
import usuariosReducer from './usuariosReducer'
import jobsReducer from './jobsReducer'
import awardReducer from './awardReducer'
import storeReducer from './storeReducer'
import postReducer from './postReducer'
import podcastReducer from './podcastReducer'
import questionReducer from './questionReducer'
import loginReducer from './loginReducer'
import contactsReducer from './contactsReducer'

/*import stickersReducer from './stickersReducer'
import categoriesReducer from './categoriesReducer'
import giftReducer from './giftReducer'
import addressReducer from './addressReducer'
import historyGiftReducer from './historyGiftReducer'*/

export default combineReducers({
    loginReducer,
    usuariosReducer,
    jobsReducer,
    awardReducer,
    storeReducer,
    postReducer,
    podcastReducer,
    questionReducer,
    contactsReducer,
    /*stickersReducer,
    categoriesReducer,
    giftReducer,
    addressReducer,
    historyGiftReducer,*/
});