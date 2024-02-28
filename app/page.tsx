import Image from "next/image";
import Hero from "@/components/hero";
import Footer from "@/components/footer";
import InfoBoxes from "@/components/infoboxes";


export default function Home() {
  return (
    <div>
      <Hero />
      <InfoBoxes />
      <Footer />
    </div>
  );
}
