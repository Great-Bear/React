import React from 'react'
import ReactDOM from 'react-dom'

import About from './About'
import NotFound from './NotFound';
import UserPage from './UserPage'
import UserPage2 from './UserPage2'
import Signin from './Signin'
import SingUp from './SingUp'
import Search from './Search'
import 'bootstrap/dist/css/bootstrap.min.css';

import './css/index.css'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

let idUser = -1;
function SetIdUser(id){
    idUser = id;
}

let idUser2 = -1;
function SetIdUser2(id){
    idUser2 = id;
}


let PreButton = undefined;
function SetPreButton(preButton){
    PreButton = preButton;
}

function ActiveButton(){
    if(PreButton != undefined)
    PreButton.className = 'nav-link active';
}

ReactDOM.render(
    <div>
       <BrowserRouter>
            <Switch>
                <Route exact path="/" component={()=> <Signin/> } />
                <Route exact path="/SingUp" component={()=> <SingUp/> } />
                <Route path="/about" children={()=><h2> <About SetPreButton={SetPreButton} ActiveButton={ActiveButton} /> </h2>} />  
                <Route path="/UserPage/:id?" children={()=> <UserPage SetId={SetIdUser}  currentUserID={idUser} />}  />
                <Route path="/UserPage2/:id?" children={()=> <UserPage2 SetId={SetIdUser2}  currentUserID={idUser2} />}/>            
                <Route path="/Search" children={()=> <Search idUser={idUser}/>}  />                                    
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
  
    </div>,
    document.getElementById('root')
)