import axios from "axios"
import React, { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

function UpdateContainers() {
    
    const [tipo, setTipo] = useState('')
    const [status, setStatus] = useState('')
    const [categoria, setCategoria] = useState('')
    const {id} = useParams()
    const navigate = useNavigate()


    const handleSubmit = (event) => {
        event.preventDefault()
           
        if( tipo != "" && tipo != null && status != "" && status != null && categoria != "" && categoria != null)  
        {
            axios.put('https://localhost:7134/Container/'+id, {tipo, status, categoria})
            .then(res => {
                navigate('/containers')
            }).catch(err => console.log("erro". err))
        }   
        else 
        {
            alert("Existem campos em branco")
            return;
        } 
    }

    return(
        <section className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="container w-50">
            <h1>Edicao do cliente</h1>
                <form onSubmit={ handleSubmit }>
                    <div className="form-group mt-2">
                        <select defaultValue="Tipo" className="custom-select custom-select-lg mb-3" 
                        onChange={e => setTipo( e.target.value ) }>
                            <option selected value='Tipo'>Tipo</option>
                            <option>20</option>
                            <option>40</option>
                        </select>
                    </div>
                    <div className="form-group mt-2">
                        <select defaultValue="Status" className="custom-select custom-select-lg mb-3"
                        onChange={ e => setStatus( e.target.value )}
                        >
                            <option selected value='Status'>Status</option>
                            <option value="Cheio">Cheio</option>
                            <option value="Vazio">Vazio</option>
                        </select>
                    </div>
                        <div className="form-group mt-2">
                            <select defaultValue="Categoria" className="custom-select custom-select-lg mb-3"
                            onChange={ e => setCategoria( e.target.value )}
                            >
                                <option selected value='Categoria'>Categoria</option>
                                <option value="Importacao">Importacao</option>
                                <option value="Exportacao">Exportacao</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-success mt-2">Atualizar</button>

                    </form>
                </div>
        </section>
    )
}

export default UpdateContainers