import React, { useContext } from 'react';
import Notecontext from '../Context/notes/Notecontext';
import './Style.css'

const Noteitem = (props) => {
    const context= useContext(Notecontext);
    const{deleteNote}=context;
    const {note,updateNote}=props;
    const st={background:"bisque",color:"black"}
  
    return (
        
        
      <div style={st}class="card my-3  mx-3 col-3 d-inline-block ">
    <img  src="https://images.squarespace-cdn.com/content/v1/5943095e9f74565984e68c7f/1596577548067-M1KL3JTUECQ03BSGKUXA/IMG_1700.PNG?format=1000w" class="card-img-top" alt="Image loading"></img>
    <h4><b><i><div className="card-title mx-2" style={{"text-decoration": "underline"}}>{note.title}</div></i></b></h4>
    <i class="mx-2">{new Date(note.date).toGMTString()}</i>
  <div class="card-body">
   <h6><b><i><p class="card-text p-3" >"{note.description}"</p></i></b></h6>
  </div>
        <i class="fa-solid fa-eraser  d-flex flex-row-reverse" onClick={()=>{deleteNote(note._id)}}></i>
        <i class="fa-solid fa-pen-to-square d-flex flex-row-reverse" onClick={()=>{updateNote(note)}}></i>
        

    </div>

  )
}

export default Noteitem