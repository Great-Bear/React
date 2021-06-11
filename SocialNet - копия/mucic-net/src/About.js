import React from 'react';
import Nav from './Nav'
import './css/UserPage.css'
import './css/Content.css'
import './css/Post.css'
class About extends React.Component{
    render(){
        return (
            <div>
                <div>
                    <Nav/>
                </div>
                <div>
                    <p>We are best site for music</p>
                </div>
              </div>
        )
    }
}
export default About;