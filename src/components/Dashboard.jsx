import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from 'react-router-dom';

export default function MenuPopupState() {
    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
                <React.Fragment>
                    <div className='hamburger'>
                        <Button variant="outlined" {...bindTrigger(popupState)}>
                            <GiHamburgerMenu />
                        </Button>
                    </div>

                    <Menu {...bindMenu(popupState)}>
                        <MenuItem onClick={popupState.close}><NavLink to="/">Singup</NavLink></MenuItem>
                        <MenuItem onClick={popupState.close}><NavLink to="/podcast">Podcasts</NavLink></MenuItem>
                        <MenuItem onClick={popupState.close}><NavLink to="/create-podcast">Create A Podcast</NavLink></MenuItem>
                        <MenuItem onClick={popupState.close}><NavLink to="/change-password">Change Password</NavLink></MenuItem>
                        <MenuItem onClick={popupState.close}> <NavLink to="/profile">Profile</NavLink></MenuItem>
                    </Menu>
                </React.Fragment>
            )}
        </PopupState>
    );
}