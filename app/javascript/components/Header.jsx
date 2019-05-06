import AppBar from '@material-ui/core/AppBar';
import React from 'react';
import { Toolbar } from '@material-ui/core';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AppBar>
                <Toolbar>
                    Logout
                </Toolbar>
            </AppBar>
        );
    }
}

export default Header;
