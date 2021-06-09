import React from 'react'

import './css/Personal-Info.css'

class Personal_info extends React.Component{

    constructor(props){
        super(props);
     
        this.state = {         
            countSubscribe: 0,
            name: "dataProfile.name",
            surname: "dataProfile.name",
            instrument: "dataProfile.name",
            sex: "dataProfile.name",
            describe: "dataProfile.name",
        }
        this.SetId = props.setId;
        this.CurrUserId = props.currentUserID;

        this.buttonClickHandler = this.buttonClickHandler.bind(this);
        this.buttonClickChange = this.buttonClickChange.bind(this);
        this.buttonClickReChange = this.buttonClickReChange.bind(this);
    }
    componentDidMount(){
        let pathPage = window.location.href;
        let idUser =  pathPage.substring(pathPage.lastIndexOf('/') + 1,pathPage.length);
    
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
                    describe: data.describe
                }) 
                this.SetId(idUser);  
            },
            error => {
                if(this.id != -1)
                {
                    //alert("operation failed, call support");
                }
            }
        )
    }
    buttonClickHandler(){

        this.setState((prevState) => {
            prevState.countSubscribe++;
            return {
                countSubscribe: prevState.countSubscribe,
            }
        });

    }

    buttonClickChange(obj){
        for(let item of document.getElementById("personal-info").children){
            for(let item2 of item.children){
                if(item2.nodeName == "P"){
                    let textItem = item2.textContent;
                    item2.outerHTML = `<input type="text" value="${textItem}" class="inptChange"></input>`;
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
                        let textItem = item2.value;
                        item2.outerHTML = `<p>${textItem}</p>`;
                    }         
                }  
            }   
            let pathPage = window.location.href;
            let idUser = pathPage.substring(pathPage.lastIndexOf('/') + 1,pathPage.length);
            idUser = parseInt(idUser);
            let user = {
                id: idUser,
                Login: 'document.getElementById("Login").value',
                Password: 'document.getElementById("Password").value',
                Name: '2222',
                SurName: 'document.getElementById("SurName").value',
                Instrument: 'document.getElementById("Instument").value',
                Sex: 'document.getElementById("Sex").value',
                Describe: 'document.getElementById("Describe").value'
              };
            let response = fetch('https://localhost:44317/api/users', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(user)
              }).then(res => res.text())
              .then(
                  idUser => {
                      alert(idUser);
                      if(idUser > 0){          
                          this.setState((prevState) => {
                            prevState.name = 'change';
                            return {
                                countSubscribe: 0,
                                name: "dataProfile.name",
                                surname: "dataProfile.name",
                                instrument: "dataProfile.name",
                                sex: "dataProfile.name",
                                describe: "dataProfile.name",
                            }
                        });
                        console.log(this.state);
                      }
                      else{
                          alert("Such user still exist");
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
        return(
                <div id="personal-info">
                    <div>
                        <span>Name: </span><p class="PersInfo">{this.state.name}</p>
                    </div>
                    <div>
                        <span>SurName: </span><p class="PersInfo">{this.state.surname}</p>
                    </div>
                    <div>
                        <span>Instrument: </span><p class="PersInfo">{this.state.instrument}</p>
                    </div>
                    <div>
                        <span>Sex: </span><p class="PersInfo">{this.state.sex}</p><br/>
                    </div>
                    <div>
                        <span>My describe:</span><p class="PersInfo">{this.state.describe}</p><br/>
                    </div>
                    <div>
                        <button onClick={this.buttonClickHandler}>Subscribe</button>
                        <span id="countSubscribe">   {this.state.countSubscribe}</span>
                    </div>
                    <button onClick={this.buttonClickChange} id="changeForm">Change form</button>
                    <button onClick={this.buttonClickReChange} hidden id="saveForm">Save form</button>
                </div>
        )
    }
}
export default Personal_info;