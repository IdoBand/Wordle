import { MoonLoader } from "react-spinners";
import { flexCenter } from "../_mixin";
interface SpinnerProps {
    className: string
}
const Spinner = ({className}: SpinnerProps) => {
  return (
    <div className={`${flexCenter} h-auto ${className}`}>
        <MoonLoader color='white' size={25}/>
    </div>
  )
}

export default Spinner