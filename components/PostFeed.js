import React from 'react';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import Grid from 'material-ui/Grid';
import {withStyles} from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import {Redirect} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

//import base64ToImage from 'base64-to-image';
import UploadScreen from './UploadScreen';

const styles = (theme)=>({
    root: {
        flexGrow: 1,
        marginTop: 30,
    },
    inputfile: {
        zIndex: -1,
    },
    button: {
        margin: theme.spacing.unit,
        opacity:5
    },
});

class PostFeed extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isloggedin:this.props.isLoggedin,
            anchorEl: null,
            privacy:{ShareType:'public'},
            e1:'',
            e2:'',
            image1:'',
            image2:'',
            post:''
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.imageUpload =  this.imageUpload.bind(this);
        this.getBase64 = this.getBase64.bind(this);
    }

    handlePost(){
        if(this.state.post) {
            let users = JSON.parse(localStorage.getItem('users'));
            let currentuser = JSON.parse(localStorage.getItem('currentuser'));
            let months = [
                'January', 'february', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
                'October', 'November', 'December'];
            let x = users.map((person) => {
                let user = Object.assign({},person);
                if (user.email == currentuser.username && user.password == currentuser.password){
                    if (!user.posts) {
                        user.posts = [];
                    }
                    let date = new Date();
                    let temp = date.getMonth();
                    temp = months[temp];
                    let postTime = ''+temp;
                    temp = date.getDate();
                    postTime = postTime + ' '+ temp;
                    temp = date.getFullYear();
                    postTime = postTime +', '+temp;
                    let post = {
                        images: [
                            {image: this.state.image1, ext: this.state.e1},
                            {image: this.state.image2, ext: this.state.e2}
                        ],
                        share: this.state.privacy.ShareType,
                        post: this.state.post,
                        time:postTime
                    };
                    user.posts.push(post);
                }
                return user;
            });
            x= JSON.stringify(x);
            localStorage.setItem('users',x);
            this.props.history.push("/homefeeds")
        }else{
            alert("post must not be empty")
        }
    }
    componentWillReceiveProps(nextprops){
        this.setState({isloggedin:nextprops.isLoggedin})
    }

    componentWillMount(){
        console.log(this.props.isLoggedin);
        if(this.props.isLoggedin){
            this.setState({isloggedin:this.props.isLoggedin})
        }
    }

    getBase64(file) {
        return new Promise((resolve,reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    }
    imageUpload(e){
        const file = e.target.files[0];
        console.log((e.target.value).split('.').pop());
        this.getBase64(file).then((base64) => {
            if(this.state.image1=='') {
                this.setState({image1:''+base64});
            }else{
                this.setState({image2:''+base64})
            }
            if(this.state.image1 =='') {
                let e1 = '.' + (e.target.value).split('.').pop();
                this.setState({e1:e1});
            }else{
                let e2 = '.'+(e.target.value).split('.').pop();
                this.setState({e2:e2})
            }
            console.debug("file stored",base64);
        });
    };

    deleteimage1(){
        this.setState({image1:'',e1:''});
    }

    deleteimage2(){
        this.setState({image2:'',e2:''});
    }

    handleClick(event) {
        this.setState({ anchorEl: event.currentTarget });
    };
    handleClose(event){
        console.log(event.target.innerText);
        this.setState({ anchorEl: null ,privacy:{ShareType:event.target.innerText}});
    };


    render(){
        const { anchorEl } = this.state;
        const {classes} = this.props;
        if(!this.state.isloggedin){
            return(
                <Redirect to={'/signin'} />
            )
        }
        return(
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item style={{paddingLeft:325, paddingTop:1,fontSize:19}} xs={4}>
                        <p>Share Type:</p>
                    </Grid>
                    <Grid item xs={8} >
                        <Button
                            style={{background:"#c9a78b", position:"relative",paddingLeft:15}}
                            aria-owns={anchorEl ? 'simple-menu' : null}
                            aria-haspopup="true"
                            onClick={this.handleClick}>
                            {this.state.privacy.ShareType||'select'}
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}>
                            <MenuItem primaryText={"private"} onClick={this.handleClose}>Private</MenuItem>
                            <MenuItem primaryText={"public"} onClick={this.handleClose}>Public</MenuItem>
                        </Menu>
                    </Grid>
                    <Grid item style={{paddingLeft:355, paddingTop:1,fontSize:19}} xs={4}>
                        <p>Content:</p>
                    </Grid>
                    <Grid item xs={8}>
                        <textarea style={{height:100, width:200, borderRadius:5}}
                                  ref='post'
                                  onChange={(event)=>{
                                      this.setState({post:event.target.value});
                                  }}
                        />
                    </Grid>
                    <Grid item style={{paddingLeft:320, paddingTop:1,fontSize:19}}
                          xs={4}><label for="file">Attachments:</label></Grid>
                    <Grid item xs={3}>
                        {this.state.image1?
                            <div><img height="250" width="250" src={this.state.image1}/>
                                <IconButton
                                    onClick={this.deleteimage1.bind(this)}
                                    className={classes.button} aria-label="Delete">
                                    <DeleteIcon />
                                </IconButton></div>
                            :<input
                                type="file"
                                id="imageFile1"
                                name='imageFile1'
                                onChange={this.imageUpload} />}
                    </Grid>
                    <Grid item xs={3}>
                        {this.state.image2?
                        <div><img height="250" width="250" src={this.state.image2}/>
                            <IconButton
                                onClick={this.deleteimage2.bind(this)}
                                className={classes.button} aria-label="Delete">
                            <DeleteIcon />
                        </IconButton></div>
                        :<input
                                type="file"
                                id="imageFile2"
                                name='imageFile2'
                                onChange={this.imageUpload} />}
                    </Grid>
                    <Grid item xs={12} style={{paddingLeft:500}}>
                        <Button style={{background:"#63c1d8"}} onClick={this.handlePost.bind(this)} >Post
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withRouter(withStyles(styles)(PostFeed));