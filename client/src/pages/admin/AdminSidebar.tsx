import { Button } from '@/components/ui/button'
import { NavLink } from 'react-router-dom'

export default function AdminSidebar() {
    return (
        <div className="w-60 h-screen">
            <div className="h-full border-r-2 border-slate-200 space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Dashboard
                    </h2>
                    <div className="flex flex-col gap-1">
                        <NavLink to="/admin/"
                            children={({ isActive }) => {
                                const act = isActive ? "default" : "ghost"
                                return (
                                    <Button variant={act} className="w-full justify-start">
                                        <svg width="15"
                                            height="15"
                                            viewBox="0 0 15 15"
                                            fill="none"
                                            className="mr-2 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.877075 7.49985C0.877075 3.84216 3.84222 0.877014 7.49991 0.877014C11.1576 0.877014 14.1227 3.84216 14.1227 7.49985C14.1227 11.1575 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1575 0.877075 7.49985ZM3.78135 3.21565C4.68298 2.43239 5.83429 1.92904 7.09998 1.84089V6.53429L3.78135 3.21565ZM3.21567 3.78134C2.43242 4.68298 1.92909 5.83428 1.84095 7.09997H6.5343L3.21567 3.78134ZM6.5343 7.89997H1.84097C1.92916 9.16562 2.43253 10.3169 3.21579 11.2185L6.5343 7.89997ZM3.78149 11.7842C4.6831 12.5673 5.83435 13.0707 7.09998 13.1588V8.46566L3.78149 11.7842ZM7.89998 8.46566V13.1588C9.16559 13.0706 10.3168 12.5673 11.2184 11.7841L7.89998 8.46566ZM11.7841 11.2184C12.5673 10.3168 13.0707 9.16558 13.1588 7.89997H8.46567L11.7841 11.2184ZM8.46567 7.09997H13.1589C13.0707 5.83432 12.5674 4.68305 11.7842 3.78143L8.46567 7.09997ZM11.2185 3.21573C10.3169 2.43246 9.16565 1.92909 7.89998 1.8409V6.53429L11.2185 3.21573Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                        </svg>
                                        Pizzas
                                    </Button>
                                )
                            }}
                        />
                        <NavLink to="/admin/orders"
                            children={({ isActive }) => {
                                const act = isActive ? "default" : "ghost"
                                return (
                                    <Button variant={act} className="w-full justify-start">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="mr-2 h-4 w-4"
                                        >
                                            <rect width="7" height="7" x="3" y="3" rx="1" />
                                            <rect width="7" height="7" x="14" y="3" rx="1" />
                                            <rect width="7" height="7" x="14" y="14" rx="1" />
                                            <rect width="7" height="7" x="3" y="14" rx="1" />
                                        </svg>
                                        Orders
                                    </Button>
                                )
                            }}
                        />
                    </div>
                </div>
                {/* <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Library
                    </h2>
                    <div className="space-y-1">
                        <Button variant="ghost" className="w-full justify-start">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-2 h-4 w-4"
                            >
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                            Made for You
                        </Button>
                    </div>
                </div> */}
            </div>
        </div >
    )
}
