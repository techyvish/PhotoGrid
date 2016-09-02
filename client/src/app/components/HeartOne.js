
import React, {Component} from 'react';
import {deepOrange500} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Heart from 'material-ui/svg-icons/action/favorite'
import axios from 'axios';

const styles = {
    container: {
        backgroundColor: deepOrange500,
        textAlign: 'center',
        marginLeft:0,
        marginRight:0,
        marginTop:0,
    },

    labelStyle: {
        fontSize: '13px',
        color: '#ffffff',
    }
};

class HeartOne extends Component {

    constructor(props, context) {
        super(props, context);
        this._handleTap = this._handleTap.bind(this);
        this.state = {
            fevCount : props.fevCount
        }

        this.axios = axios.create({
            baseURL: this.props.hostname,
            timeout: 5000,
            headers: {'X-Custom-Header': 'foobar'}
        });
    }

    _handleTap(){
        console.log('Hey hi tapped');

        debugger;
        var that = this;
        var url = `/voteup/${this.props.filename}`
        this.axios.get(url)
            .then(function (res) {
                console.log(res.data);
                that.setState({
                    fevCount: res.data.votes
                })
            })
            .catch(function (err) {
                console.log(err);
            });

    }

    render() {
        const muiTheme = this.props.muiTheme;

        return (
            <IconButton onTouchTap={this._handleTap}>
                <div className="row" style={{ display: 'flex', flexDirection: 'row'}}>
                    <label style={styles.labelStyle}>{`${this.state.fevCount} `}</label>
                    <Heart color={muiTheme.palette.accent1Color} />
                </div>
            </IconButton>
        );
    }

}

export default HeartOne;