import AppBar from '@material-ui/core/AppBar';
import React from 'react';
import { Toolbar, Menu, MenuItem, MenuList, Button } from '@material-ui/core';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    renderMenu() {
        return (
            <Menu> Test
                <MenuList>
                    <MenuItem>
                        <a href='auth/logout'>Logout</a>
                    </MenuItem>
                </MenuList>
            </Menu>
        );
    }
    render() {
        return (
            <AppBar>
                <Button color="white">Profile</Button>
                <Toolbar>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Header;
