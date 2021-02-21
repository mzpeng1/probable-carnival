import React, { useState } from 'react';
import MCQBoxOption from "./MCQBoxOption";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// material ui
const useStyles = makeStyles((theme) => ({
  root: {
    margin: '7.5px 0px',
    width: '100%',
  },
  buttonWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
  },
  button:{
      border: 'none',
      width: '47.5%',
      borderRadius: '3px',
      padding: '7px',
      margin: '10px 0px 15px 0px',
      transitionDuration: '0.4s',
      backgroundColor: 'f2f2f2',
  },
}));

function MCQBox( {id, callBack} ) {

    // material ui
    const classes = useStyles();

    const [name, setName] = useState("");
    const [val, setVal] = useState([]);
    const [numOptions, setNumOptions] = useState(0);
    const options = [];

    const generateOptions = (options) => {
        for (let i = 0; i < numOptions; i++) {
            options.push(<MCQBoxOption id={i+1} key={i+1} callBack={updateData}></MCQBoxOption>);
        }
        return options;
    }

    const updateName = (input, index) => {
        setName(input);
        const temp = val;
        temp[index] = input;
        setVal(temp);
        callBack(val, id);
    }

    const updateData = (input, index) => {
        const temp = val;
        temp[index] = input;
        setVal(temp);
        callBack(val, id);
    }

    const incrementOptions = () => {
        setNumOptions(numOptions + 1);
        const temp = val;
        temp.push("");
        setVal(temp);
    }

    const decrementOptions = () => {
        if (numOptions > 0) {
            setNumOptions(numOptions - 1);
        }
    }

    const label = "Question " + ++id + ":";
    return (
        <div className="mcqBox">
            <TextField
              required
              className={classes.root}
              id="outlined-required"
              label= {label}
              variant="outlined"
              value={name}
              onChange={(e) => updateName(e.target.value, 0)}
            />
            {generateOptions(options)}

            <div className={classes.buttonWrapper}>
                <button className={classes.button} type="button" onClick={() => incrementOptions()}>Add Option</button>
                <button className={classes.button} type="button" onClick={() => decrementOptions()}>Remove Option</button>
            </div>
        </div>
    )
}

export default MCQBox
