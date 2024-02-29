import Image from "next/image";
import Hero from "@/components/hero";
import InfoBoxes from "@/components/infoboxes";
import Homeproperties from "@/components/homeproperties";
// import connectDB from "@/dbconfig/database";
 

export default function Home() {

  return (
    <div>
      <Hero />
      <InfoBoxes />
      <Homeproperties />
    </div>
  );
};
