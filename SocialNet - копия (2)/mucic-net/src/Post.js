import React from 'react'

import './css/Post.css'


function CLickHea(obj){

    return obj.textContent ="fsdsfd";
}

class Post extends React.Component{


    constructor(props){
        super(props);

        this.state = {
            countHearth: 0,
        }

        this.buttonClickHandler = this.buttonClickHandler.bind(this);
    }

    buttonClickHandler(){

        this.setState((prevState) => {
            prevState.countHearth++;
            return {
                countHearth: prevState.countHearth,
            }
        });

    }


render(){
    return(
        <div id="Post">
            <div id="imgsBlock">
                <img></img>
                <img></img>
                <img></img>
                <img></img>
            </div>
            <div id="contentPost">
                <p>Lorem</p>                            
                <div id="shareBlock">
                    <div id="likeBlock" className="Like" onClick={this.buttonClickHandler}>
                        <div id="like"></div> <span id="countHearth">{this.state.countHearth}</span>
                    </div>
                </div>   
            </div>                  
        </div>
    )
}
}

export default Post;