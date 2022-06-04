import React from 'react'
import PropTypes from 'prop-types'
import { Link,useNavigate} from 'react-router-dom'
export default function Navbar(props) {
  let navigate=useNavigate()
  const handleclick=()=>{
    localStorage.removeItem('token')
    navigate("/")
  }
  return (
    <nav className={`navbar navbar-expand navbar-${props.mode} bg-${props.mode}`}>
    <ul className="navbar-nav">
    {//<li><Link className="nav-link mx-2" to="/Home" ><h4>Home</h4></Link></li>
    }

   {!localStorage.getItem('token')?
    <>
    <li><Link className="nav-link mx-2" to="/" ><h4>Home</h4></Link></li>
    <li><Link className="nav-link mx-2" to="/Login" ><h4>Login</h4></Link></li>
   <li><Link className="nav-link mx-2" to="/Signup" ><h4>Signup</h4></Link></li></>
   :<button className="btn-dark btn mx-2" onClick={handleclick}>Log out</button>}
     {/* <li className="nav-item">
     <Link to="/" className="nav-link">Home</Link>
      </li>
      <li className="nav-item">
        <Link to="/about" className="nav-link">About us</Link>
      </li>*/}
    
    </ul>
    <div className={`form-check form-switch text-${props.mode==='light'?'dark':'cyan'}`}>
  <input className="form-check-input " onClick={props.toggle} type="checkbox" id="flexSwitchCheckDefault"/>
  <label className="form-check-label" htmlFor="flexSwitchCheckDefault">darkmode</label>
</div>
    </nav>
  )
  
}
Navbar.propTypes={
    title:PropTypes.string
}