import React from 'react';
import ButtonAppBar from './components/AppBar'
import { HashRouter,Route, browserHistory, Switch } from 'react-router-dom'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp'
import HomeFeeds from './components/HomeFeeds';
import PostFeed from './components/PostFeed'

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentuser:{isLoggedin:false}
        };
        this.isLoggedin = this.isLoggedin.bind(this);
        this.isLoggedout = this.isLoggedout.bind(this);
    }

    isLoggedin(){
        this.setState({currentuser:{isLoggedin:true}});
    }

    isLoggedout(){
        this.setState({currentuser:{isLoggedin:false}});
    }

    componentWillMount(){
        let currentuser = JSON.parse(localStorage.getItem('currentuser'));
        if(currentuser&&currentuser.isLoggedin){
            this.setState({currentuser:{isLoggedin:true}});
        }
    }
   render() {
      return (
         <div>
             <HashRouter history={browserHistory}>
                 <switch>
                     <ButtonAppBar isLoggedout={this.isLoggedout} isloggedin={this.state.currentuser.isLoggedin}/>
                     <Route exact path={"/"} component={HomeFeeds}/>
                 <Route path={"/signup"} component={SignUp}/>
                 <Route path={"/signin"} render={()=><SignIn isLoggedin={this.isLoggedin}/>} />
                     <Route path={"/homefeeds"} component={HomeFeeds}/>
                     <Route path={"/postfeed"} render={()=><PostFeed isLoggedin={this.state.currentuser.isLoggedin}/>}/>
                 </switch>
             </HashRouter>
         </div>
      );
   }
}
export default App;
