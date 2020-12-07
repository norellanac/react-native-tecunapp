import {combineReducers} from 'redux'
import usuariosReducer from './usuariosReducer'
import jobsReducer from './jobsReducer'

/*import stickersReducer from './stickersReducer'
import categoriesReducer from './categoriesReducer'
import giftReducer from './giftReducer'
import addressReducer from './addressReducer'
import historyGiftReducer from './historyGiftReducer'*/

export default combineReducers({
    usuariosReducer,
    jobsReducer,
    /*stickersReducer,
    categoriesReducer,
    giftReducer,
    addressReducer,
    historyGiftReducer,*/
});