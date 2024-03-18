import { ArrowDown2, Notification, SearchNormal, Setting2 } from "iconsax-react";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../lib/apis";
import { EXAMPLE_USER } from "../lib/definitions";
import { useNavigate } from "react-router-dom";

function TopBar() {
    const [user, setUser] = useState(EXAMPLE_USER);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCurrentUser() {
            try {
                const currentUser = await getCurrentUser();
                setUser(currentUser!.data);
            } catch (error) {
                navigate('/auth/login');
            }
        }
        fetchCurrentUser();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="hidden lg:flex fixed w-full h-24 z-10">
            <div className="md:w-1/5 bg-white py-5 px-5">
                <a href="/" className="lg:flex items-end gap-3">
                    <img src={`/logo-icon.png`} alt="logo" />
                    <h1 className="text-3xl font-thin">
                        <span className="font-bold">Pizza</span>
                        <span>mart</span>
                    </h1>
                </a>
            </div>

            <div className="md:w-4/5 px-10 bg-grey flex items-center gap-x-8 border-b">
                <div className="flex-1 flex items-center text-inactive">
                    <div className="mr-3 relative p-3">
                        <div className="absolute top-0 right-0 bg-primary-500 w-5 h-5 text-white text-sm text-center rounded-full">5</div>
                        <Notification />
                    </div>
                    <Setting2 />
                </div>
                <div className="bg-white flex items-center px-3 rounded-full text-inactive shadow-md">
                    <input
                        type="text"
                        name="keyword"
                        placeholder="Search"
                        className="p-2 rounded-full outline-none text-black" />
                    <SearchNormal />
                </div>
                <div className="flex items-center text-md gap-2">
                    <img
                        src={user.avatar}
                        alt="avatar"
                        className="rounded-full w-12 h-12" />
                    <p className="text-inactive">Hello,</p>
                    <p className="">{user.full_name}</p>
                    <ArrowDown2 className="text-inactive" size={16} />
                </div>
            </div>
        </div>);
}

export default TopBar;