import { ReactElement } from "react"

interface buttonProps{
    text :string ,
    variant?:string,
    icon?:ReactElement,
    sidebar?:boolean
}




const Button = ({text ,icon,variant,sidebar}:buttonProps) => {
  return (
    <div>    
        <div className={`${variant} ${sidebar && "gap-5 my-3 text-xl hover:bg-zinc-500"} md:flex flex items-center cursor-pointer rounded-lg text-sm gap-2 px-4 py-2`}>
            {icon}
            <div>{text}</div>
        </div>
    </div>
  )
}

export default Button
