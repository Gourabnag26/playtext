//import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Textform from './components/Textform';
import Notes from './components/Notes';
import Signup from './components/Signup';
import Login from './components/Login';
import Addnote from './components/Addnote';
//import About from './components/About';
import { useState } from 'react';
import NoteState from './Context/notes/NoteState';
import Alert from './components/Alert';
import Front from './components/Front';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet
} from "react-router-dom";

function App() {
  const togglemode=()=>{
    if(mode==='dark'){
      setmode('light');
      document.body.style.backgroundColor="white";
      document.body.style.color="black";
    }
    else{
      setmode('dark');
      document.body.style.backgroundColor="#072F5F";
      document.body.style.color="cyan";
      salert("darkmode enabled","success")
    }
  }
  const salert=(message,type)=>{
    setalert({msg:message,
    type:type})

    setTimeout(() => {
      setalert(null);
    }, 2000);
  }
  const[alert,setalert]=useState(null)
  const[mode,setmode]=useState('light')
  //const[txt,settxt]=useState("Enable-darkmode")
  return (
   <>
   <Router>
   <Navbar title="yourchoice" toggle={togglemode}  mode={mode}/>
    <Alert alert={alert}/>
    
   <Routes>     
   <Route exact path="/"  
          element={
          <Front/>
          }
          />
   <Route exact path="/Userlogin"
          element={<>
          <NoteState>
            <Textform salert={salert} heading="you can edit your text here" mode={mode}/>
            <Notes/>
            </NoteState></>}
          />
           <Route exact path="/Login"
          element={<Login salert={salert} heading="Log in here" mode={mode}/>}
          />
          <Route exact path="/Signup"
          element={<Signup salert={salert} heading="Signup here" mode={mode}/>}
          />
    </Routes>
  
   </Router>
   </>
   
  
  );
}

export default App;