import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import '../css/Modal.css'
import Navbar from "./Navbar"


function Containers(){

    const [containers, setContainers] = useState([])
    
    useEffect(() => {
        axios.get('https://localhost:7134/Container/')
        .then(res  => {
            setContainers(res.data)
        } )
        .catch(err => console.log(err))

    }, [])

    const handleDelete = async (id) => {
        try{
           await axios.delete('https://localhost:7134/Container/'+ id)
            window.location.reload()
        }catch(err){
            console.log("erro")
        }
    }
    return(
        <section className="vh-100 w-100">
            <Navbar />
            <div className="container d-flex flex-column justify-content-center align-items-center">
                <h1 className="m-5">Conteiners Cadastrados</h1>
            <table className="table table-striped table-bordered">
                    <thead className="thead-light">
                        <tr>
                        <th scope="col">Cliente</th>
                        <th scope="col">Numero</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Status</th>
                        <th scope="col">Categoria</th>
                        <th scope="col"> <Link to='/adicionarContainer/' className="btn btn-success">Adicionar Container +</Link></th>
                    </tr>
                    </thead>
                    <tbody>
                       
                        {
                            containers.map((result, id) => (
                                <tr key={id}>
                                <td>{result.cliente.nome }</td>
                                <td>{result.numeroConteiner}</td>
                                <td>{result.tipo}</td>
                                <td>{result.status}</td>
                                <td>{result.categoria}</td>
                                <td>
                                    <Link to={`/containers/editar/${result.id}`} className="btn btn-warning">Editar</Link>
                                    <Link to='/containers' className="btn btn-danger ms-2" onClick={e=> handleDelete( result.id )}>Excluir</Link>
                                </td>
                            </tr>
                        ))
                        }
                        
                    </tbody>
                </table>    
            </div>
        </section>
    )
}

export default Containers