import ButtonProps from "@/interface/props/ButtonProps";

function BlueButton(props: ButtonProps) {
  const { text, type, size, roundness, onClick} = props;

  const color = `${type === "primary" && 'bg-primary-500 border-primary-500 border-2 text-neutral-100 hover:bg-primary-700 hover:border-primary-700'} ${type === 'secondary' && 'bg-transparent border-primary-500 border-2 text-secondary-500 hover:bg-primary-500 hover:text-neutral-100'}`
  const spacing = `${size === "small" && 'px-4 py-1'} ${size === 'medium' && 'px-7 py-3'}`; 
  const textSize = `${size === 'small' && 'body-m'} ${size === 'medium' && 'body-m'}`
  const round = `${roundness === "round" && 'rounded-full'} ${roundness === "square" && 'rounded-xl'}`;
  
  return (
    <div 
      className={`w-full h-fit ${color} ${spacing} ${round} flex justify-center items-center cursor-pointer transition-fast`}
      onClick={onClick}
    >
      <span className={`${textSize}`}>{text}</span>
    </div>
  );
};

export default BlueButton;