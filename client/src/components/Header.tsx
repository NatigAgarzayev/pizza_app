import { Link } from "react-router-dom"
import logo from "../images/logo.webp"
import { Button } from "./ui/button"

export default function Header() {
    return (
        <div className="relative z-20 py-10">
            <div className="flex items-center justify-between">
                <div>
                    <img src={logo} alt="" />
                </div>
                <ul className="font-roboto text-lg flex gap-10 items-center">
                    <li><Link className="text-primary" to="/menu">Menu</Link></li>
                    <li><Link className="text-primary" to="/whoweare">Who we are</Link></li>
                    <li><a className="text-primary" href="#">Contacts</a></li>
                </ul>
                <div>
                    <Button>Book a table</Button>
                </div>
            </div>
        </div>
    )
}
