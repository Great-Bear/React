import React from 'react'
import Article from './Article'

import'./App.css'

function App(){
    let name = "React";

    let article1 ={
        title:"react",
        text: "dfsfdfsdf"
    }

    return (
         <div>
             <header>Header</header>
         <Article articleData={article1}/>
        </div>
    )
}

export default App;