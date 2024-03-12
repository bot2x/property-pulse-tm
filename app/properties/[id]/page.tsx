"use client";

import PropertyHeaderImage from "@/components/propertyheaderimage";
import PropertyInfo from "@/components/propertyinfo";
import { IProperty } from "@/models/Property";
import { fetchPropertyById } from "@/utils/requests";
import { useState, useEffect } from "react";
import Spinner from "@/components/spinner";
import PropertyImages from "@/components/propertyImages";

interface PropertiesPageforIDProps {
  params : {
    id : string
  }
}

const PropertiesPageforID = ({
  params
}: PropertiesPageforIDProps) => {

  const { id } = params;

  const [property, setProperty] = useState<IProperty | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async (id : string) => {
      if (!id) return;
      try {
        const property = await fetchPropertyById(id);
        // console.log(property);
        setProperty(property);          
      } catch (error) {
        console.log('Error fetching the property :', error);
      } finally {
        setLoading(false);
      }
    };

    //Ensure we only call this when property is null.
    //Otherwise this will keep calling itself forever.
    if ( property === null) {
      fetchPropertyData(id);
    }

  }, []);
  
  if (!property && !loading) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">Property not found.</h1>
    );
  }

  return (
    <>
      {/* <div> PropertiesPage of {params.id}</div> */}
      {loading 
      ? (<Spinner loading={loading}/>)
      : (
        <>
          <PropertyHeaderImage image={ property?.images[0]! } />
          <PropertyInfo property={property}/>
          <PropertyImages images = {property?.images} />
        </>
      )}
    </>
  );
};

export default PropertiesPageforID;