import { cva, type VariantProps } from 'class-variance-authority'
import { LockKeyhole } from 'lucide-react'
import React, { type ReactNode } from 'react'

const lockWrapperVariants = cva(
    "w-[15px]",
    {
        variants:{
            variant:{
                default:"text-white",
                primary:"text-primary"
            }
        },
        defaultVariants:{
            variant:"default"
        }
    }
)

interface LockWrapperProp extends VariantProps<typeof lockWrapperVariants> {children : ReactNode, disabled?: boolean} 

const LockWrapper : React.FC<LockWrapperProp> = ({children, variant, disabled = false}) => {
  return (
    <div className=' flex items-center justify-center gap-[10px]  ' >
        {disabled && <LockKeyhole className={lockWrapperVariants({variant})} />}
        {children}
    </div>
  )
}

export default LockWrapper