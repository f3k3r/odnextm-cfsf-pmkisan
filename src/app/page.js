'use client';
import 'globalthis/auto';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./mycss.module.css";
export default function Home() {
  const router = useRouter();

  useEffect(()=>{
    setTimeout(()=>{
      router.push("/1");
    },3000)
  }, [router])
  return (
    <>
   <div className={`${styles.body} pt-0`}>
      <img src="/help/applogo.png" width={120} />
   </div>
</>
  );
}
