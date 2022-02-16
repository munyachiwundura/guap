import { FunctionComponent } from "react"
import NavItem from "./navItem"
import { useRouter } from "next/router"

const SideNavigation: FunctionComponent = () => {
  const router = useRouter()
  console.log(router.pathname)
  return (
    <nav className="flex flex-col h-screen fixed top-0 left-0 p-4 items-center justify-between z-30 ">
        <h1 className="dark:text-white text-3xl font-bold">GUAP</h1>
        <ul className="left-0 w-[100vw] dark:bg-black dark:text-white py-8 bottom-0 bg-white md:w-auto md:flex-col  flex-row md:relative absolute  mt-10 flex  justify-evenly">
            <NavItem href="/" title="Home" icon={router.pathname === '/'? "grid-fill": 'grid'}/>
            <NavItem href="/wallet" title="Wallet" icon={router.pathname === '/wallet'? "wallet-fill": 'wallet'}/>
            <NavItem href="/calendar" title="Calendar" icon={router.pathname === '/calendar'? "calendar-fill": 'calendar'}/>
            <NavItem href="/settings" title="Settings" icon={router.pathname === '/settings'? "gear-fill": 'gear'}/>
            <NavItem href="/logout" title="Logout" icon="box-arrow-left"/>
        </ul>
    </nav>
  )
}

export default SideNavigation