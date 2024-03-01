import connectDB from "@/dbconfig/database";
import Property from "@/models/Property";


export const GET = async (request) => {
    try {
        await connectDB();
        const properties =  await Property.find({});

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
    }
}