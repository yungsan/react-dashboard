import MyButton from "../../components/button";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { login } from "../../lib/apis";
import { Roles, Routes, isLoggedIn, setAuth } from "../../lib/untils";
import { Box, CircularProgress } from "@mui/material";
import InputLabel from "../../components/inputLabel";
import AlertDialog from "../../components/alertDialog";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    if (isLoggedIn()) {
        return <Navigate to="/" replace />;
    }
    const items = [
        {
            label: 'Email',
            type: 'email',
            width: 'full',
            value: email,
            setValue: setEmail
        },
        {
            label: 'Password',
            type: 'password',
            width: 'full',
            value: password,
            setValue: setPassword
        },
    ];

    const loading = (
        <div className="w-full flex justify-center">
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        </div>
    );

    const submitButton = (
        <div className="w-full">
            <MyButton text="Sign Up" width="full" rounded="full" onClick={() => handleClick()} />
        </div>
    );

    const handleClick = async () => {

        setIsLoading(true);

        const data = {
            email,
            password,
        };

        try {

            const user = await login(data);
            const role = user.data['user']['role'];

            if (role !== Roles.customer) {

                const token = user.data['access_token'];
                const expires = user.data['expires_in'];

                setAuth(token, expires);
                navigate('/');

                return;
            }

            setOpen(true);
            setIsLoading(false);

        } catch (error) {
            alert('Login error ' + error);
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white text-center flex bg-cover w-full my-auto min-h-screen">
            <div className="w-full md:w-1/2 px-8 py-8 flex flex-wrap justify-between content-baseline gap-y-8">
                <h1 className="text-3xl font-bold w-full mt-8">Login</h1>
                {
                    items.map((item, index) => <InputLabel key={index} item={item} />)

                }
                <div className="w-full text-right">
                    <Link to={Routes.register}>
                        Don't have an account?
                        <span className="underline px-1 font-semibold text-primary-500">
                            Sign up
                        </span>
                    </Link>
                </div>
                {
                    isLoading ? loading : submitButton
                }
                {
                    <AlertDialog
                        open={open}
                        setOpen={setOpen}
                        title="Something's wrong?"
                        content="We're unable to locate your shop account at this time. This means you may not be able to access certain features or functionalities."
                    />
                }
            </div>
            <div className="w-1/2 bg-form bg-cover hidden lg:block"></div>
        </div>
    );
}

export default Login;
