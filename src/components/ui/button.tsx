interface ButtonProps {
  text: String,
  disable?: Boolean
};

const Button = (props: ButtonProps):JSX.Element => {
  const { text, disable } = props;
  
  return (
    <button disabled={!!disable} className={`w-full py-2 flex justify-center items-center bg-green_main rounded-xl text-white poppins-medium button-animation ${disable ? 'opacity-50' : 'opacity-100 hover:bg-green_dark'}`}>{text}</button>
  )
}

export default Button;