import React, {useState} from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

function MCQResponseOption( {id, callBack, qName} ) {
    const [b, setB] = useState(1);
    const updateData = () => {
        b ? setB(0) : setB(1);
        callBack(b, id);
    }

    // material ui
    const [state, setState] = React.useState({
        checkedA: false,
        checkedB: false,
        checkedF: false,
        checkedG: false,
      });

      const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        updateData();
      };

    return (
        <div className="mcqResponseOption">
            <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkedB}
                    onChange={handleChange}
                    name="checkedB"
                    color="primary"
                  />
                }
                label={qName}
              />
        </div>
    )
}

export default MCQResponseOption
