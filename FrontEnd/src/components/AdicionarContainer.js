import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Navbar from "./Navbar";

function AdicionarContainer(){
    
    const [clientID, setClientID] = useState('');
    const [tipo, setTipo] = useState('')
    const [status, setStatus] = useState('')
    const [categoria, setCategoria] = useState('')
    const navigate = useNavigate()
    const [clients, setClients] = useState([])
    const [selectedValue, setSelectedValue] = useState(1)

      useEffect(() => {
        // PEgar api
        axios.get('https://localhost:7134/Cliente/')
        .then( res => {
            setClients(res.data)
        } )
        .catch( err => console.error(err))
        
    }, [])

    const handleClientChange = (event) => {
        const selectedClientID = event.target.value;
        setClientID(selectedClientID);
    };

    function handleSubmit (event){
        event.preventDefault()
        
       if( clientID != "" && clientID != null && tipo != "" && tipo != null && status != "" && status != null &&
            categoria != "" && categoria != null )
       {
            axios.post('https://localhost:7134/Container/', {clienteId: clientID, tipo: tipo, status: status, categoria: categoria})
            .then( res => {
                navigate("/containers")

            }).catch(err => console.log(err))
       }
       else
       {
            alert("Existem Campos em branco")
            return;
       }
    }

    return(
        <div>
            <Navbar />
            
            <section className="fundo vh-100 d-flex flex-column justify-content-center align-items-center">
            <div className="popup container w-50 bg-light p-5 rounded">
            <h1>Adicionar um Container</h1>
            <form onSubmit={ handleSubmit }>
            <div className="form-group">
                <label htmlFor="clientSelect">Selecione um cliente:</label><br/>
                <select id="clientSelect"  className="form-select" value={ clientID } onChange={ handleClientChange }>
                <option value="">Selecione...</option>
                    {clients.map((client) => (
                    <option 
                        id="optionId"
                        key={client.id} 
                        value={client.id}>
                        {client.nome}
                    </option>
                    ))}
                </select>
                </div>
                <div className="form-group mt-2">
                <label htmlFor="clientSelect">Selecione uma tipo</label><br/>
                    <select defaultValue="Tipo" className="form-select mb-3" 
                    onChange={e => setTipo( e.target.value ) }>
                        <option selected value='Tipo'>Tipo</option>
                        <option>20</option>
                        <option>40</option>
                    </select>
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="clientSelect">Selecione um Status</label><br/>
                    <select defaultValue="Status" className="form-select mb-3"
                    onChange={ e => setStatus( e.target.value )}
                    >
                        <option selected value='Status'>Status</option>
                        <option value="Cheio">Cheio</option>
                        <option value="Vazio">Vazio</option>
                    </select>
                </div>
                    <div className="form-group mt-2">
                        <label htmlFor="clientSelect">Selecione uma categoria</label><br/>
                        <select defaultValue="Categoria" className="form-select mb-3"
                        onChange={ e => setCategoria( e.target.value )}
                        >
                            <option selected value='Categoria'>Categoria</option>
                            <option value="Importacao">Importacao</option>
                            <option value="Exportacao">Exportacao</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-success mt-2">Cadastrar</button>
                </form>
            </div>
        </section>
        </div>
    )

}

export default AdicionarContainer