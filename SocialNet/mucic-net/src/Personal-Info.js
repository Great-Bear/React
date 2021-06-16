import React from 'react'

import './css/Personal-Info.css'

class Personal_info extends React.Component{

    constructor(props){
        super(props);
       
        this.state = {         
            countSubscribe: 0,
            name: "",
            surname: "",
            instrument: "",
            sex: "",
            phone: "",
            describe: "",
            age: "",
            IsGuestPage: false,
            textSubscribe: 'Subscrime'
        }
        this.SetId = props.setId;
        this.CurrUserId = props.currentUserID;

        this.buttonClickHandler = this.buttonClickHandler.bind(this);
        this.buttonClickChange = this.buttonClickChange.bind(this);
        this.buttonClickReChange = this.buttonClickReChange.bind(this);
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
    

        if(this.CurrUserId == -1){
            this.SetId(idUser);
        }
        if(this.CurrUserId != -1 && idUser.length == 0){
            idUser =  this.CurrUserId;
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
                this.SetId(idUser);  
            },
            error => {
                if(this.id != -1)
                {
                   // alert("operation failed, call support");
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
              data2 => {                                 
                this.setState((prevState) => {     
                    prevState.countSubscribe = data2;           
                    return {
                        prevState
                    }
                });          
              },
              error => {
                      alert("operation failed, call support");
              }
          )
          /*fetch(`https://localhost:44317/api/users/${idUserM}/${idUserG}/2/2/2/2`)
          .then(res => res.blob())
          .then(
              data => {                                 
               console.log(data)      
               var reader = new FileReader();
               var objectURL = URL.createObjectURL(data);
               reader.readAsArrayBuffer(data); 
               alert(data.name);
              },
              error => {
                      alert("operation failed, call support");
              }
          )*/

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
        for(let item of document.getElementById("personal-info").children){
            for(let item2 of item.children){
                if(item2.nodeName == "P"){
                    let textItem = item2.textContent;
                    let idOld = item2.id;                 
                    item2.outerHTML = `<input type="text" value="${textItem}" class="inptChange" id="${idOld}"></input>`;
                }      
            }     
        }   
        document.getElementById("saveForm").hidden = false;
        document.getElementById("changeForm").hidden = true;
    }

    buttonClickReChange(obj){
            for(let item of document.getElementById("personal-info").children){
                for(let item2 of item.children){
                    if(item2.nodeName == "INPUT"){
                        let idOld = item2.id;
                        let textItem = item2.value;
                        item2.outerHTML = `<p id="${idOld}">${textItem}</p>`;
                    }         
                }  
            }   
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
                Name: document.getElementById("Name").textContent,
                SurName: document.getElementById("SurName").textContent,
                Instrument: document.getElementById("Instrument").textContent,
                Sex: document.getElementById("Sex").textContent,
                Phone: document.getElementById("Phone").textContent,
                Age: document.getElementById("Age").textContent,
                Describe: document.getElementById("Describe").textContent
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
             
            document.getElementById("saveForm").hidden = true;
            document.getElementById("changeForm").hidden = false;
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
        else
        {    
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
                    <button onClick={this.buttonClickChange} id="changeForm">Change form</button>
                    <button onClick={this.buttonClickReChange} hidden id="saveForm">Save form</button>
                </div>
        )
    }
    }
}
export default Personal_info;