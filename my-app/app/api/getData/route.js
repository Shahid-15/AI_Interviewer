import connectToDatabase from "@/utils/db_connection";
import userModel from "@/utils/model";


export async function POST(request){
    let body =await  request.json();
    const {id} = body;
    await connectToDatabase();

    let user = await userModel.findOne({mockId:id});
   

    if(user){

        return new Response(

            JSON.stringify(user),
            {status:200}
        )
    }
    else{
        console.error("User not found")
    }

    }