import React, {useState} from 'react'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// material ui
const useStyles = makeStyles((theme) => ({
  root: {
    margin: '5px 0px',
    width: '100%',
  },
}));

function MCQBoxOption( {id, callBack}) {
    // material ui
    const classes = useStyles();

    const [val, setVal] = useState("");
    const updateData = (value) => {
        setVal(value);
        callBack(val, id);
    }

    const label = "Option " + id + ":";

    return (
        <div className="mcqBoxOption">
            <TextField
              required
              className={classes.root}
              id="outlined-required"
              label={label}
              variant="outlined"
              value={val}
              size= "small"
              onChange={(e) => updateData(e.target.value)}
            />
        </div>
    )
}

export default MCQBoxOption
