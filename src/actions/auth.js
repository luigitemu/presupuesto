
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { types } from '../types/types';


export const startGoogleLogin = () => {


    return async (dispatch) => {
        const userGoogle = await firebase.auth().signInWithPopup(googleAuthProvider);

        const { user } = userGoogle;
        dispatch(login(user.uid, user.displayName));

    }
}

const login = (uid, name) => ({
    type: types.authLogin,
    payload: {
        uid,
        name
    }
});