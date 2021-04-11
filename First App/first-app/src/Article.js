import React from 'react'

function Article(){
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
            <p>{article.text}</p>
        </article>
    )
}
export default Article