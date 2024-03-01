import Link from "next/link";

interface infoboxProps {
  backgroundColor : string,
  title : string,
  description :string,
  buttonInfo : {
    text : string,
    link : string,
    backgroundColor : string
  }
}

const InfoBox = ( {
        backgroundColor = "bg-gray-100", 
        title, 
        description, 
        buttonInfo
}: infoboxProps ) => {

  return (
    <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-2 mb-4">
        {description}
      </p>
      <Link
        href={buttonInfo.link}
        className={`inline-block ${buttonInfo.backgroundColor} text-white rounded-lg px-4 py-2 hover:bg-gray-700`}
      >
        {buttonInfo.text}
      </Link>
    </div>
  );
};

export default InfoBox;
