import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import {withStyles} from 'material-ui/styles'
import red from 'material-ui/colors/red';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import Image from './images';
import Grid from 'material-ui/Grid';


const styles = theme => ({
    card: {
        maxWidth: 600,
        margin:15,
        marginLeft:"auto",
        marginRight:"auto",
    },
    media: {
        height: 194,
    },
    actions: {
        display: 'flex',
    },
    avatar: {
        backgroundColor: red[500],
    },
});

class HomeFeeds extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username:'',
            isLoggedin:false,
            posts:[],
            image:Image.imageData
        };
    }

    componentWillMount  (){
        let user = JSON.parse(localStorage.getItem('currentuser'));
        if(user) {
            if (user.isLoggedin) {
                this.setState({isLoggedin: true})
            } else {
                this.setState({isLoggedin: false})
            }
        }else{
            this.setState({isLoggedin:false});
        }
        let users = JSON.parse(localStorage.getItem('users'));
        let posts = users.map((person)=>{
            if(user.username==person.email && user.password==person.password){
                this.setState({username:(person.firstname+' '+person.lastname)});
                return person;
            }
        });
        posts = posts[0];
        posts = posts.posts;
        posts.map((post)=>{
            let x={};
            x.images = [];
            if(post.images[0].image){
                x.images.push(post.images[0].image);
            }
            if(post.images[1].image){
                x.images.push(post.images[0].image);
            }
            x.content = post.post;
            x.shareType = post.share;
            x.time = post.time;
            this.state.posts.push(x);
         });
        console.log(this.state)
    }

    render(){
        let { classes } = this.props;
        if(!this.state.isLoggedin){
            return(
                <Redirect to={"/signin"}/>
            )
        }
        let { posts } = this.state;
        return(
            <div>
                { posts.map((post,i)=>{
                    return <Card key={i} className={classes.card}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="Recipe" className={classes.avatar}>
                                    {this.state.username[0]}
                                </Avatar>
                            }
                            action={
                                <IconButton>
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={this.state.username}
                            subheader={post.time||"September 14, 2016"}
                        />
                        <CardContent>
                            <Typography component="p">
                                {post.content}
                            </Typography>
                        </CardContent>
                        {post.images.length!=0?<CardMedia
                            className={classes.media}
                            image= {this.state.image}
                            title="Contemplative Reptile"
                        >
                            <Grid container spacing={24}>
                                {post.images.map((image)=>{
                                    if(post.images.length==2){
                                        return <Grid item justify="center" xs={6} >
                                            <img height="250" width="290" src={image}/>
                                        </Grid>
                                    }else if(post.images.length==1){
                                        return<Grid item style={{paddingLeft:20}} xs={12}>
                                            <img height="280" width="580" src={image} />
                                            </Grid>
                                    }else{}
                                })}
                            </Grid>
                            {console.log(post.images)}
                        </CardMedia>:''}
                        {post.images.length>0?<div  style={{marginTop:90}}>
                            <CardActions className={classes.actions} disableActionSpacing>
                                <IconButton aria-label="Add to favorites">
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="Share">
                                    <ShareIcon />
                                </IconButton>
                            </CardActions>
                        </div>: <CardActions className={classes.actions} disableActionSpacing>
                                <IconButton aria-label="Add to favorites">
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="Share">
                                    <ShareIcon />
                                </IconButton>
                            </CardActions>}
                    </Card>
                })}
            </div>
        )
    }
}

HomeFeeds.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeFeeds);