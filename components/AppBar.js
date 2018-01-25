import React from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import ModeEditIcon from 'material-ui-icons/ModeEdit'
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { withRouter } from 'react-router-dom'

const styles =(theme)=>({
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    button: {
        margin: theme.spacing.unit,
    },
    signout: {
    color:"green",
    fontSize: 14,
}
});

class ButtonAppBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoggedin:false,
            isPostfeed:false
        };
        this.handleSignOut = this.handleSignOut.bind(this);
        this.createFeed = this.createFeed.bind(this);
    }

    showFeeds(){
        this.props.history.push('/homefeeds')
    }

    createFeed(){
        this.setState({isPostfeed:true});
        this.props.history.push("/postfeed")
    }

    handleSignOut(){
        localStorage.removeItem('currentuser');
        this.setState({isLoggedin:false} , ()=>{
            this.props.isLoggedout();
            this.props.history.push("/signin")
        });
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.isloggedin){
            this.setState({isLoggedin:true})
        }
    }

    componentWillMount(){
        let user = JSON.parse(localStorage.getItem('currentuser'));
        if(user&&user.isLoggedin){
            this.setState({isLoggedin:true});
        }else{
            this.setState({isLoggedin:false});
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root} color="default">
                <AppBar position="static" style={{background:"#198ea8",position: "fixed", top: 0,}}>
                    <Toolbar>
                        <Typography type="title" color="inherit" className={classes.flex}>
                            {!this.state.isLoggedin?
                                <div>Friendz</div>:
                                (!this.state.isPostfeed?
                                    <div>My Feeds</div>:
                                    <div>Post Feed</div>)
                                }
                        </Typography>
                        {this.state.isLoggedin?
                            <div><Button fab mini color="primary" aria-label="add" onClick={this.createFeed}
                                         className={classes.button}>
                            <ModeEditIcon />
                            </Button></div>:''}
                        <div className={classes.button}
                             style={{background:"#094bba",borderRadius:5}}>
                                <Button style={{color:"white"}} onClick={this.showFeeds.bind(this)}>
                                    Home Feeds
                                </Button>
                        </div>
                        {this.state.isLoggedin?
                            <div className={classes.button} style={{background:"#094bba",borderRadius:5}}>
                                <Button onClick={this.handleSignOut} style={{color:"white"}}>
                                    Sign out
                                </Button>
                            </div>:
                            (<div><Link style={{ textDecoration: 'none',}} to={"/signup"}>
                                <Button className={classes.button}
                                        style={{background:"#094bba",borderRadius:5,color:"white"}}>
                                Sign up
                            </Button></Link>
                            <Link style={{ textDecoration: 'none',}} to={"/signin"}>
                                <Button className={classes.button}
                                        style={{margin:3,background:"#094bba",borderRadius:5, color:"white"}}>
                                Login
                            </Button></Link></div>)}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ButtonAppBar));