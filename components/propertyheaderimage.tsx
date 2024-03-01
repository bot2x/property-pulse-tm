import Image from "next/image";
import Link from "next/link";
import {
    FaArrowLeft
} from "react-icons/fa";
import MyIcon from "./geticon";


type propertyHeaderImageProp = {
    image: string;
};

const PropertyHeaderImage = ({ image }: propertyHeaderImageProp) => {
    return (
        <>
            <section>
                <div className="m-auto">
                    <div className="grid grid-cols-1">
                        <Image
                            src={`/images/properties/${image}`}
                            alt="Property Image"
                            className="object-cover h-[400px] w-full"
                            width={0}
                            height={0}
                            sizes={"100vw"}
                            priority={true}
                        />
                    </div>
                </div>
            </section>
            <section>
                <div className="container m-auto py-6 px-6">
                    <Link
                        href="/properties"
                        className="text-blue-500 hover:text-blue-600 flex items-center"
                    >
                        <MyIcon faIcon={FaArrowLeft} className="mr-2" /> Go to Properties
                    </Link>
                </div>
            </section>
        </>
    );
};

export default PropertyHeaderImage;
