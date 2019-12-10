import React from 'react';
import {Link} from 'react-router-dom';
import Dates from './dates';
import "./index.css";
export default class Index extends React.Component{
    state={
        value:[],
        forDelete:[],
        deleteScreen:<div></div>,
    }
    componentDidMount(){
        this.dateBind();
    }

    dateBind = async ()=>{
        const item = await Dates.get();
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
                <button onClick={this.realDelete} className='index-delete'>DELETAR</button>
            </div>
            </div>
            </div>
        });
    }
    realDelete = async ()=>{
        const id = await this.state.forDelete.id;
        console.log(id);
        Dates.delete('/delete/'+id).then(response=>{
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
                    <Link to="/add" className='index-add'>ADD</Link>
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
                                    <td className='index-table-value'><button onClick={()=>this.delete(i.id)} className='index-delete'>DELETAR</button></td>
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