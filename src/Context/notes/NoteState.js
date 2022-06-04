import React, { useState } from "react";
import Notecontext from "./Notecontext";

const NoteState=(props)=>{
  const host="http://localhost:5000"
    const notesinitial=[]
    const [notes,setnotes]=useState(notesinitial)
    //Get all notes
    const getNotes=async ()=>
    {
       //api call logic
       
       const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      }});
      const json=await response.json()
      console.log(json)
      setnotes(json)
    }
    /*const s1={
        "name":"harry",
        "class":"5b"}*/
  
   /* const  update =()=>{
        setTimeout(() => {
            setnotes({"name":"carry",
            "class":"10b"})
        }, 10000);
    }*/
    // Add a note
    const addnote=async (title,description,tag)=>
    {
       //api call logic
  
       const response = await fetch(`${host}/api/notes/addnotes`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')},
        body: JSON.stringify({title,description,tag})
      });
      const note=await response.json();
        setnotes(notes.concat(note))
    }
   //
   /*const response = await fetch(url, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'},
    body: JSON.stringify(data) 
  });
  return response.json(); 
}*/
   //Delete a note
   const deleteNote=async (id)=>
   {
    //Fetch api logic
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')}
    });
    const json= response.json()
    console.log("deletting the note with id"+id);
    const newNotes=notes.filter((note)=>{return note._id!==id})
    setnotes(newNotes)
   }
   //Edit a note
   const editNote=async (id,title,description,tag)=>{
      //Fetch api logic
      const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')},
          body: JSON.stringify({title,description,tag}) 
      });
      const json= response.json() 
      console.log(json)
      //Logic to edit client:
      let newNotes=JSON.parse(JSON.stringify(notes))
      for(let index=0;index<newNotes.length;index++)
      {
        const element=newNotes[index];
        if(element._id===id)
        {
          newNotes[index].title=title;
          newNotes[index].description=description;
          newNotes[index].tag=tag;
          break;
        }
        
      }
      setnotes(newNotes)
    }

    return(
    <Notecontext.Provider value={{notes,addnote,deleteNote,editNote,getNotes}}>
        {props.children}
     </Notecontext.Provider>
    )
}

export default NoteState;