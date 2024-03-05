import connectDB from "@/dbconfig/database";
import Property, { IProperty } from "@/models/Property";


export const GET = async (request: Request) => {
    try {
        await connectDB();
        const properties = await Property.find({});

        return new Response(JSON.stringify(properties), {
            status: 200,
            headers: {
                "content-type": "application/json"
            }
        });
        // return Response.json(properties);
    } catch (error) {
        console.log(error);
        return new Response("Something went wrong", {
            status: 500
        });
    };
};


export const POST = async (request: Request) => {
    try {
        const formData = await request.formData();
        // console.log(formData);
        // console.log({
        //     form_data : {
        //         type : formData.get("type"),
        //         name : formData.get("name"),
        //         keys : [...formData.keys()],
        //         entries : [...formData.entries()].flat(1),        
        //     }
        // })
        const amenities = formData.getAll("amenities") as string[];
        let images = (formData.getAll("images") as any[]).filter((image) => image.name !== '');

        const propertyData: Omit<IProperty, "_id" | "owner" | "createdAt" | "updatedAt"> = {
            type: formData.get("type") as string,
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            location: {
                street: formData.get("location.street") as string,
                city: formData.get("location.city") as string,
                state: formData.get("location.state") as string,
                zipcode: formData.get("location.zipcode") as string
            },
            rates: {
                nightly: formData.get("rates.nightly") ? parseInt(formData.get("rates.nightly") as string) : undefined,
                weekly: formData.get("rates.weekly") ? parseInt(formData.get("rates.weekly") as string) : undefined,
                monthly: formData.get("rates.monthly") ? parseInt(formData.get("rates.monthly") as string) : undefined,
            },
            beds: parseInt(formData.get("beds") as string),
            baths: parseInt(formData.get("baths") as string),
            square_feet: parseInt(formData.get("square_feet") as string),
            amenities,
            images,
            seller_info: {
                name: formData.get("seller_info.name") as string,
                email: formData.get("seller_info.email") as string,
                phone: formData.get("seller_info.phone") as string,
            }
        }
        console.log(propertyData);

        return new Response(JSON.stringify({ message: "data received" }), {
            status: 200
        });

    } catch (error) {
        return new Response(JSON.stringify({ message: "Failed to post" }), {
            status: 500
        });
    }
}