import InfoBox from "./infobox";

const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox 
              backgroundColor="bg-gray-100"
              title="For Renters"
              description="Find your dream rental property. Bookmark properties and contact
              owners."
              buttonInfo={{
                  text : "Browse Properties",
                  link : "/properties",
                  backgroundColor : "bg-black"
              }}
          />
          <InfoBox 
              backgroundColor="bg-blue-100"
              title="For Property Owners"
              description="List your properties and reach potential tenants. Rent as an
              airbnb or long term."
              buttonInfo={{
                  text : "Add Property",
                  link : "/properties/add",
                  backgroundColor : "bg-blue-500"
              }}
          />
        </div>
      </div>
    </section>
  )
}

export default InfoBoxes