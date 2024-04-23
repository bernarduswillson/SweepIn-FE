const COLOR_CLASSES = {
  green: 'bg-green_main text-white hover:bg-green_dark',
  white: 'bg-white text-blue_main hover:bg-grey_bg',
  blue: 'bg-blue_main text-white hover:bg-blue_dark',
};

interface ButtonProps {
  text: String;
  color: 'green' | 'white' | 'blue';
  disable?: Boolean;
  onClick?: () => void;
}

const Button = (props: ButtonProps): JSX.Element => {
  const { text, color, disable, onClick } = props;

  const colorClass = COLOR_CLASSES[color] || COLOR_CLASSES.green;

  return (
    <button
      onClick={onClick}
      disabled={!!disable}
      className={`w-full py-2 px-5 flex justify-center items-center rounded-xl
      ${colorClass} ${disable ? '' : ''} // Removed opacity condition to focus on color classes
      ${disable ? 'opacity-50' : 'opacity-100'} poppins-medium button-animation`}
    >
      {text}
    </button>
  );
};

export default Button;
