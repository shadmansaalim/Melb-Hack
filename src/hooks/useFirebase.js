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


                //Add user to db
                saveUserToDb(email, name, 'POST');

                // Send name to firebase
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                    swal("Account Created Successfully!", "You can now purchase courses and continue quality learning with EModule.", "success");
                    history.replace('/dashboard')
                    window.location.reload();

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
                //Add user to db
                saveUserToDb(user.email, user.displayName, 'PUT');
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
                toast.success(`Welcome back ${auth.currentUser.displayName.split(' ')[0]}`)
                history.replace('/dashboard')
                window.location.reload();


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

    const courses = [
        {
            courseID: 1,
            modules: [
                {
                    key: 1,
                    videos: [
                        { key: 1, completed: false },
                        { key: 2, completed: false },
                        { key: 3, completed: false },

                    ]
                },
                {
                    key: 2,
                    videos: [
                        { key: 1, completed: false },
                        { key: 2, completed: false },
                        { key: 3, completed: false },

                    ]
                },
                {
                    key: 3,
                    videos: [
                        { key: 1, completed: false },
                        { key: 2, completed: false },
                        { key: 3, completed: false },

                    ]
                },
            ]
        },
        {
            courseID: 2,
            modules: [
                {
                    key: 1,
                    videos: [
                        { key: 1, completed: false },
                        { key: 2, completed: false },
                        { key: 3, completed: false },

                    ]
                },
                {
                    key: 2,
                    videos: [
                        { key: 1, completed: false },
                        { key: 2, completed: false },
                        { key: 3, completed: false },
                        { key: 4, completed: false },

                    ]
                },
                {
                    key: 3,
                    videos: [
                        { key: 1, completed: false },
                        { key: 2, completed: false },
                        { key: 3, completed: false },

                    ]
                },
            ]
        },
    ]


    //Function to add users to database MONGO DB
    const saveUserToDb = (email, displayName, method) => {
        const user = { email, displayName, courses };
        fetch('http://localhost:8000/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
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