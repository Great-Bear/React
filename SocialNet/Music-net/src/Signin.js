import React from 'react'
import {Redirect} from 'react-router-dom'
import './css/Signin.css'

class Signin extends React.Component{

    constructor(props){
        super(props);
        this.buttonClickHandler = this.buttonClickHandler.bind(this);
        this.ClickSingUp = this.ClickSingUp.bind(this);
        this.state = {
         pathPage:"/UserPage/id=",
         isLogged:false,
         SingUp: false,
        }       
    }
    ClickSingUp(){
        this.setState((preState)=>{  
            return{
                SingUp: true,
            }         
        })
    }
    buttonClickHandler(event){
        event.preventDefault();


        let isInvalidForm = false;
        for(let item of document.getElementsByTagName('input')) {             
             if(item.value.length == 0 ){
                 isInvalidForm = true;  
                 if(item.previousElementSibling.className != 'errorMessage'){
                     let labelError = document.createElement('label');
                     labelError.textContent = 'Field must be filled';    
                     labelError.className = 'errorMessage';                
                     item.parentNode.insertBefore(labelError, item); 
                 }                                          
             }
             else{
                 if(item.previousElementSibling.className == 'errorMessage'){
                     item.previousElementSibling.remove();
                 }
             }
         }
         if(isInvalidForm){
             return;
         }
        
        fetch(`https://localhost:44317/api/users/${document.getElementById("floatingInput").value}/${document.getElementById("floatingPassword").value}`)
        .then(res => res.json())
        .then(
            user => {
               if(user.title == undefined){
                this.setState((preState)=>{  
                    return{
                        pathPage: preState.pathPage + user.id,
                        isLogged: true,
                    }
                   
                })
               
               }
               else{
                   alert("unreal user");
                   document.getElementById("floatingInput").value = "";
                   document.getElementById("floatingPassword").value = "";
               }

            },
            error => {
            alert("operation failed, call support");
            }
        )    
    }
render(){
    if(this.state.isLogged){
      return(<Redirect to={{
        pathname: `${this.state.pathPage}`,    
    }}/>)
    }
    else if(this.state.SingUp){
        return(<Redirect to={{
          pathname: `/SingUp`,    
      }}/>)
    }
    else{
    return(           
        <main className="form-signin">
        <form>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <div className="form-floating">
                <label for="floatingInput">Email address</label>
                <input type="email" className="form-control" id="floatingInput"  placeholder="name@example.com"/>               
            </div>

            <div className="form-floating">
                <label for="floatingPassword">Password</label>
                <input type="password" className="form-control"  id="floatingPassword" placeholder="Password"/>             
            </div>
           
            <button className="w-100 btn btn-lg btn-primary" onClick={this.buttonClickHandler}> Sign in</button>         
            <a href="#" onClick={this.ClickSingUp}>Sing Up</a>   
            <br/>
            <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>    
           
        </form>
        </main>
        )
    }
}
}
  export default Signin;





















  /*
  import React from 'react'

import './css/Signin.css'

function Form(){
    return(           
        <main className="form-signin">
        <form>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
            <label for="floatingPassword">Password</label>
            </div>

            <div className="checkbox mb-3">
            <label>
                <input type="checkbox" value="remember-me"/> Remember me
            </label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
        </form>
        </main>
    )
}

  export default Form;
  */