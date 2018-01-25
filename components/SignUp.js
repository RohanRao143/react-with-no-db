import React , {Component} from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

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


class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname:'',
            lastname:'',
            email:'',
            phone:'',
            password:'',
            confirmpassword:''
        };

        this.submitData = this.submitData.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    }

    submitData(){
        let user = this.state;
        if(user.firstname==''||user.lastname==''||user.email==''||user.phone==''||
            user.password==''||user.confirmpassword==''){
            alert('Fields cannot be empty');
            return false;
        }
        if(user.password!=user.confirmpassword){
            alert("password should match with confirm password");
        }
            if (localStorage.getItem('users')) {
                let users = localStorage.getItem('users');
                users = JSON.parse(users);
                let newUser = localStorage.getItem('formData');
                users.push(JSON.parse(newUser));
                users = JSON.stringify(users);
                localStorage.setItem('users', users);
            } else {
                let newUser = JSON.parse(localStorage.getItem('formData'));
                let users = new Array();
                users.push(newUser);
                users = JSON.stringify(users);
                localStorage.setItem('users', users);
        }

    }
    handleFirstNameChange(event){
        this.setState({firstname:event.target.value}, ()=>{
            localStorage.setItem('formData', JSON.stringify(this.state));
        })
    }

    handleLastNameChange(event){
            this.setState({lastname:event.target.value}, ()=>{
                localStorage.setItem('formData', JSON.stringify(this.state));
            })
        }
    handlePhoneChange(event){
        this.setState({phone:event.target.value}, ()=>{
            localStorage.setItem('formData', JSON.stringify(this.state));
        })
    }
    handleEmailChange(event){
        this.setState({email:event.target.value}, ()=>{
            localStorage.setItem('formData', JSON.stringify(this.state));
        })
    }
    handlePasswordChange(event){
        this.setState({password:event.target.value}, ()=>{
            localStorage.setItem('formData', JSON.stringify(this.state));
        })
    }
    handleConfirmPasswordChange(event){
        this.setState({confirmpassword:event.target.value}, ()=>{
            localStorage.setItem('formData', JSON.stringify(this.state));
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <form className={classes.container} noValidate autoComplete="off">
                <Grid container justify="center">
                <Grid item xl={12} container justify="center">
                        <TextField
                            id="firstname"
                            label="First Name"
                            className={classes.textField}
                            type="text"
                            autoComplete="current-text"
                            margin="normal"
                            onChange={this.handleFirstNameChange}
                        />
                    </Grid>
                    <Grid item xl={12} container justify="center">
                        <TextField
                            id="lastname"
                            label="Last Name"
                            className={classes.textField}
                            type="text"
                            autoComplete="current-text"
                            margin="normal"
                            onChange={this.handleLastNameChange}
                        />
                    </Grid>
                    <Grid item xl={12} container justify="center">
                        <TextField
                            id="mobilenumber"
                            label="Phone Number"
                            className={classes.textField}
                            type="number"
                            autoComplete="current-text"
                            margin="normal"
                            onChange={this.handlePhoneChange}
                        />
                    </Grid>
                    <Grid item xl={12} container justify="center">
                        <TextField
                            id="email"
                            label="Email Id"
                            className={classes.textField}
                            type="email"
                            autoComplete="current-text"
                            margin="normal"
                            onChange={this.handleEmailChange}
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
                    </Grid>
                    <Grid item xs={12} container justify="center">
                        <TextField
                            id="confirmpassword"
                            label="Confirm Password"
                            className={classes.textField}
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            onChange={this.handleConfirmPasswordChange}
                        />
                    </Grid>
                    <Grid item xs={12} container justify="center">
                        <Button className={classes.button} onClick={this.submitData} >Sign Up</Button>
                    </Grid>
                </Grid>
            </form>
        )
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp)