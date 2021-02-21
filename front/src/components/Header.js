import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import {auth, provider} from "../firebaseConfig";
import {selectUser, setUser, clearUser} from "../context/reducer";
import { setEvents, clearEvents} from "../context/eventReducer"; 
import axios from 'axios';
import "./Header.css";
import {Avatar, Button} from "@material-ui/core";

function Header() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch(); 
   
    const newUser = {
        displayName: "",
        email: "",
        photo: "",
        events: []
    }

    const signIn = async() => {
        const response = await auth.signInWithPopup(provider);
        let mongoUser = await axios.get("http://localhost:5000/users/getUser/" + response.user.email);
        if (mongoUser.data.length > 0) {
            dispatch(setEvents(mongoUser.data[0].events));
        } else {
            console.log("creating new user");
            await createNewUser(response.user);
        }

        axios.get("http://localhost:5000/users/getUser/" + response.user.email)
            .then(res => {
                const currUser = {
                    email: response.user.email,
                    name: response.user.displayName,
                    photoURL: response.user.photoURL,
                    id: res.data[0]._id
                }
                dispatch(setUser(currUser));
                console.log(currUser);
                console.log(res)
            })
    }

    const signOut= () => {
        dispatch(clearUser());
        dispatch(clearEvents());
    }

    const createNewUser = async (user) => {
        newUser.displayName = user.displayName;
        newUser.email = user.email;
        newUser.photo = user.photoURL;
        newUser.events = [];
        console.log(newUser);
        await axios.post("http://localhost:5000/users/add", newUser)
            .then(res => console.log(res.data))
            .catch(err => alert(err));
    }

    const fetchLogin = () => {
        if (user) {
            console.log(user);
            
            return (<>
            <Button variant="contained" color="primary" onClick={() => signOut()}>sign out</Button>
            </>)
        } else {
            return (<Button variant="contained" color="primary" onClick={() => signIn()}>sign in</Button>)
        }
    }

    return (
        <div className="header">
            <h1><a href="/">branche</a></h1>
            <div className="links">
                <h2><a href="/">Home</a></h2>
                <h2><a href="/admin">Admin</a></h2>
            </div>
            {fetchLogin()}
            <div className="avatarBox">
                {user ? (<Avatar src={user.photoURL}/>) : <Avatar />}
            </div>
        </div>
    )
}

export default Header
