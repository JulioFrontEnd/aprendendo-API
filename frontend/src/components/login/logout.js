import React from 'react';
export default class Logout extends React.Component{
    componentDidMount(){
        setTimeout(()=>
            window.location.href = "/",
        5000);
        localStorage.clear();
    }
    render(){
        return(
            <div>
                <h1>VOCÊ ESTÁ SENDO REDIRECIONADO PARA A PAGINA INICIAL...</h1>
            </div>
        );
            
        
    }
}
