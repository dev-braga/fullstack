import axios from "axios"
import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Navbar";
import '../css/style.css'


function Relatorio(){

    const [movimentacao, setMovimentacao] = useState([])
    const [objetoRetornado, setObjetoRetornado] = useState([])
    const [selectedCliente, setSelectedCliente] = useState('');
    const [tipo, setTipo] = useState([])
    const [dataHoraInicio, setDataHoraInicio] = useState([])
    const [dataHoraFinal, setDataHoraFinal] = useState([])
    const [totalImportacao, setTotalImportacao] = useState([])
    const [totalExportacao, setTotalExportacao] = useState([])
    let id = 0;

    const handleSelectChange = (event) => {
        setSelectedCliente(event.target.value);
        id = event.target.value 
        let url = 'https://localhost:7134/Movimentacao/Cliente/' + id;

        axios.get(url)
        .then(res => {
            console.log(res)
            setObjetoRetornado( res.data);
        })
        .catch(err => console.log(err))

    };
       

    useEffect(() => {

        axios.get("https://localhost:7134/Cliente/")
        .then(res => {
            console.log(res)
            setMovimentacao( res.data);
        })
        .catch(err => console.log(err))
    }, [])

    return(
        <section className="vh-100 w-100">
             <Navbar />
           <div className="container mt-5">
            <h1>Seleção de Cliente</h1>

            <div className="form-group">
                <label htmlFor="clienteSelect">Selecione um cliente:</label>
                <select
                    id="clienteSelect"
                    className="form-control"
                    onChange={ handleSelectChange }
                    >
                        <option value={ selectedCliente }>Selecione</option>
                        {movimentacao.map((movCli) => (
                            <option key={movCli.id} value={movCli.id}>
                            {movCli.nome}
                            </option>
                        ))}
                </select>
            </div>
            {selectedCliente && (
                <div className="body-relatorio">
          
                {objetoRetornado && objetoRetornado.movimentacoes && (
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">Cliente</th>
                        <th scope="col">Container Numero</th>
                        <th scope="col">Tipo de Movimentação</th>
                        <th scope="col">Data e Hora de Início</th>
                        <th scope="col">Data e Hora de Fim</th>
                      </tr>
                    </thead>
                    <tbody>
                      {objetoRetornado.movimentacoes.map(movimentacao => (
                        <tr key={movimentacao.id}>
                          <td>{movimentacao.cliente.nome}</td>
                            <td>{movimentacao.container.numeroConteiner}</td>
                            <td>{movimentacao.tipoMovimentacao}</td>
                            <td>{movimentacao.dataHoraInicio}</td>
                            <td>{movimentacao.dataHoraFim}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                 <hr></hr>
                <div>
                   
                {objetoRetornado && (
                  <table className="footer">
                    <thead>
                      <tr>
                        <th>Total de Movimentações</th>
                        <th>Total de Importações</th>
                        <th>Total de Exportações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{objetoRetornado.totalMovimentacoes}</td>
                        <td>{objetoRetornado.totalImportacao}</td>
                        <td>{objetoRetornado.totalExportacao}</td>
                      </tr>
                    </tbody>
                  </table>
                )}
                </div>

              </div>
               
            )}
            </div>
        </section>
    )
}

export default Relatorio