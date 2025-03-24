import userModel from "@/utils/model"
import connectToDatabase from "@/utils/db_connection"

export async function POST(request){

    await connectToDatabase();
    const body = await request.json();
    const {email} = body;
     
    const user = await userModel.find({createdBy:email})


    return new Response(

        JSON.stringify(user)
    )
}