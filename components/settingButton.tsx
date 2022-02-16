import { FunctionComponent } from 'react'
import { motion, LayoutGroup } from 'framer-motion'

type Props = {
    title: string,
    icon: string,
    active: boolean,
    toggle: boolean,
    onClick: () => void
}

const SettingButton: FunctionComponent<Props> = (props) => {
  return (
    <motion.button whileTap={{scale: 0.95}} onClick={() => props.onClick()} className='dark:bg-white/10 dark:border-white/20  w-full border-2 mt-5 border-black relative p-1 items-center bg-white rounded flex justify-start text-lg'><i className={`bi bi-${props.icon} mx-3`}> </i>
    {props.title}
    {/* <LayoutGroup> */}

    {props.toggle && <motion.div layout className={`top-[6px] ${props.active? 'bg-blue-900' : 'bg-black'} p-1 w-12 h-6 rounded-full absolute right-2  flex justify-${props.active? 'start': 'end'} items-center`}>
        <motion.div layoutId={props.title}  className='w-4 h-4 rounded-full bg-white'></motion.div>
    </motion.div>}
    {/* </LayoutGroup> */}
    </motion.button>
  )
}

export default SettingButton