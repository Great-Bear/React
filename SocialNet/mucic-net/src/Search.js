import React from 'react'
import Nav from './Nav'
import {Redirect} from 'react-router-dom'
import './css/Search.css'

class Search extends React.Component{

    constructor(props){
        super(props);   
        this.state = {
            GoOtherPage: false,
            idGuestPage: undefined
        }
        this.GuestId = props.idUser;
        this.SearchButPress = this.SearchButPress.bind(this);
    }

    SearchButPress(){
        fetch(`https://localhost:44317/api/users/${document.getElementById('nameSearch').value}/${document.getElementById('surNameSearch').value}/2`)
       .then(res => res.text())
        .then(
            data => {              
                this.setState(()=>{   
                    alert(data); 
                    return{
                        GoOtherPage: true,
                        idGuestPage: data
                    }
                })
            },
            error => {             
                alert("error");
            }
        )
       
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
                    <div id="content">
                    <div className="form-floating">
                        <label for="nameSearch">Name user</label>
                        <input type="email" className="form-control" id="nameSearch"  placeholder="Enter name user for search"/>                                       
                    </div>

                    <div className="form-floating">
                        <label for="surNameSearch">SurName</label>
                        <input type="email" className="form-control" id="surNameSearch"  placeholder="Enter name SurUser for search"/>                                       
                    </div>

                    <button id="SearchBut" onClick={this.SearchButPress}>Search</button>
                    </div>
                </div>        
        )
    }
}

export default Search;