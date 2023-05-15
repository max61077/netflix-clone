import { useState } from "react"
import axios from "axios"
import Input from "@/components/Input"
import { signIn } from 'next-auth/react'
import { useRouter } from "next/router"

const Auth = () => {
    const router = useRouter()

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [variant, setVariant] = useState<string>('Login')

    const toggleVariant = () => {
        setVariant(variant === 'Login' ? 'Register' : 'Login')
    }

    const login = async () => {
        try {
            const response = await signIn('credentials', {
                email,
                password,
                name,
                callbackUrl: '/profiles'
            })

            if (response?.status === 200) {
                router.push('/')
            }
        } catch (error) {
            console.log(error);
        }
    }

    const register = async () => {
        try {
            const response = await axios.post('/api/register', { email, name, password })

            if (response.status === 200) {
                login()
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-cover bg-fixed">
            <div className="bg-black h-full w-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" alt="Logo" className="h-12" />
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {variant === 'Login' ? 'Sign In' : 'Sign Up'}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {variant !== 'Login' && <Input
                                id="name"
                                label="Username"
                                onChange={(e: any) => setName(e.target.value)}
                                value={name}
                            />}
                            <Input
                                id="email"
                                label="Email"
                                onChange={(e: any) => setEmail(e.target.value)}
                                value={email}
                                type="email"
                            />
                            <Input
                                id="password"
                                label="Password"
                                onChange={(e: any) => setPassword(e.target.value)}
                                value={password}
                                type="password"
                            />
                        </div>
                        <button onClick={variant === 'Login' ? login : register} className="bg-red-600 text-white py-3 mt-10 w-full rounded-md hover:bg-red-700 transition">
                            {variant}
                        </button>
                        <p className='text-neutral-500 mt-12'>
                            {variant === 'Login' ? "Don't have an account?" : 'Already have an Account?'}
                            <span className="text-white ml-1 cursor-pointer hover:underline" onClick={toggleVariant} >
                                {variant === 'Login' ? 'Create Account' : 'Login'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth