import connectToDatabase from "@/utils/db_connection";
import userModel from "@/utils/model";

export async function POST(request){

   try{

      await connectToDatabase()
      
      let body = await request.json();
      console.log(body);
      const {jsonMockResponse,jobPosition,jobDescription,jobExperience,createdBy,mockId} = body;
      
      let user = await userModel.create({
         jsonMockResponse,
         jobPosition,
         jobDescription,
         jobExperience,
         createdBy,
         mockId
      })
      
      return new Response(
         JSON.stringify({mockId}),
         {
            status:200
         }
      )
   }
   catch(e){
      console.error("Error : " + e)
   }
}

