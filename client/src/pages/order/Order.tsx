import React from 'react'
import { Switch } from "@/components/ui/switch"
export default function Order() {

    return (
        <div className="container max-w-[1300px] h-screen flex items-center">
            <div className="flex w-full gap-10">
                <div className="flex-half ">
                    <h2 className="font-clashDisplay font-semibold text-3xl">Choose your destination address</h2>
                    <div className="flex items-center mt-5 gap-4 border-2 border-gray-900 p-6 rounded-lg cursor-pointer hover:shadow-lg hover:shadow-gray-500/40 transition-shadow">
                        <div>
                            <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 3.5C6 2.67157 6.67157 2 7.5 2C8.32843 2 9 2.67157 9 3.5C9 4.32843 8.32843 5 7.5 5C6.67157 5 6 4.32843 6 3.5ZM8 5.94999C9.14112 5.71836 10 4.70948 10 3.5C10 2.11929 8.88071 1 7.5 1C6.11929 1 5 2.11929 5 3.5C5 4.70948 5.85888 5.71836 7 5.94999V13.5C7 13.7761 7.22386 14 7.5 14C7.77614 14 8 13.7761 8 13.5V5.94999Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                        </div>
                        <div>
                            <p className='font-clashDisplay text-lg text-primary'>Set your address</p>
                            <p className='font-clashDisplay text-lg text-lime-600'>All is okay : )</p>
                        </div>
                        <div className="ml-auto">
                            <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                        </div>
                    </div>
                    <label htmlFor="contactless" className="flex items-center mt-5 justify-between border-2 border-gray-900 p-6 rounded-lg cursor-pointer hover:shadow-lg hover:shadow-gray-500/40 transition-shadow">
                        <div>
                            <p className="font-clashDisplay text-lg text-primary">Contactless delivery</p>
                            <p className='font-clashDisplay text-lg text-gray-500'>Please leave my order at the door</p>
                        </div>
                        <Switch id="contactless" />
                    </label>
                </div>
                <div className="flex-half ">
                    <iframe
                        width="600"
                        height="450"
                        loading="lazy"
                        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyC1zSho5xC_bPH1UdN8YwgLxmuVujsXGJk
                            &q=Space+Needle,Seattle+WA">
                    </iframe>
                </div>
            </div>
        </div>
    )
}
