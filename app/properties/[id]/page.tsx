"use client";

interface PropertiesPageforIDProps {
  params : {
    id : string
  }
}

const PropertiesPageforID = ({
  params
}: PropertiesPageforIDProps) => {
  return (
    <div> PropertiesPage of {params.id}</div>
  )
}

export default PropertiesPageforID