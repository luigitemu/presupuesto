import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import Swal from 'sweetalert2';
import { types } from '../types/types';
import { finishLoading, startLoading } from './ui';

export const startGoogleLogin = () => {


    return async (dispatch) => {
        try {

            const userGoogle = await firebase.auth().signInWithPopup(googleAuthProvider);
            const { user } = userGoogle;
            dispatch(login(user.uid, user.displayName));
        } catch (error) {
        }

    }
}

export const login = (uid, name) => ({
    type: types.authLogin,
    payload: {
        uid,
        name
    }
});

export const startRegisterUser = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                await user.updateProfile({ displayName: name });
                dispatch(login(user.uid, user.displayName));
            })
            .catch(e => {
                console.log(e);
                Swal.fire('Error', e.message, 'error');
            });
    }

}

export const startLoginWithEmailAndPassword = (email, password) => {

    return (dispatch) => {
        dispatch(startLoading());

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName));
                dispatch(finishLoading());
            }).catch(e => {
                Swal.fire('Error', e.message, 'error');
                dispatch(finishLoading());
            });

    }

}

export const startLogout = () => {
    return async (dispatch) => {

        await firebase.auth().signOut();

        dispatch(logOut())

    }
}

const logOut = () => ({ type: types.authLogout });