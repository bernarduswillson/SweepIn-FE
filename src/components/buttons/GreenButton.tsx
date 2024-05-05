import ButtonProps from "@/interface/props/ButtonProps";

function GreenButton(props: ButtonProps) {
  const { text, type, size, roundness, onClick} = props;

  const color = `${type === "primary" && 'bg-secondary-500 border-secondary-500 border-2 text-neutral-100 hover:bg-secondary-700 hover:border-secondary-700'} ${type === 'secondary' && 'bg-transparent border-secondary-500 border-2 text-secondary-500 hover:bg-secondary-500 hover:text-neutral-100'}`
  const spacing = `${size === "small" && 'px-4 py-1'} ${size === 'medium' && 'px-7 py-3'}`; 
  const textSize = `${size === 'small' && 'body-m'} ${size === 'medium' && 'body-m'}`
  const round = `${roundness === "round" && 'rounded-full'} ${roundness === "square" && 'rounded-xl'}`;
  
  return (
    <div 
      className={`w-full h-fit text-center ${color} ${spacing} ${round} flex justify-center items-center cursor-pointer transition-fast`}
      onClick={onClick}
    >
      <span className={`${textSize}`}>{text}</span>
    </div>
  );
};

export default GreenButton;