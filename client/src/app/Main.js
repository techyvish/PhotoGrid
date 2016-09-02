/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavigationBar from './components/NavigationBar'
import FileuploadButton from './components/FileuploadButton'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import io from 'socket.io-client';



const hostname = `http://${window.location.hostname}:3000`;
const socket = io(hostname, {});

const styles = {
  container: {
    //textAlign: 'center',
    paddingTop: 0,
  },

  toolBarStyle : {
    position: 'fixed',
    top: 0,
  }
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class Main extends Component {


  constructor(props, context) {
    super(props, context);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);

    this.state = {
      open: false,
      tilesData: [],
      theme:muiTheme
    }

  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  handleTouchTap() {
    this.setState({
      open: true,
    });
  }

  render() {

    return (
        <MuiThemeProvider muiTheme={muiTheme}>

          <div style={{position:'fixed', width: '100%'}}>

            <div style={{position:'absolute', width: '100%',  top: '128px', overflowY: 'auto'}}>
              {React.cloneElement(this.props.children, { muiTheme: muiTheme })}
            </div>

            <NavigationBar style={{position:'fixed', width: '100%'}}/>

            <Toolbar>
              <ToolbarGroup>
              </ToolbarGroup>
              <ToolbarGroup>
                <ToolbarSeparator />
                <FileuploadButton hostname={hostname} socket={socket} />
              </ToolbarGroup>
            </Toolbar>

          </div>

        </MuiThemeProvider>
    );
  }
}

export default Main;
