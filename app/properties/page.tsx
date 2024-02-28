import properties from "@/properties.json";
import PropertyCard from "@/components/propertycard";
import LoadingPage from "@/app/loading";

const PropertiesPage = () => {
  // console.log(properties);
  // const properties = [];
  // return <LoadingPage />

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 
        ? (<div>No properties available.</div>) 
        : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
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
