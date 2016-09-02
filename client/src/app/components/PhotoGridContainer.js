
import React, {Component} from 'react';
import {deepOrange500} from 'material-ui/styles/colors';
import ImagesCollection from './ImagesCollection';
import axios from 'axios';

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

class PhotoGridContainer extends Component {

    constructor(props, context) {
        super(props, context);

        this.axios = axios.create({
            baseURL: this.props.hostname,
            timeout: 1000,
            headers: {'X-Custom-Header': 'foobar'}
        });

        this.state = {
            tilesData: [],
        };
    }

    componentDidMount(){
        var that = this;
        this.axios.get('/getimages')
            .then(function (res) {
                console.log(res.data);
                that.setState({
                    tilesData: res.data
                })
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    render() {
        return(
            <ImagesCollection tilesData={this.state.tilesData} muiTheme={this.props.muiTheme} />
        );
    }

}

export default PhotoGridContainer;