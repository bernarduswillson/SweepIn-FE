import React from 'react'
import { motion } from 'framer-motion'
import SweepLoader from './loaders/SweepLoader'

const PreLoader = () => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60"
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1,
        transition: {
          ease: 'easeInOut',
          duration: 0.5
        }
      }}
      exit={{
        opacity: 0,
        transition: {
          ease: 'easeInOut',
          duration: 0.5
        }
      }}
    >
      <SweepLoader />
    </motion.div>
  )
}

export default PreLoader
