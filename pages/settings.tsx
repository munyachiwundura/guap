import { NextPage } from 'next';
import Image from 'next/image';
import SettingButton from '../components/settingButton';
import { AppContext } from '../context';
import {useContext, useState} from 'react'

const Settings: NextPage = () => {
  const {state, dispatch} = useContext(AppContext)
  const [notifications, setNotifications] = useState(false)
  const [sync, setSync] = useState(false)

  const turnDark = () => {
    dispatch({
      type: state.dark? "LIGHT_MODE" : 'DARK_MODE'
  })
  }

  return (
    <main className='dark:bg-white/10 md:pt-[200px] bg-black/5 md:ml-[130px] pt-16 md:mr-auto dark:text-white  min-h-[90vh] mt-16 md:grid md:grid-cols-2 md:grid-rows-2 gap-6 p-8 pb-[300px] md:pb-0 z-10 relative w-[80vw] rounded'>
    <h1 className='text-3xl absolute w-full text-center font-bold top-6'>Settings</h1>
    <section>
        <h1 className='text-3xl'>Account</h1>
        <div className='flex items-center mb-5'>
            <div>
                <Image alt='Image of Munyaradzi' className='w-24 h-24 rounded-full' src='/icons/icon.png' width={100} height={100}/>
            </div>
            <div className='ml-6'>
            <p className='text-xl font-bold'>Munyaradzi</p>
            <p className='text-xs'>munyachiwundura1999@gmail.com</p>
            </div>
        </div>
        <SettingButton active={false} icon='tools' onClick={()=> console.log('')} title='Manage Account' toggle={false}/>
        <SettingButton active={false} icon='box-arrow-left' onClick={()=> console.log('')} title='Sign Out' toggle={false}/>
    </section>
    <section>
        <h1 className='text-3xl'>Preferences</h1>
        <SettingButton active={notifications} icon='bell' onClick={()=> setNotifications(!notifications)} title='Notifications' toggle={true}/>
        <SettingButton active={state.dark} icon='moon' onClick={()=> turnDark()} title='Night Mode' toggle={true}/>
        <SettingButton active={sync} icon='arrow-repeat' onClick={()=> setSync(!sync)} title='Sync' toggle={true}/>
        <h1 className='text-3xl mt-5'>Help</h1>
        <SettingButton active={false} icon='info-circle' onClick={()=> console.log('')} title='Help' toggle={false}/>

    </section>
    </main>
  )
}

export default Settings