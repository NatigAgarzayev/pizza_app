import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

interface ISetState {
    setEntered: (entered: boolean) => void
}

export default function AdminEnter({ setEntered }: ISetState) {

    const [pass, setPass] = useState("")
    const [wrongPass, setWrongPass] = useState(false)
    const nav = useNavigate()

    const enterAdmin = () => {
        if (pass === "123") {
            const inOneHour = 1 / 24;
            setWrongPass(false)
            Cookies.set('name', 'value', { expires: inOneHour })
            setEntered(true)
            nav('/admin/')
        }
        else {
            setWrongPass(true)
        }
    }

    return (
        <div className="h-screen bg-amber-50 flex flex-col justify-center items-center">
            <h2 className="font-clashDisplay text-xl mb-4 font-semibold">Admin's Panel enterance</h2>
            <div className="flex w-full max-w-sm items-center space-x-2">
                <Input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Password" />
                <Button onClick={enterAdmin} type="submit">Enter</Button>
            </div>
            {
                wrongPass && <span className="font-roboto text-red-500 text-[14px]">*Wrong password</span>
            }
        </div>
    )
}
