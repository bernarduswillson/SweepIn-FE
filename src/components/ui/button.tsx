interface ButtonProps {
  text: String,
  color: 'green' | 'white',
  disable?: Boolean,
  onClick?: () => void
};

const Button = (props: ButtonProps):JSX.Element => {
  const { text, color, disable, onClick } = props;

  return (
    <button 
      onClick={onClick} 
      disabled={!!disable} 
      className={`w-full py-2 px-5 flex justify-center items-center 
      ${color === 'green' ? 
      `bg-green_main rounded-xl text-white ${disable ? '' : 'hover:bg-green_dark'}` : 
        `bg-white rounded-xl text-blue_main ${disable ? '' : 'hover:bg-grey_bg'}`} 
      ${disable ? 'opacity-50' : 'opacity-100'} poppins-medium button-animation`}
    >
      {text}
    </button>
  )
}

export default Button;