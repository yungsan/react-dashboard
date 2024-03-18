import Breadcrumb from "./ui/breadcrumb";
import SideNav from "./ui/sidenav";
import TopBar from "./ui/topBar";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import TopBarMobile from "./ui/topBarMobile";
import { createContext, useState, Dispatch, SetStateAction } from "react";
import { getAccessToken } from "./lib/untils";

interface SidenavContextType {
  context: boolean,
  setContext: Dispatch<SetStateAction<boolean>>
}

export const SidenavContext = createContext<SidenavContextType>({
  context: true,
  setContext: () => { }
})

function App() {
  const location = useLocation();
  const [showSideNav, setShowSideNav] = useState<boolean>(false);
  const pages = location.pathname.slice(1);
  const auth = getAccessToken();

  return auth ? (
    <SidenavContext.Provider value={{ context: showSideNav, setContext: setShowSideNav }}>
      <TopBar />
      <TopBarMobile />
      <div className="bg-white flex pt-24 w-full">
        <SideNav />
        <div className="lg:pl-[20%] pt-8 pb-12 bg-grey w-full md:w-full min-h-screen">
          <div className="px-2 md:px-[3.25rem]">
            <Breadcrumb pages={pages.split('/')} />
            <Outlet />
          </div>
        </div>
      </div>
    </SidenavContext.Provider>
  ) : <Navigate to="/auth/login" />
}

export default App;
