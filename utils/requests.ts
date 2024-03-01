// import { IProperty } from '@/models/Property';
// import { revalidatePath } from 'next/cache'
import { IProperty } from '@/models/Property';
import { unstable_noStore as noStore } from 'next/cache';


const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;


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

export { fetchProperties }