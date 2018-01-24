import React from 'react'
import { Redirect } from 'react-router-dom'

class HomeFeeds extends React.Component{
    constructor(props){
        super(props);
        this.state = {isLoggedin:false};
    }

    componentWillMount  (){
        let user = localStorage.getItem('currentuser');
        user = JSON.parse(user)
        if(user) {
            const {router} = this.context;
            console.log(router);
            if (user.isLoggedin) {
                this.setState({isLoggedin: true})
            } else {
                this.setState({isLoggedin: false})
            }
        }else{
            this.setState({isLoggedin:false});
        }
    }
    render(){
        return(
            <div>
                {(this.state.isLoggedin)? (<h1>Hi youre logged in</h1>)
                    : <Redirect to={"/signin"}/> }
            </div>
        )
    }
}
export default HomeFeeds;