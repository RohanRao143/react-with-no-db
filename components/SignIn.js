import React , {Component} from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import {withRouter} from 'react-router-dom';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    },
    root: {
        flexGrow: 1,
    },
});


class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
            isLoggedin:false
        };
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(){
        let users = localStorage.getItem('users');
        users = JSON.parse(users);
        users.map((user)=>{
            if(user.email == this.state.username){
                if(user.password == this.state.password){
                    this.state.isLoggedin = true;
                }
            }
        });
        let currentuser = JSON.stringify(this.state);
        localStorage.setItem('currentuser', currentuser);
        if(this.state.isLoggedin){
            this.props.isLoggedin();
            this.props.history.push("/homefeeds");
        }
    }
    handleUsernameChange(event){
        this.setState({username:event.target.value});
    }
    handlePasswordChange(event){
        this.setState({password:event.target.value});
    }
    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">
                <Grid container justify="center">
                    <Grid item xl={12} justify="center">
                        <TextField
                        id="username"
                        label="Username"
                        className={classes.textField}
                        type="text"
                        autoComplete="current-text"
                        margin="normal"
                        onChange={this.handleUsernameChange}
                         />
                </Grid>
                    <Grid item xs={12} container justify="center">
                        <TextField
                            id="password"
                            label="Password"
                            className={classes.textField}
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            onChange={this.handlePasswordChange}
                        />
                    </Grid><br/>
                    <Grid item xs={12} container justify="center">
                        <Button className={classes.button} onClick={this.handleSubmit} >Sign In</Button>
                    </Grid>
                </Grid>
            </form>
        )
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(SignIn))