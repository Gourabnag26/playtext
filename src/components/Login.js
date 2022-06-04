import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'


const Login = (props) => {
  
   const [credential, setcredential] = useState({email:"",password:""})

   let navigate=useNavigate()
   const handlesubmit=async(e)=>
   {
      e.preventDefault();
      const host="http://localhost:5000"
       
       const response = await fetch(`${host}/api/auth/Login`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'},
          body: JSON.stringify({email:credential.email,password:credential.password})
      });
      const json=await response.json()
      console.log(json)
      if(json.success)
      {
          //save the aauth token and redirecct
          localStorage.setItem('token',json.token)
          console.log(json)
          navigate("/userLogin")
          props.salert("Logged in succesfully welcome!!","Success")
      }
      else
      {
        props.salert("Wrong Login credential","danger")
      }
   }
   const onChange=(e)=>{
    setcredential({...credential,[e.target.name]:e.target.value})
   }
  
  
    return (
      <div className="row bg-light">
    <div class="col-4 mx-auto my-5">
  <form onSubmit={handlesubmit}>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="email" name="email" value={credential.email} onChange={onChange} aria-describedby="emailHelp"></input>
    <div class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" name="password" class="form-control" value={credential.password} onChange={onChange} id="password"></input>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>

    </div>
    </div>
  )
}

export default Login