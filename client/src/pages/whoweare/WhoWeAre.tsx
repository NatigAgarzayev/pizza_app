import { Link } from "react-router-dom"
import img1 from "../../images/whoweare-1.webp"
import img2 from "../../images/whoweare-2.webp"

export default function WhoWeAre() {
    return (
        <>
            <Link to="/">
                <div className="absolute top-20 left-20 border-2 p-2 rounded-full">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                </div>
            </Link>
            <div className="container max-w-[1300px] pt-[60px] pb-12">
                <h2 className="font-clashDisplay font-semibold text-[64px] text-primary text-center">Who We Are</h2>
                <p className="font-roboto text-center max-w-[640px] mx-auto text-secondary">Welcome to our pizza store! We are a team of passionate pizza lovers who believe that pizza is not just a food, but an experience. Our mission is to provide our customers with the best pizza experience they’ve ever had.</p>
            </div>
            <div>
                <div className="flex h-[600px]">
                    <div className="flex-half bg-orange-200 h-full p-6 flex flex-col justify-center">
                        <h3 className="font-clashDisplay font-semibold text-5xl">Fresh Ingredients</h3>
                        <p className="font-roboto text-lg mt-4">We use only the freshest ingredients to make our pizzas. Our dough is made fresh every day, and we use only the highest quality cheese and toppings. We believe that great pizza starts with great ingredients.</p>
                    </div>
                    <div className="flex-half h-full">
                        <img className="h-full aspect-video object-cover" src={img1} alt="" />
                    </div>
                </div>
            </div>
            <div>
                <div className="flex h-[600px]">
                    <div className="flex-half h-full">
                        <img className="h-full aspect-video object-cover" src={img2} alt="" />
                    </div>
                    <div className="flex-half bg-orange-200 h-full p-6 flex flex-col justify-center">
                        <h3 className="font-clashDisplay font-semibold text-5xl">Our Team</h3>
                        <p className="font-roboto text-lg mt-4">We are a team of pizza chefs who love making delicious pizzas for our customers. We have different skills and specialties, but we share a common passion for pizza. We use fresh ingredients, homemade sauces and doughs, and a brick oven to create our pizzas. </p>
                    </div>
                </div>
            </div>
        </>
    )
}