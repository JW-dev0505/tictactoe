import { type FC } from "react"
import { PannelProps } from "./Pannel.types"
import Circle from "./dry-clean.png"
import Cross from "./close.png"

import "./Pannel.css"

const Pannel: FC<PannelProps> = ({ value, handleClick }) => {
  return (
    // className="flex justify-center align-middle w-12 h-12 sm:w-16 md:w-20 sm:h-16 md:h-20 bg-amber-100 border-2 border-gray-500"

    <div 
      className="pannel"
      onClick={handleClick}
    >
      {value !== 0 && <img src={value === 1 ? Circle : Cross} alt=""/>}
    </div>
  )
}

export default Pannel
