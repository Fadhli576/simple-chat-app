import Button from "../Button/Button"
import Input from "../Input/Input"
import { useState } from "react"

const Login = () => {
    const [formData, setFormData] = useState('')

    const handleInput = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:9000/api/login', {
                method: 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                const {token} = await response.json()
                document.cookie = `token=${token}; path=/`
                window.location.href = '/'
            } else {
                console.log("Error");
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="flex justify-center align-middle items-center h-screen">
            <form onSubmit={handleSubmit} method="post" className=" border-slate-200 w-[400px] border shadow-lg bg-indigo-100 text-black flex flex-col justify-center gap-2 m-6 px-16 py-20 rounded-xl">
                <h1 className="text-3xl text-center	font-bold  mb-5">Login</h1>
                <label className=" text-md" htmlFor="">Nomor Handphone</label>
                <Input type="number" ganti={handleInput} className="px-2 py-1 focus:outline-indigo-500 drop-shadow-md rounded-md w-full" name="no_hp" placeholder="Masukkan Nomor Handphone"/>
                <label className=" text-md" htmlFor="">Password</label>
                <Input type="password" ganti={handleInput} className="px-2 py-1 focus:outline-indigo-500 drop-shadow-md rounded-md w-full" name="password" placeholder="Masukkan Password"  />
                <Button className="bg-indigo-500 rounded-md my-3 text-white" logo="Submit" />
            </form>
        </div>
            
    )
}

export default Login