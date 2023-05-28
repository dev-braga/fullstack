import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Clientes(){

    const [cli, setCli] = useState([])
    
    useEffect(() => {
        // PEgar api
        axios.get('https://localhost:7134/Cliente/')
        .then( res => {setCli(res.data); console.log(res.data)})
            
        .catch( err => console.error(err))
        
    }, [])

    const handleDelete = async(id) => {
        try{
            await axios.delete('https://localhost:7134/Cliente/'+ id)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div className="">
            <Navbar />
            <div className="d-flex vh-100 bg-dark justify-content-center align-items-center">
                <div className="bg-white rounded p-3">
                    <Link to="/create" className="btn btn-success">Add +</Link>
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Email</th>
                            <th scope="col">Opcoes</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                                cli.map( (data, i) => (
                                    <tr key={i}>
                                        <td>{data.nome}</td>
                                        <td>{data.email}</td>
                                        <td>
                                            <Link to={`update/${data.id}`} className="btn btn-warning">Editar</Link>
                                            <Link to="/clientes" className="btn btn-danger ms-2" onClick={e => handleDelete( data.id) }>Excluir</Link>
                                        </td>
                                    </tr>
                                ))
                        }
                        </tbody>
                        </table>
                </div>
            </div>
        </div>
    )
    
}

export default Clientes