import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dropzone from 'react-dropzone';
// import FontIcon from 'material-ui/FontIcon';
//import {blue500, red500, greenA200} from 'material-ui/styles/colors';

class UploadScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            filesPreview:[],
            filesToBeSent:[],
            printcount:10,
        }
    }
    onDrop(acceptedFiles, rejectedFiles) {
         console.log('Accepted files: ', acceptedFiles);
        var filesToBeSent=this.state.filesToBeSent;
        if(filesToBeSent.length < this.state.printcount){
            filesToBeSent.push(acceptedFiles);
            var filesPreview=[];
            for(var i in filesToBeSent){
                filesPreview.push(<div>
                        {filesToBeSent[i][0].name}
                        <MuiThemeProvider>
                            <a href="#">clear</a>
                        </MuiThemeProvider>
                    </div>
                )
            }
            this.setState({filesToBeSent,filesPreview});
        }
        else{
            alert("You have reached the limit of printing files at a time")
        }
    }
    render() {
        return (
            <div className="App">
                <Dropzone onDrop={(files) => this.onDrop(files)}>
                    <div>Try dropping some files here, or click to select files to upload.</div>
                </Dropzone>
                <div>
                    Files to be printed are:
                    {this.state.filesPreview}
                </div>
            </div>
        )
    }
}

export default UploadScreen