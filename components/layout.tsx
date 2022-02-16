import { FunctionComponent, useContext} from "react"
import SideNavigation from "./sideNavigation"
import { AppContext } from '../context';

const Layout: FunctionComponent = ({children}) => {
  const {state, dispatch} = useContext(AppContext)
  return (
    <div className={`${state.dark && 'dark'}`}>
        <div className=" dark:bg-black transition-all duration-300 relative w-[100%] min-h-screen z-0 flex justify-center">
        <SideNavigation/>
        {children}
        </div>
    </div>
  )
}

export default Layout