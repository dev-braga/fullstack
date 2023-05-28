import axios from "axios"
import React, { useState, useEffect} from "react"
import { useNavigate, useParams } from "react-router-dom"

function UpdateClientes(){
   
    const navigate = useNavigate()
    const { id } = useParams()

    // Campos do cliente
    const [nameOld, setNameOld] = useState('')
    const [emailOld, setEmailOld] = useState('')

    useEffect(() => {
        // Pegar api
        axios.get('https://localhost:7134/Cliente/'+ id)
        .then( 
            res => {
                setNameOld(res.data.nome)
                setEmailOld(res.data.email)
        })
        .catch( err => console.error(err))
        
    }, [])


    function handleSubmit (event){
        event.preventDefault()

        if( nameOld != "" && nameOld != null && emailOld != "" && emailOld != null)
        {
            const clienteData = {Nome: nameOld, Email: emailOld}
        
            axios.put('https://localhost:7134/Cliente/'+id, clienteData)
            .then( res => {
                console.log(res)
                navigate('/clientes')
            }).catch(err => console.log(err))
        }
        else 
        {
            alert("Existem Campos em branco!")
        }
    }

    return(
        <section className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="container w-50">
            <h1>Edicao do cliente</h1>
            <form onSubmit={ handleSubmit }>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Nome</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" 
                    aria-describedby="emailHelp" placeholder="Seu nome" value={nameOld}
                    onChange={e => setNameOld(e.target.value)}
                    />
                    <small id="emailHelp" className="form-text text-muted"></small>
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="exampleInputEmail1">Endereço de email</label>
                    <input type="email" className="form-control" id="exampleInputEmail1"
                     aria-describedby="emailHelp" placeholder="Seu email" value={emailOld}
                     onChange={e => setEmailOld(e.target.value)}
                     />
                    <small id="emailHelp" className="form-text text-muted">Nunca vamos compartilhar seu email, com ninguém.</small>
                </div>
                <button type="submit" className="btn btn-success mt-2">Atualizar</button>
            </form>
        </div>
        </section>
    )
}

export default UpdateClientes