import React from 'react';
import '../create/index.css';
import Dates from '../service';
export default class Update extends React.Component{
    state={
        value:'',
        valueRegex:"",
        valueCheck:true,
        message:"",
        input:'',
    }

    componentDidMount(){
        this.find();
    }

    find = ()=>{
        const {id} = this.props.match.params;
        Dates.get('/find/'+id).then(Response=>this.setState({
            value:Response.data.name,
            valueRegex:Response.data.cpf,
            valueCheck:((Response.data.active === 1)?true:false),
        }));
    }

    handleSubmit = async (e)=>{
        e.preventDefault();

        let name = await this.state.value;
        let cpf = await this.state.valueRegex;
        let active = await ((this.state.valueCheck)?1:0);
        let {id} = this.props.match.params;
        this.submit(name,cpf,active,id);

    }
    submit = (name,cpf,active,id)=>{
        Dates.patch('/update',{
            name:name,
            cpf:cpf,
            active:active,
            id:id,
        }).then((response)=>{
            this.setState({message:response.data.message});
            if(typeof response.data.error.name !== 'undefined'){
                this.setState({input:"name"});
            }else if(typeof response.data.error.cpf !== 'undefined'){
                this.setState({input:"cpf"});
            }else if(typeof response.data.error.active !== 'undefined'){
                this.setState({input:"cpf"});
            }
        });
    }
    invertValueCheck = ()=>{
        this.setState({valueCheck: !this.state.valueCheck})
    }
    handleChange = (event)=>{  
        this.setState({value:event.target.value});
    }
    handleChangeRegex = (event)=>{
        let regex = /^[0-9.-]+$/;
        if(regex.test(event.target.value)) {   
            this.setState({valueRegex: event.target.value});
            if(event.target.value.length === 4 || event.target.value.length === 8){
                let dot = this.state.valueRegex + ".";
                this.setState({valueRegex: dot});
            }
            
            if(event.target.value.length === 12){
                let line = this.state.valueRegex + "-";
                this.setState({valueRegex: line});
            }
        }else{
            if(event.target.value.length <= 1){
                this.setState({valueRegex: ""});
            }
        }  
    }
    clear = ()=>{
        this.setState({valueRegex: ""});
    }
    
    render(){
        return(
            <form onSubmit={this.handleSubmit} className='CreateForm'>
                <h3>ATUALIZE: </h3>
                
                <div className={'input '+((this.state.input === 'name')?'CreateError':'')}>
                    <label htmlFor='CreateName'>Nome: </label><br/>
                    <input type='text' placeholder='Nome' id='CreateName' onChange={this.handleChange} value={this.state.value} className="CreateField"/>
                </div>
                <div className={'input '+((this.state.input === 'cpf')?'CreateError':'')}>
                    <label htmlFor='CreateCPF'>CPF: </label><br/>
                    <input type='text' placeholder='CPF' id='CreateCPF' onChange={this.handleChangeRegex} value={this.state.valueRegex} maxLength='14' className="CreateField"/>
                    <button onClick={this.clear} className="CreateBtn">Reset</button>
                </div>
                <div className='input'>
                    <label htmlFor='CreateCheckBox'>Ativo? </label>
                    <input type='checkbox' id='CreateCheckBox' checked={this.state.valueCheck} onChange={this.invertValueCheck}/>
                </div>
                <input type='submit' value="Enviar" className="CreateBtn"/>
                <p className='CreateErrorMessage'>{this.state.message}</p>
            </form>
        );
    }
}