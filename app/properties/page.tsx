// "use client";

// import properties from "@/properties.json";
import PropertyCard from "@/components/propertycard";
import { IProperty } from "@/models/Property";

import { fetchProperties } from "@/utils/requests";



const PropertiesPage = async () => {
  const properties = await fetchProperties();

  properties.sort((a : IProperty, b : IProperty) : number =>
    new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
  );

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
