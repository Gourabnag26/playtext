import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Signup =(props) => {
    
  const [credential, setcredential] = useState({name:"",email:"",password:""})

   let navigate=useNavigate()
   const handlesubmit=async(e)=>
   {
      e.preventDefault();
      const host="http://localhost:5000"
       
       const response = await fetch(`${host}/api/auth/Createuser`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'},
          body: JSON.stringify({name:credential.name,email:credential.email,password:credential.password})
      });
      const json=await response.json()
      if(json.success)
      {
          //save the aauth token and redirecct
          localStorage.setItem('token',json.token)
          navigate("/Userlogin")
          props.salert("Sign up is succesfull welcome!!","Success")
          console.log(json)

      }
      else
      { 
       if(json.tag==1)
       {
         props.salert(json.errors[0].msg,"danger")
         console.log(json)
       }
       else
        props.salert(json.errors.msg,"danger") 
        {console.log(json)
        }
       
      }
   }
   const onChange=(e)=>{
    setcredential({...credential,[e.target.name]:e.target.value})
   }

  
  return (
    <div class="col-4 my-3 mx-auto">
    <form onSubmit={handlesubmit}>
      <div className="form-group my-2">
      <label for="Name">User Name</label>
    <input type="text" class="form-control" name="name" id="name" value={credential.name} onChange={onChange}  placeholder="name"></input>
      </div>
  <div class="form-group my-2">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" name="email" id="email" value={credential.email} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email"></input>
  </div>
  <div class="form-group my-2">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" name="password" id="password" class="form-control"  onChange={onChange} value={credential.password} placeholder="Password"></input>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>  
    </div>
  )
}

export default Signup