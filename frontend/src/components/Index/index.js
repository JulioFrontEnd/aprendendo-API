import React from 'react';

import Dates from './dates';
import "./index.css";
export default class Index extends React.Component{
    state={
        value:[],
    }
    componentDidMount(){
        this.dateBind();
    }

    dateBind = async (values = "")=>{
        const item = await Dates.get(values);
        this.setState({value: item.data.names});
    }

    render(){
        return(
            <div className='index-container'>
                <h3>DADOS: </h3>
                <div>
                    <table className='index-table'>
                        
                        <thead>
                        <tr className='index-table-field index-table-main'>
                            <th className='index-table-value'>ID</th>
                            <th className='index-table-value'>NAME</th>
                            <th className='index-table-value'>CPF</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.value.map(i=>{
                            return(
                                
                                <tr className={`index-table-field ${((i.active === 1)?"":"Disable")}`} key={i.id}>
                                    <td className='index-table-value'>{i.id}</td>
                                    <td className='index-table-value'>{i.name}</td>
                                    <td className='index-table-value'>{i.cpf}</td>
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