import clsx from "clsx";
import {
    Box,
    Category,
    ClipboardText,
    Home2,
    Lock1,
    Logout,
    Menu,
    Profile2User,
    TrendUp,
} from "iconsax-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AlertDialog from "../components/alertDialog";
import { logout } from "../lib/apis";
import { SidenavContext } from "../App";

const links = [
    {
        name: 'Dashboard',
        href: '/',
        icon: <Home2 size={25} />
    },
    {
        name: 'Products',
        href: '/products',
        icon: <Category />,
    },
    {
        name: 'Categories',
        href: '/categories',
        icon: <Menu />
    },
    {
        name: 'Orders',
        href: '/orders',
        icon: <ClipboardText />
    },
    {
        name: 'Users Manager',
        href: '/users',
        icon: <Profile2User />
    },
    {
        name: 'Inventory',
        href: '/inventory',
        icon: <Box />
    },
    {
        name: 'Permissions',
        href: '/permissions',
        icon: <Lock1 />
    },
    {
        name: 'Reporting & Analytics',
        href: '/report',
        icon: <TrendUp />
    },
];

function SideNav() {
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const sidenav = useContext(SidenavContext);

    const handleLogOut = async () => {
        await logout();
        setOpen(true);
        navigate('/auth/login');
    }

    return (
        <>
            <AlertDialog open={open} setOpen={setOpen} title="Logout successful!" content="See you again" />
            <ul className={clsx(
                `lg:w-1/5 h-full pr-4 fixed z-10 border lg:border-0 bg-white w-full lg:left-0 transition-all`,
                {
                    'left-0': sidenav.context == true,
                    '-left-full': sidenav.context == false
                }
            )}>
                {links.map((item) => {
                    return (
                        <li key={item.name}>
                            <Link
                                to={item.href}
                                className={clsx(
                                    "px-5 py-4 flex items-center gap-3 text-inactive text-base",
                                    {
                                        'rounded-r-full bg-primary-500 text-white': item.href === location.pathname
                                    }
                                )}
                                onClick={() => sidenav.setContext(false)}
                            >
                                {item.icon}
                                <span className="sm:text-xl md:text-base">
                                    {item.name}
                                </span>
                            </Link>
                        </li>
                    );
                })}
                <li>
                    <button className="px-5 py-4 w-full flex items-center gap-3 text-inactive text-base" onClick={handleLogOut}>
                        <Logout />
                        <span>Log Out</span>
                    </button>
                </li>
            </ul>
        </>
    );


}

export default SideNav;