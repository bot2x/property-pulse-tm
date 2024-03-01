import connectDB from "@/dbconfig/database";
import Property from "@/models/Property";

// interface getRequestProps {
//     request : Request,
//     params : {
//         id : string
//     }
// }

export const GET = async (
    request : Request,
    { params } : {
        params : {
            id : string
        }
    }
) : Promise<Response> => {
    try {

        console.log({
            DEBUG : params
        })
        await connectDB();
        const property =  await Property.findById(params.id);

        if (!property) {
            return new Response('Property not found', {
                status : 404
            });
        };

        return new Response(JSON.stringify(property), {
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