import { Link } from 'react-router-dom'
import imgClientes from '../img/clientes.jpg'
import imgConteiners from '../img/conteiners.jpg'
import imgMovimentacoes from '../img/movimentacoes.png'
import imgMovimentacaoNovo from '../img/movimentacao.jpg'
import Navbar from './Navbar'


function Home(){
    
    return(
        <div className='bg-dark'>
            <Navbar />
            <div className="vh-100 d-flex justify-content-center align-items-center flex-column">
                 <div className="container text-center ">
                    <div className="row">
                       
                        <div className="col">
                            <div className="card bg-light">
                            <img src={ imgClientes } className="card-img-top" alt="Clientes"/>
                            <div className="card-body">
                                <h5 className="card-title">Nossos Clientes</h5>
                                <p className="card-text">Alguns de nossos clientes cadastrados.</p>
                                <Link to='/clientes' className='btn btn-primary'>Acessar</Link>
                            </div>
                            </div>
                        </div>

                        <div className="col">
                             <div className="card">
                                <img src={ imgConteiners } className="card-img-top" alt="Clientes"/>
                                <div className="card-body">
                                    <h5 className="card-title">Conteiners</h5>
                                    <p className="card-text">Alguns de nossos conteiners.</p>
                                    <Link to='/containers' className='btn btn-primary'>Conteiners</Link>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                             <div className="card">
                                <img src={ imgMovimentacoes } className="card-img-top" alt="Clientes"/>
                                <div className="card-body">
                                    <h5 className="card-title">Historico</h5>
                                    <p className="card-text">Aqui voce pode visualizar as movimentacoes feitas e tambem realizar alguma.</p>
                                    <Link to='/relatorio' className='btn btn-primary'>Relatorio</Link>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                             <div className="card">
                                <img src={ imgMovimentacaoNovo } className="card-img-top" alt="Clientes"/>
                                <div className="card-body">
                                    <h5 className="card-title">Nova Movimentacao</h5>
                                    <p className="card-text">Aqui voce pode fazer uma movimentacao.</p>
                                    <Link to='/novamovimentacao' className='btn btn-info'>Fazer Movimentacao</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home