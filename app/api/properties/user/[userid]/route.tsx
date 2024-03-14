import connectDB from "@/dbconfig/database";
import Property from "@/models/Property";


export const GET = async (
    request : Request,
    { params } : {
        params : {
            userid : string
        }
    }
) : Promise<Response> => {
    try {

        console.log({
            DEBUG : params
        })
        await connectDB();
        // const property =  await Property.findById(params.id);

        const userId = params.userid;

        if (!userId) {
            return new Response('Userid is required.', {
                status : 403
            });
        };

        const properties = await Property.find({owner : userId});

        return new Response(JSON.stringify(properties), {
            status : 200,
            headers : {
                "content-type" : "application/json"
            }
        });
        // return Response.json(properties);
    } catch (error) {
        console.log(error);
        return new Response("Something went wrong", {
            status : 500
        });
    };
};