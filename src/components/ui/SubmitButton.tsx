import Lottie from 'react-lottie'

// Asset
import spinnerLoaderAnimation from '@public/lotties/spinner-loading.json'

interface SubmitButtonProps {
  bgColor?: string
  text: string
  disable?: boolean
  onClick?: () => void
  loading?: boolean
}

const SubmitButton = (props: SubmitButtonProps): JSX.Element => {
  const { bgColor, text, disable, onClick, loading } = props

  // Lottie Configuration
  const spinnerLoaderAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: spinnerLoaderAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <button
      onClick={onClick}
      disabled={!!disable || loading}
      className={`w-full h-10 py-3 flex gap-5 justify-center items-center text-white rounded-md ${bgColor ? `bg-${bgColor}_main` : 'bg-blue_main'}
      ${disable || loading ? 'opacity-50' : `opacity-100 ${bgColor ? `hover:bg-${bgColor}_dark` : 'hover:bg-blue_dark'}`} text-xl poppins-bold button-animation`}
    >
      {loading ? (
        <div>
          <Lottie
            options={spinnerLoaderAnimationOptions}
            height={30}
            width={30}
          />
        </div>
      ) : null}
      <span>{loading ? 'Loading...' : text}</span>
    </button>
  )
}

export default SubmitButton
