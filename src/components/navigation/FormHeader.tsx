import { useRouter } from "next/navigation";
import BackIcon from "../icons/BackIcon";

interface FormHeaderProps {
  title: string,
  backDestination: string
};

const FormHeader = (props: FormHeaderProps) => {
  const { title, backDestination } = props;

  const route = useRouter();

  // Handle back
  const handleBack = () => {
    route.push(backDestination);
  }

  return (
    <div className="relative w-11/12 flex justify-center items-center">
      <div 
        className="absolute left-0 cursor-pointer"
        onClick={handleBack}
      >
        <BackIcon className="text-neutral-100" width="1.8rem" />
      </div>

      <h1 className="header-3 text-neutral-100">{title}</h1>
    </div>
  );
};

export default FormHeader;