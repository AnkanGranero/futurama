"use client"

import { useRouter } from "next/navigation";
import styles from "./modal.module.css"


export default function Modal({ children}: {children: React.ReactNode}) {
    const router = useRouter();
    function closeModal(){
        router.back()   
    }
    return (
        <div onClick={closeModal} className={styles.modal}>
            { children}
        </div>
    )
}