import React from 'react'
import { useContext,useEffect,useRef,useState } from 'react';
import Notecontext from '../Context/notes/Notecontext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import Style from './Style.css'
import { Navigate, useNavigate } from 'react-router-dom';
import Music from './Music'
const Notes = () => {
    const [count, setcount] = useState(0)
    const [g, setg] = useState(0)
    const thisclick=()=>{
      setg(g+1)
      if(g%2==0)
      {
        setcount(1)
      }
      else
      {
        setcount(0)
      }
    }
    let Navigate=useNavigate()
    const context = useContext(Notecontext);
    const{notes,setnotes,getNotes,editNote}=context;
    useEffect(() => {
    if(localStorage.getItem('token'))
    getNotes()
    else
    Navigate("/Login")
    }, [])

    const ref = useRef(null) 
    const refClose=useRef(null)
const updateNote=(currentNote)=>{
      ref.current.click();
      setnote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description})

}

const handleclick=(e)=>
{ 
  console.log("updating the note",note);
  editNote(note.id,note.etitle,note.edescription)
  refClose.current.click()
}

const [note, setnote] = useState(
  {
  id:"",
  etitle:"",
  edescription:"",
  etag:""
  }
)


const onChange=(e)=>{
  setnote({...note,[e.target.name]:e.target.value})
}



  return (
 <div className="container">
    <div>
      <Music/>
      <Addnote/>
     
      
<button ref={ref} type="button" class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form action="">
        <div className="mb-3">
    <label for="title" class="form-label">title</label>
    <input type="text" id="etitle" value={note.etitle} name="etitle" class="form-control" minLength={2} required  onChange={onChange} />
  </div>

  <div class="mb-3">
    <label for="description" class="form-label">description</label>
    <input type="text" value={note.edescription} class="form-control" id="edescription" name="edescription" minLength={2} required onChange={onChange}/>
  </div>

        </form>
      </div>
      <div class="modal-footer">
        <button type="button" ref={refClose} class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" disabled={note.etitle.length<2 || note.edescription.length<2} onClick={handleclick} class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

      <div class="my-3"><i><h2 style={{"text-align":"center","font-family":"Times New Roman,Times, serif"}}><button type="button" onClick={thisclick}class="btn btn-dark btn-lg"><i class="fa-solid fa-heart fa-beat"></i>......Your Secrets are here......<i class="fa-solid fa-heart fa-beat"></i></button></h2></i></div>
    <div class={count==0?"d-none":"d-block"}>
    {notes.map((note)=>{
      return <Noteitem key={note._id} updateNote={updateNote} note={note}/>;
    })}</div>
    </div>
    </div>   
  )
}  

export default Notes
