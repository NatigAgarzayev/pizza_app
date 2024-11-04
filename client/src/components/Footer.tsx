import facebook from "../images/facebook.svg"
import instagram from "../images/instagram.svg"
import x from "../images/x.svg"
import youtube from "../images/youtube.svg"
import logo from "../images/logo.webp"


export default function Footer() {
    return (
        <div className="bg-orange-100 py-20">
            <div className="w-[1300px] mx-auto">
                <div className="flex">
                    <ul className="flex font-roboto flex-third gap-10 ">
                        <li className="text-lg">
                            <a className="textsecondary" href="#">
                                Menu
                            </a>
                        </li>
                        <li className="text-lg">
                            <a className="textsecondary" href="#">
                                Who we are
                            </a>
                        </li>
                        <li className="text-lg">
                            <a className="textsecondary" href="#">
                                Events
                            </a>
                        </li>
                        <li className="text-lg">
                            <a className="textsecondary" href="#">
                                Contact
                            </a>
                        </li>
                    </ul>
                    <div className="flex flex-third flex-col items-center gap-20">
                        <div className="mt-2">
                            <img src={logo} alt="logo" />
                        </div>
                        <ul className="flex items-center gap-8">
                            <li>
                                <a href="#">
                                    <img src={facebook} alt="facebook.com" />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src={instagram} alt="instagram.com" />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src={x} alt="x.com" />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src={youtube} alt="youtube.com" />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="font-roboto flex-third flex justify-end">
                        <div className="w-[280px]">
                            <h3 className='font-roboto text-lg w-full'>Sign up to our newsletter</h3>
                            <input className="mt-4 w-full p-4 border-0 bg-transparent outline-none border-b-[1px] border-b-primary placeholder:text-secondary text-[#80725E]" type="email" placeholder="Email" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
