const express = require('express');
const { body, validationResult } = require('express-validator');
var jwt =require('jsonwebtoken')
const router= express.Router();
var fetchuser=require('../middleware/fetchuser')
const Notes=require('../models/Notes')
//ROute 1 get all the notes GET "/api/notes/fetchallnotes"
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    const notes= await Notes.find({user : req.user.id})
    res.json(notes)
})

//Route 2 to add new notes
router.post('/addnotes',fetchuser,[
    body('title','Enter a non empty title').isLength({min :1}),
    body('description','Enter a valid description').isLength({min:1})
   ],
    async(req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) 
        {
          return res.status(400).json({ errors: errors.array() });
        }
        const {title,description,tag}=req.body
    try
    {
        const note = new Notes({
            title,description,tag,user: req.user.id
        })
    
    const savednotes=await note.save()
    res.json(savednotes)
    }    
    catch(error)
    {
        console.error(error.message);
        res.status(500).send("Some error occured + you are bad")
    }
  
})
//Route 3 for updating note,target value is id
router.put('/updatenotes/:id',fetchuser,
    async(req,res)=>{
    try{
    const {title,description,tag}=req.body
    const Newnote ={};
    if(title){Newnote.title = title}
    if(description){Newnote.description = description}
    if(tag){Newnote.tag = tag}
    
    //Find the note to be updated
    let note=await Notes.findById(req.params.id)
    if(!note){return res.status(404).send("NOt FOUND")}
    if(note.user.toString() !== req.user.id)
    { return res.status(404).send("ACCESS DENIED");
    }

   note= await Notes.findByIdAndUpdate(req.params.id,{$set: Newnote},{new:true});
   res.json({note})
   }
    catch(error)
    {
        console.error(error.message);
        res.status(500).send("Some error occured + you are bad")
    }
  
})

//Router 4 to delete notes
router.delete('/deletenote/:id',fetchuser,
    async(req,res)=>{
    try{
    const {title,description,tag}=req.body
    //Find the note to be deleted
    let note=await Notes.findById(req.params.id)
    if(!note){return res.status(404).send("NOt FOUND")}
    if(note.user.toString() !== req.user.id)
    { return res.status(404).send("ACCESS DENIED");
    }

   note= await Notes.findByIdAndDelete(req.params.id)
   res.json({"SUCESS":"Note has been deleted","note":note})
   }
    catch(error)
    {
        console.error(error.message);
        res.status(500).send("Some error occured + you are bad")
    }
  
})



module.exports= router