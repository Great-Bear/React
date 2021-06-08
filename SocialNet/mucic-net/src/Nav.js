import React from 'react';
import {NavLink} from 'react-router-dom'
import './css/Nav.css'



class Nav extends React.Component{

    constructor(props){
        super(props);   
    }

    render(){
        
        return <nav class="list-group">
                <ul  class="nav nav-tabs">
                   <li class="nav-item"><NavLink to="/" activeClassName="active">
                   <span class="nav-link">Sign in</span></NavLink>
                   </li> 
                   <li class="nav-item"><NavLink to="/SingUp/" activeClassName="active">
                       <span class="nav-link" aria-current="page">SingUp</span></NavLink>
                    </li> 
                   <li class="nav-item"><NavLink to="/about" activeClassName="active">
                       <span class="nav-link" >About Site</span></NavLink>
                    </li>  
                    <li class="nav-item"><NavLink to="/UserPage/" activeClassName="active">
                       <span class="nav-link" aria-current="page" >Home</span></NavLink>
                    </li>                   
                </ul>
              </nav>;
    }
}

export default Nav;