import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


// material ui 
const useStyles = makeStyles((theme) => ({
  root: {
    margin: '6px 0px',
    width: '100%',
  },
}));

function FRQBox({ id, callBack}) {

    // material ui
    const classes = useStyles();

    const [val, setVal] = useState("");

    const updateData = (input) => {
        setVal(input);
        callBack(input, id);
    }

    const label = "Question " + ++id + ":";

    return (
        <div>
            <TextField
              className={classes.root}
              required
              id="outlined-required"
              label= {label}
              variant="outlined"
              value={val} 
              onChange={(e) => updateData(e.target.value)}
            />
        </div>
    )
}

export default FRQBox
