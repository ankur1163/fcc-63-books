import React from 'react'
import ReactDOM from 'react-dom'

import Home from './components/layout/Home.js'
import Allbooks from './components/layout/Allbooks.js'
import Mybooks from './components/layout/Mybooks.js'
import Allmemberbooks from './components/layout/Allmemberbooks.js'
import Totalbooks from './components/layout/Totalbooks.js'
import Recievedrequests from './components/layout/Recievedrequests'
import Sentrequests from './components/layout/Sentrequests'
import settings from './components/layout/Allsettings'
import Login from './Login/Login.js'


import Waste from './Login/Waste.js'

//import    Polldetail from './components/layout/Polldetail.js'; // testing different Poll details


import Container from './components/containers/Container.js';


import {Route,Router,browserHistory,hashHistory,IndexRoute} from 'react-router'
//import makeMainRoutes from './components/routes'
import AuthService from './utils/AuthService'

//this cause error
//<Route path="allmemberbooks" component={Allmemberbooks}  />
//end

//<Route path="allbooks" component={Allmemberbooks} />
//<Route path="mybooks" component={Mybooks} />
//<Route path="allbooks" component={Allmemberbooks} />
//<Route path="allmemberbooks" component={Allmemberbooks}  />
//<Route path="totalbooks" component={Totalbooks} />

const mountNode = document.getElementById('root');
const auth = new AuthService('Y8j6dAVuNQD6lBLsJ4hiS6ajdfDJvdEG', 'app1163.auth0.com');

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' }) 
  }
}


ReactDOM.render( <Router history={browserHistory}>
    <Route path="/" component={Container} auth={auth}>
    
    <IndexRoute component={Allbooks} />
    <Route path="mybooks" component={Mybooks} onEnter={requireAuth}/>
    
    <Route path="totalbooks" component={Totalbooks} onEnter={requireAuth}/>
    <Route path="rrequests" component={Recievedrequests} onEnter={requireAuth}/>
    <Route path="srequests" component={Sentrequests} onEnter={requireAuth}/>
    <Route path="settings" component={settings} onEnter={requireAuth}/>
    <Route path="login" component={Login} />
    
    
     </Route>
    
    
    
  </Router>,mountNode);