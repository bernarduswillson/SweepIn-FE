interface ButtonProps {
  text: String,
}

const Button = (props: ButtonProps):JSX.Element => {
  const { text } = props;
  
  return (
    <button className='w-full h-full bg-green_main rounded-xl text-white poppins-medium button-animation hover:bg-green_dark'>{text}</button>
  )
}

export default Button;