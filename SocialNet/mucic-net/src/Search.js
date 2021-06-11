import React from 'react'
import Post from './Post.js'
import Nav from './Nav'
import './css/Content.css'

function Search(){
    return(
        <div>
            <div>
                <Nav/>
            </div>
            <div id="content">
                <Post/>
                <Post/>
            </div>
         </div>
    )
}

export default Search;