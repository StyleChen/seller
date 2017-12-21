import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './login';
import Operate from './component/Operate';
import Business from './component/Business/Business';
class App extends Component {
  render() {
    return (
        <Router basename='/seller'>
          <div>
	          <Switch>
		          <Route exact path='/' component={Login}></Route>
		          <Route path='/Operate' component={Operate}></Route>
		          <Route path='/Business' component={Business}></Route>
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
