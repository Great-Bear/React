import React from 'react'
import MainPicture from './MainPicture'
import Personal_info from './Personal-Info'
import ReactDOM from 'react-dom'
import Content from './Content'
import Nav from './Nav'
import './css/UserPage.css'


function UserPage(props){

    return(
        <div>
            <div>
                <Nav/>
            </div>
            <div id="userPage">           
                <MainPicture/>
                <Personal_info setId={props.SetId} currentUserID={props.currentUserID} />
                <Content/>
            </div>
        </div>
    )
}
export default UserPage;