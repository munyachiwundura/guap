import {FunctionComponent} from 'react'

type Props = {
label: string,
placeholder: string,
value: string | number | Date,
name: string,
onChange: (e: string | number) => void,
type: string,
}

const Input: FunctionComponent<Props> = (props) => {
  return (
    <div>
        <h3 className='text-md font-bold mt-2'>{props.label}:</h3>
        <input type={props.type} className='dark:bg-black dark:border-white/10 w-full border-2 border-black rounded pl-3' name={props.name} placeholder={props.placeholder} onChange={(e)=> props.onChange(e.target.value)}/>    
    </div>
  )
}

export default Input