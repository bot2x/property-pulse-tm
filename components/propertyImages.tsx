import Image from "next/image";


const PropertyImages = ({ images }: {
  images?: string[]
}) => {

  if (!images) {
    return (
      <div>
        No images for this properties at the momement.
      </div>
    )
  };

  const displayImages = images.map((image) => (
    image.startsWith("http")
    ? image 
    : `/images/properties/${image}`
  ));

  return (
    <section className="bg-blue-50 p-4">
      <div className="container mx-auto">
        {images.length === 1 ? (
          <Image
            src={displayImages[0]}
            alt=''
            height={400}
            width={1800}
            className="object-cover h-[400px] mx-auto rounded-xl"
            priority={true}
          />
        ) : (
          <div className="grid grid-col-2 gap-4">
            {displayImages.map((image, index) => (
              <div
                key={index}
                className={`
                  ${images.length === 3 && index === 2
                    ? 'col-span-2'
                    : 'col-span-1'} 
                `}
              >
                <Image
                  src={image}
                  alt=''
                  height={400}
                  width={1800}
                  className="object-cover h-[400px] w-full rounded-xl"
                  priority={true}
                />
              </div>
            ))}
          </div>


        )}
      </div>
    </section>
  );
};

export default PropertyImages;