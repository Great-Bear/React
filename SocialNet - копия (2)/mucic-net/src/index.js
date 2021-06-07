import React from 'react'
import ReactDOM from 'react-dom'

import About from './About'
import NotFound from './NotFound';
import UserPage from './UserPage'
import Signin from './Signin'
import SingUp from './SingUp'
import 'bootstrap/dist/css/bootstrap.min.css';

import './css/index.css'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

let idUser = -1;
function SetIdUser(id){
    idUser = id;
}

ReactDOM.render(
    <div>
       <BrowserRouter>
            <Switch>
                <Route exact path="/" component={()=> <Signin/> } />
                <Route exact path="/SingUp" component={()=> <SingUp/> } />
                <Route path="/about" children={()=><h2> <About/> </h2>} />  
                <Route path="/UserPage/:id?" children={()=> <UserPage SetId={SetIdUser}  currentUserID={idUser} />}  />                           
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
  
    </div>,
    document.getElementById('root')
)