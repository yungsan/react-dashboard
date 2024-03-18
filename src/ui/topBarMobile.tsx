import { HambergerMenu, More, Notification, Setting2 } from "iconsax-react";
import { useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/apis";
import { EXAMPLE_USER } from "../lib/definitions";
import { SidenavContext } from "../App";


function TopBarMobile() {
    const [user, setUser] = useState(EXAMPLE_USER);
    const [showMore, setShowMore] = useState(false);
    const sidebar = useContext(SidenavContext);

    useEffect(() => {
        async function fetchCurrentUser() {
            const currentUser = await getCurrentUser();
            setUser(currentUser.data);
        }
        fetchCurrentUser();
    }, []);

    const handleClick = () => {
        sidebar.setContext(prev => !prev);
    }

    return (
        <div className="flex lg:hidden flex-wrap fixed w-full z-10 px-4 bg-white border-b h-24">
            <div className="w-full flex items-center justify-between">
                <div className="">
                    <HambergerMenu onClick={handleClick} />
                </div>
                <div className="flex-1 py-4 px-5">
                    <a href="/" className="flex items-end gap-3 justify-center">
                        <img src={`/logo-icon.png`} alt="logo" />
                        <h1 className="text-3xl font-thin">
                            <span className="font-bold">Pizza</span>
                            <span>mart</span>
                        </h1>
                    </a>
                </div>
                <div className="">
                    <More onClick={() => setShowMore(prev => !prev)} />
                </div>
            </div>
            {showMore && (
                <div className="w-full py-4 z-50 flex items-center ">
                    <div className="flex-1 flex items-center text-inactive">
                        <div className="mr-3 relative p-3">
                            <div className="absolute top-0 right-0 bg-primary-500 w-5 h-5 text-white text-sm text-center rounded-full">5</div>
                            <Notification />
                        </div>
                        <Setting2 />
                    </div>
                    <div className="">
                        <img
                            src={user.avatar}
                            alt="avatar"
                            className="rounded-full w-12 h-12" />
                    </div>
                </div>
            )}
        </div>
    );
}

export default TopBarMobile;