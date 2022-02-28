import "../App.css";
import React from "react";
import { FormControl, InputLabel, Select, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';

function SelectionList(props) {
    const handleChange = (event) => {
        props.setSelection(event.target.value);
    };

    return (
        <FormControl fullWidth>
            <InputLabel>Receiving university</InputLabel>
            <Select
                value={props.selection === -1 ? '' : props.selection}
                label="Receiving University"
                onChange={handleChange}
                MenuProps={{ style: { maxHeight: 200 } }}
            >
                {props.options.map((item, index) =>
                    <MenuItem value={index} key={index}>
                        <ListItemText>
                            {item.partner_university}
                        </ListItemText>
                    </MenuItem>
                )}
            </Select>
        </FormControl>
    );
}
export default SelectionList;