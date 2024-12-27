'use client';import 'globalthis/auto';
import Footer from "../inlcude/footer";
import Header from "../inlcude/header";
import Loader from "../inlcude/Loader";
import {useState, useEffect } from "react";
export default function Home() {
    const [loading2, setLoading2] = useState(true);
    useEffect(() => {
      setTimeout(function(){
        setLoading2(false);
      },2000)
    }, [])
    if(loading2){
        return <>
          {loading2 && <Loader />}
        </>
      }
  return (
    <>
    <Header />
    <main className="container mt-3 bg-white p-2  pt-4">
    <div className="border border-2  p-2 mx-2 text-center shadow">
      <br />
      <h6>We are verifying your details. Please wait for confirmation</h6>
      <h4 className="text-success">Complaint has been successfully registered</h4>
      <br />
      <h6>Thank you for contacting us.</h6>
      <h6>Time Remaining : 29:39</h6>
    </div>
  </main>
    <Footer />
</>
  );
}
