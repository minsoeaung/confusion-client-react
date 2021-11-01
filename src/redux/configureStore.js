import {applyMiddleware, combineReducers, createStore} from 'redux';
import {createForms} from 'react-redux-form';

// reducers
import {Dishes} from './reducers/dishes';
import {Comments} from './reducers/comments';
import {Promotions} from './reducers/promotions';
import {Leaders} from './reducers/leaders';
import {Authentication} from './reducers/authentication'
import {Favorites} from "./reducers/favorites";
import {SignUpUser} from "./reducers/signUpUser";

import {InitialFeedback} from './form';
import thunk from 'redux-thunk';
import logger from 'redux-logger';


export const ConfigureStore = () => {
    return createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            ...createForms({
                feedback: InitialFeedback
            }),
            authentication: Authentication,
            signUpUser: SignUpUser,
            favorites: Favorites
        }),
        applyMiddleware(thunk, logger)
    );
}