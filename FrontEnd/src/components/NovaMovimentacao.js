import axios from "axios";
import React, { useState, useEffect} from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";


function NovaMovimentacao()
{
    const [tipo, setTipo] = useState('')
    const [dataHoraInicio, setDataHoraInicio] = useState('')
    const [dataHoraFinal, setDataHoraFinal] = useState('')
    const [clients, setClients] = useState([])
    const [container, setContainer] = useState([])
    const [containerCliente, setContainerCliente] = useState([])
    const [containerId, setContainerId] = useState([])
    const [selectedValue, setSelectedValue] = useState(1)
    const navigate = useNavigate()
    const [idClient, setIdCliente] = useState([])


    useEffect(() => 
    {
        // PEgar api
        axios.get('https://localhost:7134/Cliente/')
        .then( res => setClients(res.data) )
        .catch( err => console.error(err))
        
    }, [])


    function handleSelectClient (event)
    {

        setSelectedValue(event.target.value)
        //setIdCliente(event.target.value)
    
        axios.get('https://localhost:7134/Container/Cliente/'+ event.target.value)
        .then( res => 
        {
            setContainerCliente( res.data )
        
        } )

        .catch( err => console.error(err))
    }

    function handleSubmit (event)
    {
        event.preventDefault()
        
        if( selectedValue != "" && selectedValue != null && containerId != "" && containerId != null && tipo != "" && tipo != null &&
            dataHoraInicio != "" && dataHoraInicio != null && dataHoraFinal != "" && dataHoraFinal != null
         )
        {
            axios.post('https://localhost:7134/Movimentacao/', {clienteId: selectedValue, containerId: containerId, tipoMovimentacao: tipo, dataHoraInicio: dataHoraInicio, dataHoraFim: dataHoraFinal } )
            .then( res => {
                setContainer(res.data)
                navigate("/")
            } )
            .catch( err => console.error(err))
            
        }else{
            alert("Existem Campos em branco")
            return;
        }
    }
    
    return(
        <div>
            <Navbar />

            <section className="fundo vh-100 d-flex flex-column justify-content-center align-items-center">
            
            <div className="popup container w-50 bg-light p-5 rounded">
            <h1>Fazer uma movimentacao</h1>
            <form onSubmit={ handleSubmit }>

            <div>
                <label htmlFor="clientSelect">Selecione um cliente:</label><br />
                <select className="form-select" id="clientSelect" onChange={ handleSelectClient }>
                <option value="">Selecione o cliente</option>
                    {clients.map((client) => (
   
                            <option 
                            id="optionId"
                            key={client.id} 
                            value={client.id}>
                            { client.nome}
                            </option>
                        ))}
                </select>
            </div>

            <div>
                <label htmlFor="clientSelect">Selecione o container:</label><br />
                <select className="form-select" aria-label="Default select example" onChange={ e => { setContainerId(e.target.value)}}>
                    <option selected defaultChecked>Numero do container</option>
                    {containerCliente.map( (obj, i) => (
                        <option key={i} value={obj.id}>{obj.numeroConteiner}</option>
                    ))}
                </select>
            </div>
            
            <hr />
            
            <div className="form-group">
                <label htmlFor="clientSelect">Selecione um tipo de movimentacao:</label><br />
                <select className="form-control" id="clientSelect"  onChange={ e => {setTipo( e.target.value )} }>
                <option value="">Selecione...</option>
                   <option className="col" defaultChecked value="Embarque">Embarque</option>
                   <option value="Descarga">Descarga</option>
                   <option value="Gate In">Gate in</option>
                   <option value="Gate out">Gate out</option>
                   <option value="Reposicionamento">Reposicionamento</option>
                   <option value="Pesagem">Pesagem</option>
                   <option value="Scanner">Scanner</option>
                </select>
            </div>
                
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Data e Horario Inicial</label>
                <input type="datetime-local" className="form-control" id="exampleInputEmail1" 
                aria-describedby="emailHelp" placeholder="Data e horario inicial" value={dataHoraInicio}
                onChange={e => setDataHoraInicio(e.target.value)}
                />
                <small id="emailHelp" className="form-text text-muted"></small>
            </div>

                
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Data e Horario Final</label>
                    <input type="datetime-local" className="form-control" id="exampleInputEmail1" 
                    aria-describedby="emailHelp" placeholder="Seu nome" value={dataHoraFinal}
                    onChange={e => setDataHoraFinal(e.target.value)}
                    />
                    <small id="emailHelp" className="form-text text-muted"></small>
                </div>


                <button type="submit" className="btn btn-success mt-2">Criar Movimentacao</button>
            </form>
            </div>
            <div class="alert alert-warning d-flex align-items-center" role="alert">
                    <div>
                        Obs: Nao e possivel fazer uma movimentacao sem ter ao menos 1 container cadastrado.
                    </div>
                </div>
        </section>
        </div>
    )
}

export default NovaMovimentacao