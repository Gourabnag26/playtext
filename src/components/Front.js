import React from 'react'
import './Style.css'
const Front = () => {
   const st={font:"Georgia,serif",margin:"auto","text-align":"center"}
   const im={"margin-left":"auto","margin-right":"auto",display:"block"}
   const t={"color":"red"} 
   return (
    <div className="container-fluid my-3">
      
        <i><h4 class="my-5 mx-auto" style={st}>  <i class="fa-solid fa-lock fa-shake"></i>......"Your secrets are safe with me"......   <i class="fa-solid fa-lock fa-shake"></i></h4></i>
        <i ><h6 style={st}>"<b style={t}>D</b>arling <b style={t}>I</b> will <b style={t}>A</b>lways <b style={t}>R</b>emeber <b style={t}>Y</b>ou"</h6></i>
        <img  style={im}src="https://images.squarespace-cdn.com/content/v1/5943095e9f74565984e68c7f/1596577548067-M1KL3JTUECQ03BSGKUXA/IMG_1700.PNG?format=1000w" class="img-fluid my-3" alt="Loading"></img>
        
    </div>
  )
}

export default Front