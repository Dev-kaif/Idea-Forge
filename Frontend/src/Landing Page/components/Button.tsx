import { ReactElement } from "react"

interface buttonProps{
    text :string ,
    variant?:string,
    icon?:ReactElement,
}




const Button = ({text ,icon,variant}:buttonProps) => {
  return (
    <div>    
        <div className={`${variant} flex items-center cursor-pointer rounded-full gap-2 px-4 py-2`}>
            <div>{text}</div>
            {icon}
        </div>
    </div>
  )
}

export default Button
