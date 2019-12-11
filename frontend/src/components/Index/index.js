import React from 'react';
import {Link} from 'react-router-dom';
import Dates from './dates';
import Token from '../../token';
import "./index.css";
export default class Index extends React.Component{
    state={
        value:[],
        forDelete:[],
        deleteScreen:<div></div>,
        token:Token,
    }
    componentDidMount(){
        this.dateBind();
    }

    dateBind = async ()=>{
        const item = await Dates.post("",{
            api_token:this.state.token
        });
        this.setState({value: item.data.names});
    }
    delete = async (id)=>{
        const result = await this.state.value.find(result=>result.id === id);
        this.setState({forDelete:result});
        this.createDeleteScreen();
    }

    createDeleteScreen = ()=>{
        this.setState({
            deleteScreen:
            <div>
            <div className='index-delete-screen-after'></div>
            <div className="index-delete-screen">
            <h2 className='index-delete-title'>TEM CERTEZA?</h2>
            <div>
                <p><b>Nome:</b> {this.state.forDelete.name}</p>
                <p><b>CPF:</b> {this.state.forDelete.cpf}</p>
            </div>
            <div className='btn-flex'>
                <button onClick={this.realDelete} className='index-delete'>DELETAR</button>
                <button onClick={this.disable} className='index-disable'>DESABILITAR</button>
            </div>
            </div>
            </div>
        });
    }

    disable = async ()=>{
        const id = await this.state.forDelete.id;
        Dates.post('/disable/'+id,{api_token:this.state.token}).then(response=>{
            this.dateBind();
        });;
        
        this.setState({deleteScreen:<div></div>});
    }

    realDelete = async ()=>{
        const id = await this.state.forDelete.id;
        Dates.post('/delete/'+id,{api_token:this.state.token}).then(response=>{
            this.dateBind();
        });;
        
        this.setState({deleteScreen:<div></div>});
    }
    render(){
        return(   
            <div className='index-container'>
                
                {this.state.deleteScreen}
                <div className='index-bar'>
                    <h3>DADOS: </h3>
                    <div className='index-options'>
                        {((this.state.token === 'Not Logged')?<Link to='/login' className='index-add'>LOGIN</Link>:<Link to='/logout' className='index-add'>SAIR</Link>)}
                        <Link to="/add" className='index-add'>ADD</Link>
                    </div>
                </div>
                <div>
                    <table className='index-table'>
                        
                        <thead>
                        <tr className='index-table-field index-table-main'>
                            <th className='index-table-value'>ID</th>
                            <th className='index-table-value'>NAME</th>
                            <th className='index-table-value'>CPF</th>
                            <th className='index-table-value'></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.value.map(i=>{
                            return(
                                
                                <tr className={`index-table-field ${((i.active === 1)?"":"Disable")}`} key={i.id}>
                                    <td className='index-table-value'>{i.id}</td>
                                    <td className='index-table-value'>{i.name}</td>
                                    <td className='index-table-value'>{i.cpf}</td>
                                    <td className='index-table-value'><button onClick={()=>this.delete(i.id)} className='index-delete'>DELETAR</button><Link className='index-disable' to={'/update/'+i.id}>ALTERAR</Link></td>
                                </tr>
                                
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}