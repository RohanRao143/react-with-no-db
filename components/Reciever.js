import React from 'react'
import { Receiver } from 'react-file-uploader';

class ReceiverComp extends React.Component{
    constructor(props) {
        super(props);
        this.onFileDrop = this.onFileDrop.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
    }
    onDragEnter(e) {
        this.setState({ isReceiverOpen: true });
    }

    onDragOver(e){
        // your codes here
        console.log(e);
    }

    onDragLeave(e) {
        this.setState({ isReceiverOpen: false });
    }

    onFileDrop(e, files) {
        // check if the files are drop on the targeted DOM
        const node = ReactDOM.findDOMNode(this.refs.uploadPanel);
        if (e.target !== node) {
            return;
        }

        files.forEach(file => {
            // check file size
            if (file.size > 1000 * 1000) {
                file.error = 'file size exceeded 1MB';
            }
        })

        // put files into state/stores by setState/action
        this.setState({
            files: this.state.files.concat(files),
        });

        // close the Receiver after file dropped
        this.setState({ isReceiverOpen: false });
    }

    render(){
        return(
            <Receiver
                isOpen={true}
                onDragEnter={this.onDragEnter}
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onFileDrop={this.onFileDrop}
            >
                <div>
                    visual layer of the receiver (drag & drop panel)
                </div>
            </Receiver>
        )
    }
}

export default ReceiverComp