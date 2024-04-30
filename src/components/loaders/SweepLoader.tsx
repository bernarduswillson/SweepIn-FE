import Lottie from 'react-lottie'

// Asset
import sweepLoaderAnimation from '@public/lotties/sweepin-loading.json'

const SweepLoader = (): JSX.Element => {
  // Lottie Configuration
  const sweepLoaderAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: sweepLoaderAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <div className="w-full h-fit flex items-center justify-center">
      <Lottie options={sweepLoaderAnimationOptions} height={120} width={120} />
    </div>
  )
}

export default SweepLoader
