import { testModel } from "@/utils/testModel";

export async function POST(request){



     const body = await request.json();
     const {mockIdRef,question,correctAns,userAns,feedback,rating,userEmail} = body;

     const user = await testModel.create({

        mockIdRef,
        question,
        correctAns,
        userAns,
        feedback,
        rating,
        userEmail,
     })
     
     
    return new Response(

        JSON.stringify(user),
        {
            status:200,
            headers:{'Content-Type':'application/json'}
        }
    )

}



