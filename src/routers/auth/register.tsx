import MyButton from "../../components/button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../lib/apis";
import { Routes } from "../../lib/untils";
import InputLabel from "../../components/inputLabel";
import { Box, CircularProgress } from "@mui/material";

function Register() {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [comfirmPassword, setComfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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

    const items = [
        {
            label: 'Full Name',
            type: 'Text',
            width: 'full',
            value: fullName,
            setValue: setFullName
        },
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
        {
            label: 'Confirm Password',
            type: 'password',
            width: 'full',
            value: comfirmPassword,
            setValue: setComfirmPassword
        }
    ];

    const handleClick = async () => {
        setIsLoading(prev => !prev);
        const data = {
            'full_name': fullName,
            email,
            password,
            'password_confirmation': comfirmPassword
        };
        console.log(data);
        try {
            await register(data);
            navigate('/auth/login');
        } catch (error) {
            alert('Register error ' + error)
        }
    };

    console.log(fullName);
    console.log(email);
    console.log(password);
    console.log(comfirmPassword);


    return (
        <div className="bg-white text-center flex bg-cover w-full my-auto min-h-screen">
            <div className="w-1/2 px-8 py-8 flex flex-wrap justify-between content-baseline gap-y-8">
                <h1 className="text-3xl font-bold w-full">Register</h1>
                {
                    items.map((item, index) => <InputLabel key={index} item={item} />)
                }
                <div className="w-full text-right">
                    <Link to={Routes.login} className="flex-1">
                        Already have a account?
                        <span className="underline px-1 font-semibold text-primary-500">
                            Sign in
                        </span>
                    </Link>
                </div>
                {
                    isLoading ? loading : submitButton
                }

            </div>
            <div className="w-1/2 bg-form bg-cover"></div>
        </div>
    );
}

export default Register;