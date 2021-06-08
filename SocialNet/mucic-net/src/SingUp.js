import React from 'react';
import {Redirect} from 'react-router-dom'

class SingUp extends React.Component{

    constructor(props){
        super(props);
        this.buttonClickHandler = this.buttonClickHandler.bind(this);
        this.state = {
         pathPage:"/UserPage/",
         isLogged: false,
         UserId: -1
        }
    }

    buttonClickHandler(event){
        event.preventDefault();
        let pathServer = 'https://localhost:44317/api/users/';
        let login = document.getElementById("Login").value;
        let password = document.getElementById("Password").value;
        let name = document.getElementById("Name").value;
        let surName = document.getElementById("SurName").value;
        let instrument = document.getElementById("Instument").value;
        let sex = document.getElementById("Sex").value;
        let describe = document.getElementById("Describe").value;


        fetch(`${pathServer}${login}/${password}/${name}/${surName}/${instrument}/${sex}/${describe}`)
        .then(res => res.text())
        .then(
            idUser => {
                alert(idUser);
                if(idUser > 0){             
                    this.setState((preState)=>{    
                        return{
                            pathPage: preState.pathPage + idUser,
                            isLogged: true,
                            UserId: idUser
                        }
                    })
                }
                else{
                    alert("Such user still exist");
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
            pathname: this.state.pathPage
        }}/>)
    }
    else
    {
            return (
                <main className="form-signin">
            <form>
            <h1 className="h3 mb-3 fw-normal">Please sign Up</h1>

                <div className="form-floating">
                    <label for="Login">Email address</label>
                    <input type="text" className="form-control" id="Login"  placeholder="Login"/>           
                </div>

                <div className="form-floating">
                    <label for="Password">Password</label>
                    <input type="password" className="form-control"  id="Password" placeholder="Password"/>           
                </div>

                <div className="form-floating">
                    <label for="Name">Name</label>
                    <input type="text" className="form-control"  id="Name" placeholder="Name"/>           
                </div>

                <div className="form-floating">
                    <label for="SurName">SurName</label>
                    <input type="text" className="form-control"  id="SurName" placeholder="SurName"/>           
                </div>

                <div className="form-floating">
                    <label for="Instument">Instument</label>
                    <input type="text" className="form-control"  id="Instument" placeholder="Instument"/>           
                </div>

                <div className="form-floating">
                    <label for="Sex">Sex</label>
                    <select className="form-control" id="Sex">
                        <option>Male</option>
                        <option>Female</option>
                    </select>           
                </div>

                <div className="form-floating">
                    <label>Describe</label>
                    <br></br>
                    <textarea id="Describe"></textarea>
                </div>
                
                <button className="w-100 btn btn-lg btn-primary" onClick={this.buttonClickHandler}> Sign in</button>
                <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>       
            </form>
            </main>
            )
        }
    }
}
export default SingUp;