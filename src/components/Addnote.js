import React from 'react'
import { useContext,useEffect,useRef,useState } from 'react';
import Notecontext from '../Context/notes/Notecontext';
import Noteitem from './Noteitem';


const Addnote = () => {
    const context = useContext(Notecontext);
    const{addnote}=context;
   
    const [note, setnote] = useState(
        {
        title:"",
        description:"",
        tag:""
        }
      )
    const onChange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
        console.log("hello")
    }
   
     const handleclick=()=>
     {
        addnote(note.title,note.description,note.tag)
        console.log("hello")
     }   
  
    return (
      <div className="container">
    <div>
        <form action="">
        <div className="mb-3">
    <label for="title" class="form-label">Today's special moment</label>
    <input type="text" id="title" value={note.title} name="title" class="form-control" minLength={2} required  onChange={onChange} />
  </div>

  <div class="mb-3">
    <label for="description" class="form-label">How was your day today?</label>
    <textarea type="text" value={note.description} class="form-control z-depth-2" rows="9" id="description" name="description" minLength={2} required onChange={onChange}/>
  </div>

        </form>
        <button type="button" disabled={note.title.length<2 || note.description.length<2} onClick={handleclick} class="btn btn-primary">Submit</button>
    </div>
    </div>
  )
}

export default Addnote