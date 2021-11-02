import * as ActionTypes from './ActionTypes'; // all action types
import {baseUrl} from '../shared/baseUrl'; // server url

//---------------------------------------------------- dishes ----------------------------------------------------------

export const fetchDishes = () => (dispatch) => {

    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error('Error' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

//------------------------------------------------- comments -----------------------------------------------------------

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
};

export const postComment = (dishId, rating, comment) => (dispatch) => {
    const newComment = {
        dish: dishId,
        rating: rating,
        // author: author, ( removed since server already know who is posting this comment )
        comment: comment
    }

    // newComment.date = new Date().toISOString(); ( removed since mongodb has timestamp)
    const bearer = 'Bearer ' + localStorage.getItem('token')

    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            "Content-Type": "application/json",
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error('Error' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => {
            alert('Your comment could not be posted\nError: ' + error.message + '\n' + 'Login to comment on Dishes');
        });
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

//----------------------------------------------- promotions -----------------------------------------------------------

export const fetchPromos = () => (dispatch) => {

    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

// -------------------------------------------------- leaders ----------------------------------------------------------

export const fetchLeaders = () => (dispatch) => {

    dispatch(leadersLoading());

    return fetch(baseUrl + 'leaders')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)));
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

// ---------------------------------------------------- feedback -------------------------------------------------------

export const addFeedback = (feedback) => ({
    type: ActionTypes.ADD_FEEDBACK,
    payload: feedback
});

export const postFeedback = (feedback) => (dispatch) => {

    return fetch(baseUrl + 'feedback', {
        method: 'POST',
        body: JSON.stringify(feedback),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error('Error' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(response => dispatch(addFeedback(response)))
        .catch(error => {
            console.log('post feedback', error.message);
            alert('Server side does not support accepting feedback yet');
        });
}

// ------------------------------------------------- authentication ( login )-------------------------------------------

export const requestLogin = (credentials) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds: credentials
    }
}

export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}

export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const requestLogout = () => {
    return {
        type: ActionTypes.LOGOUT_REQUEST
    }
}

export const receiveLogout = () => {
    return {
        type: ActionTypes.LOGOUT_SUCCESS
    }
}

export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(favoritesFailed("Error 401: Unauthorized"));
    dispatch(receiveLogout())
}

export const loginUser = (creds) => (dispatch) => {
    dispatch(requestLogin(creds));

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        body: JSON.stringify(creds),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error('Error' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            throw new Error(error.message)
        })
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                // if login was successful, save the token in local storage
                localStorage.setItem('token', response.token)
                localStorage.setItem('creds', JSON.stringify(creds))
                dispatch(fetchFavorites())
                dispatch(receiveLogin(response))
            } else {
                const error = new Error('Error' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        })
        .catch(error => dispatch(loginError(error.message)))
}

// ------------------------------------------ authentication ( sign up ) -----------------------------------------------
export const requestSignUp = () => {
    return {
        type: ActionTypes.SIGNUP_REQUEST
    }
}

export const receiveSignUp = (response) => {
    return {
        type: ActionTypes.SIGNUP_SUCCESS,
        success: response.success
    }
}

export const signUpError = (message) => {
    return {
        type: ActionTypes.SIGNUP_FAILURE,
        message
    }
}

export const postSignUp = ({firstname, lastname, username, password}) => dispatch => {
    dispatch(requestSignUp());

    const signUpFormData = {
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password
    }

    return fetch(baseUrl + 'users/signup', {
        method: 'POST',
        body: JSON.stringify(signUpFormData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error('Error' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            throw new Error(error.message)
        })
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                // if sign up was successful,
                // server will send this json
                // {"success": true, "status": "Registration Successful!" }
                dispatch(receiveSignUp(response))
            } else {
                const error = new Error('Error' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        })
        .catch(error => dispatch(signUpError(error.message)))
}

// ------------------------------------------- favorite ----------------------------------------------------------------

export const favoritesLoading = () => {
    return {
        type: ActionTypes.FAVORITES_LOADING
    }
}

export const favoritesFailed = (errMess) => {
    return {
        type: ActionTypes.FAVORITES_FAILED,
        payload: errMess
    }
}

export const addFavorites = (favorites) => {
    return {
        type: ActionTypes.ADD_FAVORITES,
        payload: favorites
    }
}

export const fetchFavorites = () => (dispatch) => {
    dispatch(favoritesLoading(true))
    const bearer = 'Bearer ' + localStorage.getItem('token')

    return fetch(baseUrl + 'favorites', {
        headers: {
            'Authorization': bearer
        }
    })
        .then(response => {
            if (response.ok) {
                return response
            } else {
                const error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            throw new Error(error.message)
        })
        .then(response => response.json())
        .then(favorites => dispatch(addFavorites(favorites)))
        .catch(error => dispatch(favoritesFailed(error.message)))
}

export const postFavorite = (dishId) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token')

    return fetch(baseUrl + 'favorites/' + dishId, {
        method: 'POST',
        body: JSON.stringify({"_id": dishId}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response
            } else {
                const error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            throw new Error(error.message)
        })
        .then(response => response.json())
        .then(favorites => { dispatch(addFavorites(favorites)) })
        .catch(error => dispatch(favoritesFailed(error.message)))
}

export const deleteFavorite = (dishId) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token')

    return fetch(baseUrl + 'favorites/' + dishId, {
        method: 'DELETE',
        headers: {
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            throw new Error(error.message)
        })
        .then(response => response.json())
        .then(favorites => { dispatch(addFavorites(favorites)) })
        .catch(error => dispatch(favoritesFailed(error.message)));
}