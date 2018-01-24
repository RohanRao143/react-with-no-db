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

    createFeed(){
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
                <AppBar position="static" style={{background:"#198ea8"}}>
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
                             style={{background:"#0000FF",borderRadius:5}}>
                            <Link style={{ textDecoration: 'none',}} to={"/homefeeds"}>
                                <Button><div style={{color:"white"}}>Home Feeds</div></Button>
                            </Link>
                        </div>
                        {this.state.isLoggedin?<div>
                            <div className={classes.button} style={{background:"#b25e64",borderRadius:5}}><Button onClick={this.handleSignOut}>Sign out</Button></div>
                        </div>:(<div><Link to={"/signup"}><Button>Sign up</Button></Link>
                            <Link to={"/signin"}><Button>Login</Button></Link></div>)}
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