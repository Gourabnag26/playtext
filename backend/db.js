const mongoose=require('mongoose')
const mongURI="mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

const connectToMongo=()=>{
      mongoose.connect(mongURI,()=>{
          console.log("I am connected")
      })
}

module.exports = connectToMongo;