import mongoose from "mongoose";

const connectToDatabase = async ()=>{
       
  try{

    await mongoose.connect(`mongodb://localhost:27017/AI_Interviewer`)
  }
  catch(e){

    console.log(
      "Error Connecting to the database " + e
    )
  }

}
export default connectToDatabase;