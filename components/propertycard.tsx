import Image from "next/image";
import Link from "next/link";
import {
    FaBed,
    FaBath,
    FaRulerCombined,
    FaMoneyBill,
    FaMapMarker
} from "react-icons/fa";

import { IProperty } from "@/models/Property";
import MyIcon from "./geticon";

interface propertyCardProps {
    propertyInfo : IProperty
}

const PropertyCard = ( {
    propertyInfo
}: propertyCardProps ) => {
    const { rates } = propertyInfo;

    // console.log(propertyInfo.createdAt);

    const rateDisplay = () => {
        if (rates?.monthly) {
            return `${rates.monthly.toLocaleString()}/mo`;
        } else if (rates?.weekly) {
            return `${rates.weekly.toLocaleString()}/wk`;
        } else if (rates?.nightly) {
            return `${rates.nightly.toLocaleString()}/night`;
        }
    };

    return (
        <div className="rounded-xl shadow-md relative">
            <Image
                src={`/images/properties/${propertyInfo.images[0]}`}
                alt=""
                width={0}
                height={0}
                sizes={"100vw"}
                className="w-full h-auto rounded-t-xl"
            />
            <div className="p-4">
                <div className="text-left md:text-center lg:text-left mb-6">
                    <div className="text-gray-600">{propertyInfo.type}</div>
                    <h3 className="text-xl font-bold">{propertyInfo.name}</h3>
                </div>
                <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
                    ${rateDisplay()}
                </h3>

                <div className="flex justify-center gap-4 text-gray-500 mb-4">
                    <div>
                        <div className="inline mr-2"><FaBed/></div> {propertyInfo.beds}{" "}
                        <span className="md:hidden lg:inline">Beds</span>
                    </div>
                    <div>
                        <div className="inline mr-2"><FaBath/></div> {propertyInfo.baths}{" "}
                        <span className="md:hidden lg:inline">Baths</span>
                    </div>
                    <div>
                        <div className="inline mr-2"><FaRulerCombined/></div>
                        {propertyInfo.square_feet}{" "}
                        <span className="md:hidden lg:inline">sqft</span>
                    </div>
                </div>

                <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
                    {rates?.nightly && (
                        <div>
                            <MyIcon faIcon={FaMoneyBill} className="inline mr-2" /> Nightly
                        </div>
                    )}
                    {rates?.weekly && (
                        <div>
                            <MyIcon faIcon={FaMoneyBill} className="inline mr-2" /> Weekly
                        </div>
                    )}
                    {rates?.monthly && (
                        <div>
                            <MyIcon faIcon={FaMoneyBill} className="inline mr-2" /> Monthly
                        </div>
                    )}
                </div>

                <div className="border border-gray-100 mb-5"></div>

                <div className="flex flex-col lg:flex-row justify-between mb-4">
                    <div className="flex align-middle gap-2 mb-4 lg:mb-0">
                        <MyIcon faIcon={FaMapMarker} className="mt-1 text-orange-700" />
                        <span className="text-orange-700"> {propertyInfo.location?.city}{' '}{propertyInfo.location?.state} </span>
                    </div>
                    <Link
                        href={`/properties/${propertyInfo._id}`}
                        className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                    >
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
