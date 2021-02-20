import React, {useEffect, useState} from 'react';
import axios from "axios";
import "./EventInfoBox.css";
import {selectUser} from "../context/reducer";
import {useSelector} from "react-redux";
import {Avatar} from "@material-ui/core";

function EventInfoBox( {id}) {
    const [name, setName] = useState("No Match");
    const [date, setDate] = useState(new Date());
    const [photo, setPhoto] = useState("");
    const user = useSelector(selectUser);

    useEffect(() => {
        axios.get("http://localhost:5000/events/" + id)
            .then(res => {
                console.log(res.data);
                setName(res.data.name);
                setDate(res.data.date);
            })
            .catch(err => alert(err));
    });

    const getAvatar = (email) => {
            axios.get("http://localhost:5000/users/getUser/" + email)
                .then(res => {
                    if (res.data.length !== 0) {
                        setPhoto(res.data[0].photo);
                    }
                })
                .catch(err => alert(err));
    }

    return (
        <div className="eventInfoBox">
            <Avatar src={photo} />
            <div classame="text">
                <h2>{name}</h2>
                <h3>{date.toString().substr(0, 10)}</h3>
            </div>
       </div>
    )
}

export default EventInfoBox
