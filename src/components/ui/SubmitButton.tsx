import Lottie from 'react-lottie';

// Asset
import spinnerLoaderAnimation from '@public/lotties/spinner-loading.json';

interface SubmitButtonProps {
  text: string,
  disable?: boolean,
  onClick?: () => void,
  loading?: boolean
};

const SubmitButton = (props: SubmitButtonProps):JSX.Element => {
  const { text, disable, onClick, loading } = props;

  // Lottie Configuration
  const spinnerLoaderAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: spinnerLoaderAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <button 
      onClick={onClick} 
      disabled={!!disable || loading} 
      className={`w-full h-full py-3 flex gap-5 justify-center items-center bg-blue_main text-white rounded-lg
      ${disable || loading ? 'opacity-50' : 'opacity-100 hover:bg-blue_dark'} text-xl poppins-bold button-animation`}
    >
      {
        loading ?
        <div>
          <Lottie 
          options={spinnerLoaderAnimationOptions}
          height={30}
          width={30}
          /> 
        </div> :
        null
      }
      <span>{loading ? 'Mengirim' : "Kirim"}</span>
    </button>
  )
}

export default SubmitButton;