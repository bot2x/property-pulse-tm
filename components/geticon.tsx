import { IconType } from "react-icons"

interface myIconProps {
    className : string,
    faIcon : IconType//IconBaseProps
}

const MyIcon = ({
    className,
    faIcon
}: myIconProps) => {
  
    const IconComponent = faIcon;
    return (
    <div className={className}>
        <IconComponent />
    </div>
  );
};

export default MyIcon