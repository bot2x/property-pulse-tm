import connectDB from "@/dbconfig/database";
import Property, { IProperty } from "@/models/Property";
import { getUserFromSession } from "@/utils/getUserFromSession";
import cloudinary from "@/dbconfig/cloudinary";


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
        console.log("call on : ", request.url);

        await connectDB;
        const userSession = await getUserFromSession();

        if (!userSession || !userSession.userId) {
            return new Response("User data missing.", {
                status : 403
            });
        }

        const { user, userId } = userSession;

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

        const propertyData: Omit<IProperty, "_id" | "createdAt" | "updatedAt" > = {
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
            seller_info: {
                name: formData.get("seller_info.name") as string,
                email: formData.get("seller_info.email") as string,
                phone: formData.get("seller_info.phone") as string,
            },
            owner : userId,
            images : []
        }

        //We need to upload the images to cloudinaary and store the returned urls in the propertydata on db.
        const uploadImagePromises = [];

        for (const image of images) {
            const imageBuffer = await image.arrayBuffer();
            const imageArray = Array.from(new Uint8Array(imageBuffer));
            const imageData = Buffer.from(imageArray);

            //converty to base64
            const imageBase64 = imageData.toString('base64');

            const result = cloudinary.uploader.upload(
                `data:image/png;base64,${imageBase64}`, {
                    folder : "propertyPulseTs"
                }
            );

            uploadImagePromises.push(result);
        }

        const uploadedImages = (await Promise.all(uploadImagePromises)).map((res) => {
            return res.secure_url;
        });
        
        // console.log({
        //     DEBUG_IMAGES : {
        //         ui : uploadedImages,
        //         uip : uploadImagePromises
        //     }
        // });
        
        propertyData.images = uploadedImages; //add the urls.

        console.log(propertyData);

        const newProperty = new Property(propertyData);
        await newProperty.save();

        return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`);

        // return new Response(JSON.stringify({ message: "data received" }), {
        //     status: 200
        // });

    } catch (error) {
        return new Response(JSON.stringify({ message: "Failed to post" }), {
            status: 500
        });
    }
}