import React from 'react'
import Avatar from './Imgs/Photo.png'

import './css/MainPicture.css'
import './css/Personal-Info.css'

class Personal_info extends React.Component{

    constructor(props){
        super(props);

        this.SetId = props.setId;
        let pathPage = window.location.href;
        this.CurrUserId = props.currentUserID;

        this.buttonClickHandler = this.buttonClickHandler.bind(this);
        this.buttonClickChange = this.buttonClickChange.bind(this);
        this.buttonClickReChange = this.buttonClickReChange.bind(this);
        this.ChangeForm = this.ChangeForm.bind(this);

        this.state = {         
            countSubscribe: 0,
            name: "",
            surname: "",
            instrument: "",
            sex: "",
            phone: "",
            describe: "",
            age: "",
            pathImg: "t",
            IsGuestPage: false,
            textSubscribe: 'Subscrime',
            IsChangeForm: false,
            changeTextBut: 'Change form',
            changeFunc: this.buttonClickChange
        }
       

    }
    componentDidMount(){
        let pathPage = window.location.href;
        let idUser;
      if(pathPage.lastIndexOf('id=') < pathPage.lastIndexOf('/'))
      {
        idUser = pathPage.substring(pathPage.lastIndexOf('id=') + 3, pathPage.lastIndexOf('/'));
      }
      else
      {
        idUser =  pathPage.substring(pathPage.lastIndexOf('id=') + 3,pathPage.length);
      }
      if(pathPage.includes("id") == false){
          idUser = this.CurrUserId;
      }
    if(pathPage.includes('isGuest') == false){
        if(this.CurrUserId == -1){
            this.SetId(idUser);
        }
        if(this.CurrUserId != -1 && idUser.length == 0){
            idUser =  this.CurrUserId;
        }
    }       
        fetch(`https://localhost:44317/api/users/${idUser}`)
        .then(res => res.json())
        .then(
            data => {
                this.setState({
                    countSubscribe: 0,
                    name: data.name,
                    surname: data.surname,
                    instrument: data.instrument,
                    sex: data.sex,
                    phone: data.phone,
                    age: data.age,
                    describe: data.describe,
                })  
            },
            error => {
                if(this.id != -1)
                {
                    alert("operation failed, call support");
                }
            }
        )
        let idUserG = pathPage.substring(pathPage.lastIndexOf('isGuest=') + 8, pathPage.length);
        let idUserM = pathPage.substring(pathPage.lastIndexOf('id=') + 3, pathPage.lastIndexOf('/'));


          fetch(`https://localhost:44317/api/users/${idUserM}/${idUserG}/2/2`)
          .then(res => res.text())
          .then(
              data => {
                  if(data == 0){                
                    this.setState({                     
                        textSubscribe: 'Subscrime'
                    })
                }
                else{
                    this.setState({                     
                        textSubscribe: 'Unubscrime'
                    })                    
                }
                this.setState((prevState) => {     
                    prevState.countSubscribe = data;           
                    return {
                        prevState
                    }
                });          
              },
              error => {
                      alert("operation failed, call support");
              }
          )
          fetch(`https://localhost:44317/api/users/${idUserM}/${idUserG}/2/2/2`)
          .then(res => res.text())
          .then(
              countSubscribe => {                                 
                this.setState((prevState) => {     
                    prevState.countSubscribe = countSubscribe;           
                    return {
                        prevState
                    }
                });          
              },
              error => {
                      alert("operation failed, call support");
              }
          )
        
        if(pathPage.includes("isGuest")){
            this.setState((prevState) => {
                prevState.IsGuestPage = true;
                return {
                    prevState
                }
            });
        }
        else{
            this.setState((prevState) => {
                prevState.IsGuestPage = false;
                return {
                    prevState
                }
            });
        }
        fetch('https://localhost:44317/api/users/fsd/1/2/3/4/5/6').
        then(res => res.blob()).
        then(
            picture =>{
               let url = window.URL;
               let imageSrc = url.createObjectURL(picture);   
                this.setState((prevState) => {

                    prevState.pathImg = imageSrc;
                    return {
                        prevState
                    }
                });
            },
            error => {
               alert('Load picture is failed');
            }
        )
    }
    buttonClickHandler(){
        let pathPage = window.location.href;
        let idUser = pathPage.substring(pathPage.lastIndexOf('isGuest=') + 8, pathPage.length);
        let idUserM = pathPage.substring(pathPage.lastIndexOf('id=') + 3, pathPage.lastIndexOf('/'));

        fetch(`https://localhost:44317/api/users/${idUserM}/${idUser}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
          }).then(res => res.text())
          .then(
              idUser => {
                this.setState((prevState) => {
                    if(this.state.countSubscribe > idUser){
                    this.setState({                     
                        textSubscribe: 'Subscrime' 
                    }) 
                  }
                  else{
                      this.setState({                     
                          textSubscribe: 'Unubscrime'
                      }) 
                  }
                    return {
                        countSubscribe: idUser,
                    }
                });          
              },
              error => {
                  alert("operation failed, call support");
              }
        )       
    }

    buttonClickChange(obj){
        this.setState((prevState) => {
            prevState.IsChangeForm = true;
            prevState.changeTextfunc = 'Save form';
            prevState.changeFunc = this.buttonClickReChange;
            return {
                prevState
            }
        });
    }

    buttonClickReChange(obj){  
            this.setState((prevState) => {
                prevState.IsChangeForm = false;
                prevState.changeTextfunc = 'Change form';
                prevState.changeFunc = this.buttonClickChange;
                return {
                    prevState
                }
            });

            let pathPage = window.location.href;
            let idUser;
            if(pathPage.lastIndexOf('id=') < pathPage.lastIndexOf('/'))
            {
                idUser = pathPage.substring(pathPage.lastIndexOf('id=') + 3, pathPage.lastIndexOf('/'));
            }
            else
            {
                idUser =  pathPage.substring(pathPage.lastIndexOf('id=') + 3,pathPage.length);
            }
            if(pathPage.includes("id") == false){
                idUser = this.CurrUserId;
            }

            idUser = parseInt(idUser);
           
            let user = {
                id: idUser,
                Login: ' ',
                Password: ' ',
                Name: this.state.name,
                SurName: this.state.surname,
                Instrument: this.state.instrument,
                Sex: this.state.sex,
                Phone: this.state.phone,
                Age: this.state.age,
                Describe: this.state.describe
              };                         
                fetch('https://localhost:44317/api/users', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(user)
              }).then(res => res.text())
              .then(
                  idUser => {
                    if(idUser > 0){          

                    }
                    else{
                        alert("Error call support");
                    }                    
                  },
                  error => {
                    alert("operation failed, call support");
                  }
              )    
        }

        ChangeForm(event){
 
            this.setState((prevState) => {
                if(event.target.id == "Name"){
                    prevState.name = event.target.value;
                }
                else if(event.target.id == "SurName"){
                    prevState.surname = event.target.value;
                }
                else if(event.target.id == "Instrument"){
                    prevState.instrument = event.target.value;
                }
                else if(event.target.id == "Sex"){
                    prevState.sex = event.target.value;
                }
                else if(event.target.id == "Phone"){
                    prevState.phone = event.target.value;
                }
                else if(event.target.id == "Age"){
                    prevState.age = event.target.value;
                }
                else if(event.target.id == "Describe"){
                    prevState.describe = event.target.value;
                }
                 return {
                    prevState
                }
            });
        }

    render(){
        if(this.state.IsGuestPage == true){
            return(
                <div id="personal-info">
                    <div>
                        <span>Name: </span><p class="PersInfo" id="Name">{this.state.name}</p>
                    </div>
                    <div>
                        <span>SurName: </span><p class="PersInfo" id="SurName">{this.state.surname}</p>
                    </div>
                    <div>
                        <span>Instrument: </span><p class="PersInfo" id="Instrument">{this.state.instrument}</p>
                    </div>
                    <div>
                        <span>Sex: </span><p class="PersInfo" id="Sex">{this.state.sex}</p><br/>
                    </div>
                    <div>
                        <span>Phone: </span><p class="PersInfo" id="Phone">{this.state.phone}</p><br/>
                    </div>
                    <div>
                        <span>Age:</span><p class="PersInfo" id="Age">{this.state.age}</p><br/>
                    </div>
                    <div>
                        <span>My describe:</span><p class="PersInfo" id="Describe">{this.state.describe}</p><br/>
                    </div>                
                    <div>
                        <button onClick={this.buttonClickHandler}>{this.state.textSubscribe}</button>
                        <span id="countSubscribe">   {this.state.countSubscribe}</span>
                    </div>
                </div>
            )
        }
        else if(this.state.IsChangeForm){
            return(
                <div>
                    <img id="Avatar" src={Avatar} alt={"avatar"}></img>               
                    <div id="personal-info">                
                        <div>
                            <span>Name:</span> <input type="text" value={this.state.name} onChange={this.ChangeForm} class="inptChange" id="Name"/>
                        </div>
                        <div>
                            <span>SurName: </span><input type="text" value={this.state.surname} onChange={this.ChangeForm} class="inptChange" id="SurName"/>
                        </div>
                        <div>
                            <span>Instrument: </span><input type="text" value={this.state.instrument} onChange={this.ChangeForm} class="inptChange" id="Instrument"/>
                        </div>
                        <div>
                            <span>Sex: </span><input type="text" value={this.state.sex} onChange={this.ChangeForm} class="inptChange" id="Sex"/>
                        </div>
                        <div>
                            <span>Phone: </span><input type="text" value={this.state.phone} onChange={this.ChangeForm} class="inptChange" id="Phone"/>
                        </div>
                        <div>
                            <span>Age:</span><input type="text" value={this.state.age} onChange={this.ChangeForm} class="inptChange" id="Age"/>
                        </div>
                        <div>
                            <span>My describe:</span><input type="text" value={this.state.describe} onChange={this.ChangeForm} class="inptChange" id="Describe"/>
                        </div>
                        <button onClick={this.state.changeFunc} id="changeForm">{this.state.changeTextBut}</button>
                    </div>
                </div>
            )
        }
        else
        {    
        return(
            <div>
              <img id="Avatar" src={this.state.pathImg}  alt={"avatar"}></img>     
              <p>{this.pathImg}</p>
                <div id="personal-info">                  
                    <div>
                        <span>Name: </span><p class="PersInfo" id="Name">{this.state.name}</p>
                    </div>
                    <div>
                        <span>SurName: </span><p class="PersInfo" id="SurName">{this.state.surname}</p>
                    </div>
                    <div>
                        <span>Instrument: </span><p class="PersInfo" id="Instrument">{this.state.instrument}</p>
                    </div>
                    <div>
                        <span>Sex: </span><p class="PersInfo" id="Sex">{this.state.sex}</p><br/>
                    </div>
                    <div>
                        <span>Phone: </span><p class="PersInfo" id="Phone">{this.state.phone}</p><br/>
                    </div>
                    <div>
                        <span>Age:</span><p class="PersInfo" id="Age">{this.state.age}</p><br/>
                    </div>
                    <div>
                        <span>My describe:</span><p class="PersInfo" id="Describe">{this.state.describe}</p><br/>
                    </div>
                    <button onClick={this.state.changeFunc} id="changeForm">{this.state.changeTextBut}</button>
                </div>
            </div>
        )
    }
}
}
export default Personal_info;