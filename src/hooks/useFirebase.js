import initializeAuthentication from "../Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged, signOut, getIdToken } from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";
import swal from 'sweetalert';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



initializeAuthentication();
toast.configure()

const useFirebase = () => {
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    const auth = getAuth();


    const registerUser = (name, email, password, history) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const newUser = { email, displayName: name };
                setUser(newUser);



                // Send name to firebase
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                    history.replace('/dashboard')
                    window.location.reload();
                    swal("Account Created Successfully!", "You can now purchase courses and continue quality learning with EModule.", "success");
                }).catch((error) => {
                    console.log(error.message)
                });

            })
            .catch((error) => {
                console.log(error.message)
                if (error.message == 'Firebase: Error (auth/email-already-in-use).') {
                    swal("Invalid!", "An account already exists with this email'", "error");
                }
            })
            .finally(() => setIsLoading(false));
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setIsLoading(true);
            if (user) {
                getIdToken(user)
                    .then(token => {
                        console.log(user);
                        localStorage.setItem('token', token)
                        setUser(user);
                        setIsLoading(false);
                    })


            } else {
                setUser({})
                setIsLoading(false);
            }

        });
    }, [auth])






    const signInWithGoogle = (history) => {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                history.replace('/dashboard')
                window.location.reload();

            }).catch((error) => {
                if (error.message == 'Firebase: Error (auth/account-exists-with-different-credential).') {
                    swal("Invalid!", "An account already exists with this email'", "error");
                }
            })
            .finally(() => setIsLoading(false));
    }

    const loginUser = (email, password, history) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                history.replace('/dashboard')
                window.location.reload();
                toast.success(`Welcome back ${auth.currentUser.displayName.split(' ')[0]}`)

            })
            .catch((error) => {
                if (error.message === "Firebase: Error (auth/wrong-password).") {
                    swal("Invalid Password!", "Please check your email & password and then try again", "error");
                }
                else if (error.message === "Firebase: Error (auth/user-not-found).") {
                    swal("User Not Found!", "Please check your email & password and then try again", "warning");
                }
            })
            .finally(() => setIsLoading(false));
    }
    const logOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            setUser({});
        }).catch((error) => {
            // An error happened.
        })
            .finally(() => setIsLoading(false));
    }


    return {
        user,
        isLoading,
        registerUser,
        loginUser,
        signInWithGoogle,
        logOut,
    }

}


export default useFirebase;