"use client"

import { useRouter } from "next/navigation";



export default function Modal({ children}: {children: React.ReactNode}) {
    const router = useRouter();
    function closeModal(){
        router.back()
        
    }
    return (
        <div onClick={closeModal} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            { children}
        </div>
    )
}