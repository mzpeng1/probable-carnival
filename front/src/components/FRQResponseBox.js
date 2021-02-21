import React, {useState} from 'react'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// material ui
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  }
}));

function FRQResponseBox( {id, name, callBack} ) {
    
    // material ui
    const classes = useStyles();

    const [val, setVal] = useState("");

    const updateData = (val) => {
        setVal(val);
        callBack(val, id);
    }

    return (
        <div className="frqResponseBox">

            <h4>{name}</h4>
            <TextField
              required
              className={classes.root}
              id="outlined-required"
              variant="outlined"
              value={val}
              onChange={(e) => updateData(e.target.value)}
              size="small"
            />
        </div>
    )
}

export default FRQResponseBox
