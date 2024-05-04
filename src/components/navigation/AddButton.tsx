import { useState } from "react";
import { Variants, motion } from "framer-motion";

import GreenButton from "../buttons/GreenButton";
import PlusIcon from "../icons/PlusIcon";
import Link from "next/link";

interface AddButtonProps {
  active: 'presensi' | 'laporan'
  attendaceStatus?: number
}

function AddButton(props: AddButtonProps) {
  const { active, attendaceStatus } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = () => {
    setIsOpen((prev) => (
      !prev
    ));
  }

  const slideUp: Variants = {
    initial: {
      y: 12,
      opacity: 0,
    },
    animate: d => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
        delay: d * 0.1
      }
    })
  }

  return (
    <div onClick={toggleOpen} className="flex flex-col items-center  cursor-pointer">
      {
        isOpen &&
        <div className="">
          { active === 'presensi' &&
          <div className="mb-5 flex flex-col gap-5 items-center">
            { attendaceStatus != 2 &&
            <Link href='/presensi/awal'>
              <motion.div 
                className="w-40"
                variants={slideUp}
                custom={0}
                initial="initial"
                whileInView="animate"
              >
                <GreenButton 
                  text="Presensi Awal" 
                  type="primary"
                  size="small" 
                  roundness="round"/>
              </motion.div>
            </Link>
            }

            { attendaceStatus != 0 &&
            <Link href='/presensi/akhir'>
              <motion.div 
                className="w-40"
                variants={slideUp}
                custom={1}
                initial="initial"
                whileInView="animate"
              >
                <GreenButton 
                  text="Presensi Akhir"
                  type="primary"
                  size="small"
                  roundness="round"/>
              </motion.div>
            </Link>
            }
          </div>
          }

          { active === 'laporan' &&
          <div className="mb-5 flex flex-col gap-5 items-center">
            <Link href='/laporan/baru'>
              <motion.div 
                className="w-40"
                variants={slideUp}
                custom={2}
                initial="initial"
                whileInView="animate"
              >
                <GreenButton 
                  text="Laporan"
                  type="primary"
                  size="small"
                  roundness="round"/>
              </motion.div>
            </Link>
          </div>
          }
        </div>
      }

      <div className="w-20 h-20 rounded-full flex justify-center items-center bg-secondary-500 transition-fast hover:bg-secondary-700">
        <PlusIcon className="text-neutral-100" width="30" height="30" />
      </div>
    </div>
  )
}

export default AddButton