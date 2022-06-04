import React,{useState} from 'react'


export default function Textform(props) {
   const [text, setText]= useState("Enter Text here");
   const funcup=()=>{
    if(text.length==0){
        props.salert("No text found!","danger")
    }
    else{
       setText(text.toUpperCase())
       props.salert("Converted to upper case","success")}
   }
   const funcdown=()=>{
    if(text.length==0){
        props.salert("No text found!","danger")
    }
    else{
    setText(text.toLowerCase())
    props.salert("Converted to lower case","success")}
      }

   const funcchng=(event)=>{
     setText(event.target.value)

    }
    function func(str){
        let count=0;
        let flag=1;
    for(let i=0;i<str.length;i++)
    {
      if(str[i]==' ' && flag==0)
      {   flag=1;
          count++;
      }
      else if(str[i]!='\0' && str[i]!=' ')
      {
          flag=0;
      }
    }
    if(flag==0)
     {count++;}
    
    return (count);
    }
    const funcclear=()=>{
        setText("");
    }
    const funcbacspace=()=>{
        if(text.length==0){
            props.salert("No text found!","danger")
        }
    let a=text.split("")
    a.pop()
    let str=a.join('')
    setText(str)
    }

    return (   
    <>
    <div className="col-4 mx-5 my-4 ">
    <button type="button" class="btn  btn-secondary" data-toggle="modal" data-target="#exampleModal1">
  <i><b>Click here to edit your text</b></i>
</button></div>
    <div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel1">  <small id="title" class="form-text text-muted">Edit your text with the following features</small></h5>
        <button type="button" onClick={funcclear} class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <><div className={`container text-${props.mode==='light'?'dark':'cyan'}`}>
   <label htmlFor="mybox">{props.heading}<span className={`badge badge-primary text-${props.mode==='light'?'dark':'light'}`}>New</span></label>
   <textarea value={text} onChange={funcchng} className={`form-control bg-${props.mode==='light'?'light':'secondary'} text-${props.mode==='light'?'dark':'warning'}`} id="mybox" rows="3"></textarea>
   <button  className="btn btn-primary mx-2 my-3" onClick={funcup}  >Convert to UpperCase</button>
   <button  className="btn btn-primary mx-2 my-3" onClick={funcdown}  >Convert to lowercase</button>
   <button  className="btn btn-primary mx-2 my-3" onClick={funcclear}  >Clear-text</button>
   <button  className="btn btn-primary mx-2 my-3" onClick={funcbacspace}  >backspace</button>
   </div>
   <div className="container">
       <nav className={`navbar navbar-light bg-${props.mode==='light'?'light':'secondary'} my-31`}>
           <ul className={`navbar-nav" text-${props.mode==='light'?'dark':'warning'}`}>
               <li className="nav-item"><a href="#" className={`nav-link text-${props.mode==='light'?'dark':'warning'}`}>The no of charecters are :{text.length}</a></li>
               <li className="nav-item"><a href="#" className={`nav-link text-${props.mode==='light'?'dark':'warning'}`}>The no of words are :{func(text)}</a></li>
               <li className="nav-item"><a href="#" className={`nav-link text-${props.mode==='light'?'dark':'warning'}`}>Time required to read :{0.008*func(text)}minutes</a></li>
           </ul>
       </nav>
   </div></>
      </div>
    </div>
  </div>
</div>
   </>
  )
    }