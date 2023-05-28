import axios from "axios"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

function Create(){

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    function handleSubmit (event){
        event.preventDefault()
     
        if( name != "" && name != null && email != "" && email != null)
        {
            axios.post('https://localhost:7134/Cliente/', {Nome: name, Email: email})
            .then( res => {
                navigate("/clientes")
            }).catch(err => console.log(err))
        }
        else
        {   
            alert("Existem Campos em branco")
            return;
        }
    }

    return(
        <section className="container vh-100 d-flex flex-column justify-content-center align-items-center">
            <div className="container w-50">
            <h1>Adicionar um Cliente</h1>
            <form onSubmit={ handleSubmit }>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Nome</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" 
                    aria-describedby="emailHelp" placeholder="Seu nome"
                    onChange={e => setName(e.target.value)}
                    />
                    <small id="emailHelp" className="form-text text-muted"></small>
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="exampleInputEmail1">Endereço de email</label>
                    <input type="email" className="form-control" id="exampleInputEmail1"
                     aria-describedby="emailHelp" placeholder="Seu email"
                     onChange={e => setEmail(e.target.value)}
                     />
                    <small id="emailHelp" className="form-text text-muted">Nunca vamos compartilhar seu email, com ninguém.</small>
                </div>
                <button type="submit" className="btn btn-success mt-2">Enviar</button>
            </form>
        </div>
        </section>
    )

}

export default Create