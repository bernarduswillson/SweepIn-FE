interface SubmitButtonProps {
  text: String,
  disable?: Boolean,
  onClick?: () => void
};

const SubmitButton = (props: SubmitButtonProps):JSX.Element => {
  const { text, disable, onClick } = props;

  return (
    <button 
      onClick={onClick} 
      disabled={!!disable} 
      className={`w-full py-3 px-5 flex justify-center items-center bg-blue_main text-white rounded-lg
      ${disable ? 'opacity-50' : 'opacity-100 hover:bg-blue_dark'} text-xl poppins-bold button-animation`}
    >
      {text}
    </button>
  )
}

export default SubmitButton;