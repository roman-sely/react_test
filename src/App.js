import React from 'react';
import SignIn from './Components/Login/index';
import Main from './Components/Main';
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { getIsLogin } from './helpers/index'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.customHistory = createBrowserHistory();
  }

  render() {
    return (
      <Router history={this.customHistory}>
        <Switch>
          <Route exact path='/login' component={SignIn} />
          <WithLogin>
          <Route exact path='/' component={Main} />
          </WithLogin>
        </Switch>
      </Router>
    )
  }
}

const WithLogin = ({children}) => {
  if (getIsLogin()) {
    return children;
  }
  return <Redirect to="/login"/>;
};

export default App;
