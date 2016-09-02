
import React, {Component} from 'react';
import {deepOrange500} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import ReactDom from 'react-dom';
import axios from 'axios';

const styles = {
    container: {
        backgroundColor: deepOrange500,
        textAlign: 'center',
        marginLeft:0,
        marginRight:0,
        marginTop:0,
    },

    inputText:{
        display:'none'
    }


};

class FileuploadButton extends Component {


    constructor(props, context) {
        super(props, context);
        this.handleSave = this.handleSave.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._openFileDialog = this._openFileDialog.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._handleUploadStatus = this._handleUploadStatus.bind(this);
        this._handleSocketConnected =  this._handleSocketConnected.bind(this);
        this._handleDoUpdate = this._handleDoUpdate.bind(this);

        this.axios = axios.create({
            baseURL: this.props.hostname,
            timeout: 1000,
            headers: {'X-Custom-Header': 'foobar'}
        });


        this.state = {
            myFileName: "",
            myFileHandle: {}
        }

    }

    componentDidMount(){
        var socket = this.props.socket;
        socket.on('connect',this._handleSocketConnected);
        socket.on('status',this._handleUploadStatus);
        socket.on('doUpdate',this._handleDoUpdate);
    }

    handleSave(){
        console.log('Hey tapped');
    }

    _handleDoUpdate(){

    }

    _handleUploadStatus(data){

    }

    _handleSocketConnected(data){
        console.log('Socket connected')
    }

    _handleSubmit(e) {
        e.preventDefault();
        console.log("INSIDE: handleSubmit()");
        console.log("fileName = " + this.state.myFileName);
        console.log("this.state.myFileHandle = " + this.state.myFileHandle);

        if (this.state.myFileHandle) {
            console.log("INSIDE if test myFileHandle.length");

            var formData = new FormData();
            formData.append('upload', this.state.myFileHandle);
            formData.append('foo', 'bar');
            //formData.append('file', e.target.value);

            var config = {
                onUploadProgress: function (progressEvent) {
                    var percentCompleted = progressEvent.loaded / progressEvent.total;
                }
            };

            axios.post('/upload', formData, config)
                .then(function (res) {
                    console.log(res);
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }

    _handleChange(event){
        event.preventDefault();

        console.log(event.target.value)

        //
        // var formData = new FormData();
        // formData.append('upload',e.target.value);
        // formData.append('foo', 'bar');
        // formData.append('file', e.target.value);
        //
        // var config = {
        //     onUploadProgress: function(progressEvent) {
        //         var percentCompleted = progressEvent.loaded / progressEvent.total;
        //     }
        // };
        //
        // axios.post('/upload', formData, config)
        //     .then(function (res) {
        //         console.log(res);
        //     })
        //     .catch(function (err) {
        //         console.log(err);
        //     });
        console.log("handleChange() fileName = " + event.target.files[0].name);
        console.log("handleChange() file handle = " + event.target.files[0]);
        this.setState({
            myFileHandle: event.target.files[0],
            myFileName: event.target.files[0].name
        })


        // console.log("INSIDE: handleSubmit()");
        // console.log("fileName = " + this.state.myFileName);
        // console.log("this.state.myFileHandle = " + this.state.myFileHandle);

        if (1) {
            console.log("INSIDE if test myFileHandle.length");

            var formData = new FormData();
            formData.append('upload', event.target.files[0]);
            formData.append('foo', 'bar');
            //formData.append('file', e.target.value);

            var config = {
                onUploadProgress: function (progressEvent) {
                    var percentCompleted = progressEvent.loaded / progressEvent.total;
                }
            };

            axios.post('/upload', formData, config)
                .then(function (res) {
                    console.log(res);
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }

    _openFileDialog(){
        console.log(this.hostName);
        var fileUploadDom = ReactDom.findDOMNode(this.refs.fileUpload);
        fileUploadDom.click();
    }

    render() {
        return (
            <div style={{ marginTop: 10 , marginLeft: 10}}>
                <RaisedButton
                    label="Upload file"
                    primary={true}
                    onTouchTap={this._openFileDialog}>
                    <input
                        className="upload-file"
                        ref="fileUpload"
                        type="file"
                        style={{"display" : "none"}}
                        onChange={this._handleChange}/>

                    {/*<form onSubmit={this._handleSubmit}>*/}
                        {/*<input  className="upload-file" type="file" onChange={this._handleChange} id="profilePhotoFileUpload" />*/}
                        {/*<input  type="submit" value="Post" />*/}
                    {/*</form>*/}

                </RaisedButton>
            </div>
        );
    }

}

export default FileuploadButton;