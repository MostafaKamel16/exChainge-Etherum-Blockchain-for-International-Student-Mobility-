import React from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


function AccountButton(props) {
    const { signout } = props;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const openMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const closeMenu = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton color="inherit" onClick={openMenu}>
                <AccountCircleIcon style={{ marginRight: 5 }} />
            </IconButton>
            <Menu
                open={open}
                anchorEl={anchorEl}
                onClose={closeMenu}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={signout}>Sign Out</MenuItem>
            </Menu>
        </>
    );
}

export default AccountButton;
