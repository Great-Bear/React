import React from 'react'

function Article(props){

    let {articleData: article1} = props;


    let article ={
        title: "React",
        text: "React is very good think"
    }
    let articleStyles = {
        color: 'blue',
        border: '1px black solid'
    }

    return(
        <article style={articleStyles}>
            <h1>{article.title}</h1>
            <p>{article.text.substr(0,15)}</p>
            <button onClick={()=>{console.log('clicked')}}>Text open</button>
        </article>
    )
}
export default Article