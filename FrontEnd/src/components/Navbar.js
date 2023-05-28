import { Link } from "react-router-dom"
import {BsFillMoonFill} from 'react-icons/bs'

function Navbar(){
    return <nav className="navbar navbar-light bg-light">
             <Link className="navbar-brand p-2" to="/">Sistema Portuario</Link>
             <button className="btn btn-sm bg-dark btn-dark rounded-circle me-2">
              <BsFillMoonFill size={13}/>
             </button>
           </nav>
}

export default Navbar