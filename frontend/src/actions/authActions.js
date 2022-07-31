import axios from 'axios';
import { authAxios } from '../utils';
import { signInURL, signOutURL, registrationURL } from '../constants';

export const AUTH_ERR = 'AUTH_ERR';
export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_SIGNIN = 'AUTH_SIGNIN';
export const AUTH_SIGNOUT = 'AUTH_SIGNOUT';
export const AUTH_SIGNOUT_SUCCESS = 'AUTH_SIGNOUT_SUCCESS';

export const authStart = () => dispatch => {
    dispatch({
        type: AUTH_START
    });
}

export const authSuccess = token => {
    return {
        type: AUTH_SUCCESS,
        payload: { token: token }
    }
}

export const authSignOutSuccess = () => {
    return {
        type: AUTH_SIGNOUT_SUCCESS
    }
}

export const authSignIn = (username, password) => dispatch => {
    dispatch(authStart())
    axios.post(signInURL, {
        username: username,
        password: password
    })
        .then(res => {
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000)
            localStorage.setItem("_shpuid", token);
            localStorage.setItem("_shpuid_exp", expirationDate);
            dispatch(authSuccess(token));
            window.location.reload();
        })
        .catch(err => {
            if (err.response !== undefined || null) {
                for (let key in err.response.data) {
                    var errmsg = err.response.data[key][0]
                    console.log(errmsg)
                }
                dispatch(authFail(errmsg))
            }
            else dispatch(authFail(err.message))
        })
}

export const authFail = err => {
    return {
        type: AUTH_FAIL,
        payload: err
    }
}

export const authSignOut = () => dispatch => {
    dispatch(authStart());

    localStorage.removeItem('_shpuid');
    localStorage.removeItem('_shpuid_exp');
    authAxios.post(signOutURL, {})
        .then(res => {
            dispatch({
                type: AUTH_SIGNOUT,
            });
            console.log(res.data);
            dispatch(authSignOutSuccess());
            window.location.reload();
        })
        .catch(err => {
            dispatch(authFail(err))
        })

}

export const authSignUp = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(registrationURL, {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        })
            .then(res => {
                if (res.status === 400) { throw new Error('Please enter correct information') }
                const token = res.data.key;
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                localStorage.setItem('_shpuid', token);
                localStorage.setItem('_shpuid_exp', expirationDate);
                dispatch(authSuccess(token))
            })
            .catch(err => {
                //console.log(err)
                dispatch(authFail(err));
            });
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('_shpuid');
        if (token === undefined) {
            dispatch(authSignOut());
        }
        else {
            const expirationDate = new Date(localStorage.getItem('_shpuid_exp'));
            if (expirationDate <= new Date()) {
                dispatch(authSignOut());
            }
            else {
                dispatch(authSuccess(token));
                dispatch(
                    checkAuthTimeout(
                        (expirationDate.getTime() - new Date().getTime()) / 1000
                    )
                );
            }
        };
    };
};

export const checkAuthTimeout = expirationTime => {
    return dipatch => {
        setTimeout(() => {
            dipatch(authSignOut());
        }, expirationTime * 1000);
    };
};
