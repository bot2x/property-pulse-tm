// "use client";

// import properties from "@/properties.json";
import PropertyCard from "@/components/propertycard";
import LoadingPage from "@/app/loading";
import { IProperty } from "@/models/Property";


import { revalidatePath } from 'next/cache'
import { unstable_noStore as noStore } from 'next/cache';

async function fetchProperties() {

  console.log("<DEBUG> I got callled.....");
  try {
    // revalidatePath(`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`);
    noStore();
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`);
    
    // for (let h of resp.headers.keys()) {
    //   console.log(h);
    // }

    // console.log({
    //   "DEBUG" : {
    //       "resp_obj" : resp,
    //       "headers" : resp.headers.get("content-type"),
    //       "body" : resp.body,
    //       "status" : resp.status,
    //       "url" : resp.url,
    //       "redirected" : resp.redirected
    //   }
    // });

    if (!resp.ok) {
      throw new Error("Failed to fetch data.");
    }


    const resp_json = resp.json();

    // console.log("<DEBUG> Received the following response : ");
    // console.log(resp_json);

    return resp_json;
  
  } catch (error) {
    console.log(error);
  }
};


const PropertiesPage = async () => {
  // console.log(properties);
  // const properties = [];
  // return <LoadingPage />

  
  // let sum = 0;
  // for (let i = 0; i < 1000000000; i++) {
  //   sum += i;
  // };
  // console.log(sum);

  // const properties = [(await fetchProperties())[0]];
  const properties = await fetchProperties();

  // console.log({
  //   DEBUG : JSON.stringify(properties)
  // });

  // console.log(properties[0].name);


  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 
        ? (<div>No properties available.</div>) 
        : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property : IProperty) => (
              <PropertyCard 
                key={property._id}
                propertyInfo = {property}
              />
              // <div>{property.name} </div>
            ))}
          </div>
        )}
        
      </div>
    </section>
  )
};

export default PropertiesPage;
