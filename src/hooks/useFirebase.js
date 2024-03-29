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
    const [instructor, setInstructor] = useState(false);
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
                    swal("Account Created Successfully!", "You can now continue courses with BREVEMOD", "success");
                    history.replace('/dashboard')
                    window.location.reload();

                }).catch((error) => {

                });

            })
            .catch((error) => {
                console.log(error.message)
                if (error.message == 'Firebase: Error (auth/email-already-in-use).') {
                    swal("Invalid!", "An account already exists with this email'", "error");
                }
                if (error.message == 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
                    swal("Invalid!", "Password should be at least 6 characters", "error");
                }
            })
            .finally(() => setIsLoading(false));
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setIsLoading(true);
            if (user) {
                setUser(user);
                getIdToken(user)
                    .then(token => {
                        localStorage.setItem('token', token)

                    })
                fetch(`https://melb-hack-backend.onrender.com/users/${user.email}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.instructor) {
                            setInstructor(true);
                        }
                        setIsLoading(false);
                    })
            } else {
                setInstructor(false);
                setUser({})
                setIsLoading(false);
            }

        });
    }, [auth, user.email])






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
            setInstructor(false);
            setUser({});
        }).catch((error) => {
            // An error happened.
        })
            .finally(() => setIsLoading(false));
    }





    //Function to add users to database MONGO DB
    const saveUserToDb = (email, displayName, method) => {
        const courses = [
            {
                courseID: 1,
                completed: '1/0'
            },
            {
                courseID: 2,
                completed: '1/0'
            },
        ]
        const user = { email, displayName, courses };
        fetch('https://melb-hack-backend.onrender.com/users', {
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
        instructor,
        isLoading,
        registerUser,
        loginUser,
        signInWithGoogle,
        logOut,
    }

}


export default useFirebase;