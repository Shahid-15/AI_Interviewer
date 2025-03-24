import { testModel } from "@/utils/testModel";

export async function POST(request){

 
const body  = await request.json();
const {id} = body;

let data = await testModel.find({mockIdRef:id});
console.log(data);

    return new Response(
        JSON.stringify({data}),
        {
            status:200
        }
    )
}