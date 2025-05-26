import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function loadRazorpayScript() {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const Payment = () => {
  const { orderId } = useParams();
//   console.log('orderId: >>>>>>', orderId);
  const serviceName = "Deep Clean";
  const amount = 200; // Amount in INR

  useEffect(() => {
    async function initiatePayment() {
      const res = await loadRazorpayScript();
      if (!res) {
        alert("Failed to load Razorpay SDK. Are you online?");
        return;
      }

      const options = {
        key: "rzp_test_vzN8hoKk1JAewx",
        // order_id: "a-124",
        amount: amount * 100, // Razorpay needs amount in paise
        currency: "INR",
        name: serviceName,
        description: "Booking Payment for Deep Clean Service",
        handler: function (response) {
          console.log("Payment ID:", response.razorpay_payment_id);
          // You can trigger backend confirmation here
          orderPlace();
        },
        prefill: {
          name: "Vikky Mishra",
          email: "vikky890@gmail.com",
          contact: "7047472739",
        },
        notes: {
          address: "India",
        },
        theme: {
          color: "#158993",
        },
      };
      try {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
      console.log('error: ', error);
        
      }
     
    }

    initiatePayment();
  }, [orderId]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Booking Summary</h2>
      <p><strong>Service:</strong> {serviceName}</p>
      <p><strong>Amount:</strong> ₹{amount}</p>
      <p>Redirecting to payment...</p>
    </div>
  );
};

export default Payment;
