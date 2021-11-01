import * as ActionTypes from '../ActionTypes'

export const SignUpUser = (state = {
    isLoading: false,
    isSignUpSuccess: false,
    signUpErrMess: null
}, action) => {
    switch (action.type) {
        case ActionTypes.SIGNUP_REQUEST:
            return {
                ...state,
                isLoading: true,
                isSignUpSuccess: false,
            }
        case ActionTypes.SIGNUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSignUpSuccess: true,
                signUpErrMess: ''
            };
        case ActionTypes.SIGNUP_FAILURE:
            return {
                ...state,
                isLoading: false,
                isSignUpSuccess: false,
                signUpErrMess: action.message
            };
        default:
            return state
    }
}