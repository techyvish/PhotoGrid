
import React, {Component} from 'react';
import {deepOrange500} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

//iconClassNameRight="muidocs-icon-navigation-expand-more"

const styles = {
    container: {
        backgroundColor: deepOrange500,
        textAlign: 'center',
        marginLeft:0,
        marginRight:0,
        marginTop:0,
    }
};

class NavigationBar extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleSave = this.handleSave.bind(this);
    }

    handleSave(){
        console.log('Hey tapped');
    }

    render() {
        var appTitle = 'Photos'
        return (
            <AppBar
                style={styles.container}
                title={appTitle}
            />
        );
    }

}

export default NavigationBar;