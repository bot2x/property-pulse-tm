import Image from "next/image";
import Hero from "@/components/hero";
import InfoBoxes from "@/components/infoboxes";
import Homeproperties from "@/components/homeproperties";
 

export default function Home() {
  return (
    <div>
      <Hero />
      <InfoBoxes />
      <Homeproperties />
    </div>
  );
}
