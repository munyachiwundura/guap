import React, { FunctionComponent } from 'react'

type Props = {
    title: string,
    color:string,
}
const CategoryItem: FunctionComponent<Props> = (props) => {
  return (
    <div className='flex items-center w-24'>
        <div style={{background: props.color}} className='w-2 h-2 rounded mr-2'></div>
        <p>{props.title}</p>
    </div>
  )
}

export default CategoryItem