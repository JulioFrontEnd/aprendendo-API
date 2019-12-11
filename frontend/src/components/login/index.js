import React from 'react';
import '../crud/create/index.css';
import Dates from '../crud/service/index';
export default class Login extends React.Component{
    state={
        value:'',
        valuePass:"",
        input:'',
    }
    handleSubmit = (e)=>{
        e.preventDefault();

        let user = this.state.value;
        let password= this.state.valuePass;

        this.submit(user,password);

    }
    submit = (user,password)=>{
        Dates.post('/login',{
            user:user,
            password:password,
        }).then((response)=>{
            this.setState({message:response.data.message});
            if(typeof response.data.error.password !== 'undefined'){
                this.setState({input:"password"});
            }
            
            if(response.data.token !== 'undefined'){
                localStorage.setItem('api_token',response.data.token);
                setTimeout(()=>
                    window.location.href = "/",
                1000);
            }
        });
    }
    handleChange = (event)=>{  
        this.setState({value:event.target.value});
    }
    handleChangeRegex = (event)=>{
        this.setState({valuePass:event.target.value});
    }
    
    render(){
        return (
            <form onSubmit={this.handleSubmit} className='CreateForm'>
                <h3>LOGIN: </h3>
                
                <div className='input'>
                    <label htmlFor='CreateName'>USUÁRIO: </label><br/>
                    <input type='text' placeholder='Nome' id='CreateName' onChange={this.handleChange} value={this.state.value} className="CreateField"/>
                </div>
                <div className={'input '+((this.state.input === 'password')?'CreateError':'')}>
                    <label htmlFor='CreateCPF'>SENHA: </label><br/>
                    <input type='password' placeholder='Senha' id='CreateCPF' onChange={this.handleChangeRegex} value={this.state.valueRegex} className="CreateField"/>
                </div>
                <input type='submit' value="Enviar" className="CreateBtn"/>
                <p className='CreateErrorMessage'>{this.state.message}</p>
            </form>
        );
    }
}