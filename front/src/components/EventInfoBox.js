import React, {useEffect, useState} from 'react';
import axios from "axios";
import "./EventInfoBox.css";
import {selectUser} from "../context/reducer";
import {useSelector, useDispatch} from "react-redux";
import {Avatar} from "@material-ui/core";
import { setCurrent } from '../context/currentReducer';

function EventInfoBox( {id, callBack}) {
    const [name, setName] = useState("No Match");
    const [date, setDate] = useState(new Date());
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get("http://localhost:5000/events/" + id)
            .then(res => {
                setName(res.data.name);
                setDate(res.data.date);
            })
            .catch(err => alert(err));
    });

    return (
        <div className="eventInfoBox">
            <div classame="text">
                <h2>{name}</h2>
                <h3>{date.toString().substr(0, 10)}</h3>
            </div>
       </div>
    )
}

export default EventInfoBox
