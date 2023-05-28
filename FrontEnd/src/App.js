
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Clientes from './components/Clientes';
import Create from './components/Create';
import UpdateClientes from './components/UpdateClientes';
import Containers from './components/Conteiners';
import Home from './components/Home';
import AdicionarContainer from './components/AdicionarContainer';
import UpdateContainers from './components/UpdateContainers';
import NovaMovimentacao from './components/NovaMovimentacao';
import Relatorio from './components/Relatorio';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={ <Home />}></Route>
          <Route path='/clientes' element={ <Clientes />}></Route>
          <Route path='/create' element={ <Create />}></Route>
          <Route path='/clientes/update/:id' element={ <UpdateClientes />}></Route>
          <Route path='/containers/editar/:id' element={ <UpdateContainers />}></Route>
          <Route path='/containers' element={ <Containers /> }></Route>
          <Route path='/Relatorio' element={ <Relatorio /> }></Route>
          <Route path='/adicionarContainer' element={ <AdicionarContainer />}></Route>
          <Route path='/novamovimentacao' element={ <NovaMovimentacao />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
