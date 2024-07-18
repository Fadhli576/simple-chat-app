import { useState } from "react"
import Button from "../Button/Button"
import Input from "../Input/Input"
import { useNavigate } from "react-router-dom"

const Register = () => {
    const [formData, setFormData] = useState('')

    const navigate = useNavigate();

    const handleInput = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:9000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body : JSON.stringify(formData)
            })

            if (response.ok) {
                console.log("User Created");
                navigate('/login')
            } else {
                console.log("Erorr");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex items-center flex-col justify-center h-screen ">
            <form onSubmit={handleSubmit} action="/register" method="post" className="border-slate-200 w-[400px] border shadow-lg bg-indigo-200 text-black flex flex-col justify-center gap-2 m-6 px-16 py-20 rounded-xl">
                <h1 className="text-3xl text-center	font-bold mb-5">Register</h1>
                <label className="text-md" htmlFor="">Nama</label>
                <Input type="text" ganti={handleInput} className="px-2 py-1 focus:outline-indigo-500 drop-shadow-md rounded-md w-full" name="name" placeholder="Masukkan Nama"/>
                <label className="text-md" htmlFor="">Nomor Handphone</label>
                <Input type="number" ganti={handleInput} className="px-2 py-1 focus:outline-indigo-500 drop-shadow-md rounded-md w-full" name="no_hp" placeholder="Masukkan Nomor Handphone"/>
                <label className="text-md" htmlFor="">Password</label>
                <Input type="password" ganti={handleInput} className="px-2 py-1 focus:outline-indigo-500 drop-shadow-md rounded-md w-full" name="password" placeholder="Masukkan Password"  />
                <Button className="bg-indigo-500 rounded-md text-white hover:bg-indigo-600" logo="Submit" />
            </form>
        </div>
    )
}

export default Register