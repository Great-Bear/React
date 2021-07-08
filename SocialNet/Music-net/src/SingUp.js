import React from 'react';
import {Redirect} from 'react-router-dom'
import './css/SingUp.css'

class SingUp extends React.Component{

    constructor(props){
        super(props);
        this.buttonClickHandler = this.buttonClickHandler.bind(this);
        this.CheckValidForm = this.CheckValidForm.bind(this);
        this.SetId = props.SetId;
        this.SetId2 = props.SetId2;
        this.state = {
         pathPage:"/UserPage/id=",
         isLogged: false,
         UserId: -1,
         IsError : false,
         NameErrorM: '',
         SurNameError: '',
         EmailError: '',
         AgeError: '',
        }

    }

    buttonClickHandler(event){
        event.preventDefault();
   
        let user = {
            Login: document.getElementById("Login").value,
            Password: document.getElementById("Password").value,
            Name: document.getElementById("Name").value,
            SurName: document.getElementById("SurName").value,
            Instrument: document.getElementById("Instument").value,
            Sex: document.getElementById("Sex").value,
            Phone: document.getElementById("Phone").value,
            Age: document.getElementById("Age").value,
            Describe: document.getElementById("Describe").value
          };


        if(this.CheckValidForm(user)){
       
          fetch('https://localhost:44317/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
          }).then(res => res.text())
          .then(
              idUser => {
                  if(idUser > 0){             
                      this.setState((preState)=>{   
                        this.SetId(idUser); 
                        this.SetId2(idUser);
                          return{
                              pathPage: preState.pathPage + idUser,
                              isLogged: true,
                              UserId: idUser
                          }
                      })
                  }
                  else if(idUser == -1){
                    alert("Such login is busy");
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
    }

    CheckValidForm(user){
        let regName = /[a-zа-я]$/gi;
        let NameError;
        if(user.Name.length == 0){
            NameError = 'Length must be 1-32 symbol';
        }
        else if(!regName.test(user.Name)){
            NameError = "Must includes only letter";
        }
        else{
            NameError = '';
        }
        let SurNameError;
        if(user.SurName.length == 0){
            SurNameError = 'Length must be 1-32 symbol';
        }
        else if(!regName.test(user.SurName)){
          //  SurNameError = "Must includes only letter";
          SurNameError = '';
        }
        else{
            SurNameError = '';
        }

        let AgeError;
        if(user.Age > 99 || user.Age < 1){
            AgeError = 'Age must be 1-99';
        }
        else{
            AgeError = '';
        }

        let emailRe = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let emailError;
        if(!emailRe.test(user.Login)){
            emailError = "Incorrect email";
        }
        else{
            emailError = '';
        }
        this.setState((preState)=>{    
            preState.NameErrorM = NameError;
            preState.SurNameErrorM = SurNameError;
            preState.EmailError = emailError;
            preState.AgeError = AgeError;
            if(NameError.length > 0 || SurNameError.length > 0 || emailError.length > 0 || AgeError.length > 0){
                preState.IsError = true;
            }
            else{
                preState.IsError = false;
            }
            return{
                preState
            }
        })
        let isErrorLocal = false;
        if(NameError.length > 0 || SurNameError.length > 0 || emailError.length > 0 || AgeError.length > 0){
            isErrorLocal = true;
        }
        else{
            isErrorLocal = false;
        }

        return !isErrorLocal;
    }

render(){
    if(this.state.isLogged){
        return(<Redirect to={{
            pathname: this.state.pathPage
        }}/>)
    }
    else if(this.state.IsError){
        return (
            <main className="form-signin">
        <form>
        <h1 className="h3 mb-3 fw-normal">Please sign Up</h1>

            <div className="form-floating">
                <label for="Login">Email address</label> <label className="errorMessage">{this.state.EmailError}</label>
                <input type="text" className="form-control" id="Login" placeholder="Login"/>           
            </div>

            <div className="form-floating">
                <label for="Password">Password</label>
                <input type="password" className="form-control"  id="Password" placeholder="Password"/>           
            </div>

            <div className="form-floating">
                <label for="Name">Name</label> <label className="errorMessage">{this.state.NameErrorM}</label>
                <input type="text" className="form-control"  id="Name" placeholder="Name"/>           
            </div>

            <div className="form-floating">
                <label for="SurName">SurName</label> <label className="errorMessage">{this.state.SurNameErrorM}</label>
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
                <label for="Phone">Phone</label>
                <input type="text" className="form-control"  id="Phone" placeholder="Phone"/>           
            </div>

            <div className="form-floating">
                <label for="Age">Age</label> <label className="errorMessage">{this.state.AgeError}</label>
                <input type="text" className="form-control" id="Age" placeholder="Age"/>           
            </div>

            <div className="form-floating">
                <label>Describe</label>
                <br></br>
                <textarea id="Describe" className="form-control"></textarea>
            </div>           
            
            <button className="w-100 btn btn-lg btn-primary" onClick={this.buttonClickHandler}> Sign in</button>
            <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>       
        </form>
        </main>
        )
    }
    else
    {
            return (
                <main className="form-signin">
            <form>
            <h1 className="h3 mb-3 fw-normal">Please sign Up</h1>

                <div className="form-floating">
                    <label for="Login">Email address</label>
                    <input type="Login" className="form-control" id="Login" placeholder="Email address"/>           
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
                    <label for="Phone">Phone</label>
                    <input type="text" className="form-control"  id="Phone" placeholder="Phone"/>           
                </div>

                <div className="form-floating">
                    <label for="Age">Age</label>
                    <input type="text" className="form-control"  id="Age" placeholder="Age"/>           
                </div>

                <div className="form-floating">
                    <label>Describe</label>
                    <br></br>
                    <textarea id="Describe" className="form-control"></textarea>
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