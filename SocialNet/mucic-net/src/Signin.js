import React from 'react'
import {Redirect} from 'react-router-dom'
import './css/Signin.css'

class Signin extends React.Component{

    constructor(props){
        super(props);
        this.buttonClickHandler = this.buttonClickHandler.bind(this);
        this.state = {
         pathPage:"/UserPage/",
         isLogged:false,
        }
    }

    buttonClickHandler(event){
        event.preventDefault();
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
    else{
    return(           
        <main className="form-signin">
        <form>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput"  placeholder="name@example.com"/>
            <label for="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
            <input type="password" className="form-control"  id="floatingPassword" placeholder="Password"/>
            <label for="floatingPassword">Password</label>
            </div>

            <div className="checkbox mb-3">
            <label>
            <input type="checkbox" value="remember-me"/> Remember me
            </label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" onClick={this.buttonClickHandler}> Sign in</button>
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