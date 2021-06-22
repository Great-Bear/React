import React from 'react'
import Nav from './Nav'
import {Redirect} from 'react-router-dom'
import './css/Search.css'
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
class Search extends React.Component{

    constructor(props){
        super(props);   
        this.state = {
            GoOtherPage: false,
            idGuestPage: undefined,
            users: undefined
        }
        this.GuestId = props.idUser;
        this.SearchButPress = this.SearchButPress.bind(this);
        this.ShowAllUsers = this.ShowAllUsers.bind(this);
        this.GoVisitPage = this.GoVisitPage.bind(this);
        this.ShowListUsers = this.ShowListUsers.bind(this);
        
    }

    SearchButPress(){
        let name = document.getElementById('nameSearch').value;
        let surName = document.getElementById('surNameSearch').value;
        
        if(name.length == 0){
            name = 'f';
        }
        if(surName.length == 0){
            surName = 'f';
        }
        fetch(`https://localhost:44317/api/users/${name}/${surName}/2`)
       .then(res => res.json())
        .then(
            data => {  
                console.log(data)   
                if(data.length == 1){
                    this.setState((prevState) => {     
                        prevState.GoOtherPage = true;
                        prevState.idGuestPage = data[0].id;
                        return {
                            prevState
                        }
                    });    
                }          
                else if(data.length != 0){
                    this.ShowListUsers(data);
                }               
                else{
                    alert('Unreal User');
                }
                    

            },
            error => {             
                alert("error");
            }
        )   
    }
    ShowAllUsers(){
        fetch(`https://localhost:44317/api/users/`)
        .then(res => res.json())
        .then(
            data => {
                this.ShowListUsers(data);
            },
            error => {
            }
        )
    }
    ShowListUsers(data){
        for(let userId in data){              
            if(data[userId].id == this.GuestId){                     
                delete data[userId];
                break;
            }
        }
        this.setState((prevState) => {     
            prevState.users = data.map((user) => 
            <li> 
                <img className="imgListUser"/>
                <a href="#" id={user.id} onClick={this.GoVisitPage}>{user.name + ' ' + user.surname}</a>
            </li>);  
            return {
                prevState
            }
        });    
    }
    GoVisitPage(event){
        this.setState(()=>{   
            return{
                GoOtherPage: true,
                idGuestPage: event.target.id
            }      
        })
    }
    render(){
        if(this.state.GoOtherPage == true){
            return(<Redirect to={{
                pathname: `/UserPage2/id=${this.state.idGuestPage}/isGuest=${this.GuestId}`
            }}/>)
        }
        return( 
                <div>
                    <div>
                        <Nav/>
                    </div>
                    <div id="SearchBock">
                    <div className="form-floating">
                        <label for="nameSearch">Name user</label>
                        <input type="email" className="form-control" id="nameSearch"  placeholder="Enter name user for search"/>                                       
                    </div>

                    <div className="form-floating">
                        <label for="surNameSearch">SurName</label>
                        <input type="email" className="form-control" id="surNameSearch"  placeholder="Enter name SurUser for search"/>                                       
                    </div>

                    <button id="SearchBut" onClick={this.SearchButPress}>Search</button>
                    <button onClick={this.ShowAllUsers}>All</button>                
                    </div>   
                    <div id="ListUsers">
                        <ul >{this.state.users}</ul>
                    </div>                
                    
                </div>        
        )
    }
}

export default Search;