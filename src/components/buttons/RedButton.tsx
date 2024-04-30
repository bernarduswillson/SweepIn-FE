import ButtonProps from "@/interface/props/ButtonProps";

function RedButton(props: ButtonProps) {
  const { text, type, size, roundness, onClick} = props;

  const color = `${type === "primary" && 'bg-error-500 border-error-500 border-2 text-neutral-100 hover:bg-error-700 hover:border-error-700'} ${type === 'secondary' && 'bg-transparent border-error-500 border-2 text-error-500 hover:bg-error-500 hover:text-neutral-100'}`
  const round = `${roundness === "round" && 'rounded-full'} ${roundness === "square" && 'rounded-xl'}`;
  const textSize = `${size === 'small' && 'body-m'} ${size === 'medium' && 'body-m'}`
  const spacing = `${size === "small" && 'px-4 py-1'} ${size === 'medium' && 'px-7 py-3'}`; 

  return (
    <div 
      className={`w-full h-fit  ${color} ${spacing} ${round} flex justify-center items-center cursor-pointer transition-fast`}
      onClick={onClick}  
    >
      <span className={`${textSize}`}>{text}</span>
    </div>
  );
};

export default RedButton;