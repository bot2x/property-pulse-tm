// import { revalidatePath } from 'next/cache'
import { IProperty } from '@/models/Property';
import { unstable_noStore as noStore } from 'next/cache';


const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

//fetch all properties.
async function fetchProperties() : Promise<Array<IProperty>> {
    // console.log("<DEBUG> I got callled.....");
    try {
        if (!apiDomain) {
            return [];
        }
        // revalidatePath(`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`);
        noStore();
        const resp = await fetch(`${apiDomain}/properties`);
        
        if (!resp.ok) {
            throw new Error("Failed to fetch data.");
        }

        return resp.json();
    } catch (error) {
        console.log(error);
        return [];
    }
};


//fetch a property by its id
async function fetchPropertyById( id : string) : Promise<IProperty | null> {
    // console.log("<DEBUG> I got callled.....");
    try {
        if (!apiDomain) {
            return null;
        }
        // revalidatePath(`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`);
        noStore();
        const resp = await fetch(`${apiDomain}/properties/${id}`);
        
        if (!resp.ok) {
            throw new Error("Failed to fetch data.");
        }

        return resp.json();
    } catch (error) {
        console.log(error);
        return null;
    }
};


export { fetchProperties, fetchPropertyById }