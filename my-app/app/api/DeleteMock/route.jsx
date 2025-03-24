import connectToDatabase from "@/utils/db_connection";
import userModel from "@/utils/model";
import { testModel } from "@/utils/testModel";
import { NextResponse } from "next/server";

export async function DELETE(req){

    const {searchParams}=new URL(req.url);

    const id = searchParams.get("id");

    try{

        await connectToDatabase();

        let doc = await userModel.deleteOne({mockId:id})
        let doc2 = await testModel.deleteMany({mockIdRef:id})

        return NextResponse.json({msg:"Mock deleted"})

    }

    catch(e){

        return NextResponse.json({error:e})
    }


}