import "../styles/contactUs.css";
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// https://docs.google.com/forms/d/e/1FAIpQLScornf_vt5WXOOYfqAwAZ9SJvGJsjD05KQOedIiDQRmAndPUQ/viewform?// usp=pp_url&
// entry.1934547602=999-Email
// &
// entry.341006385=999-Message

export const ContactForm = () => {

   const [email, setEmail] = useState('');
   const [message,setMessage] = useState('');

   async function handleSubmit(e) {
      e.preventDefault();
      const formData = new FormData();
      formData.append('entry.1934547602', email);
      formData.append('entry.341006385', message);
      try {
         const response = await fetch('https://docs.google.com/forms/d/e/1FAIpQLScornf_vt5WXOOYfqAwAZ9SJvGJsjD05KQOedIiDQRmAndPUQ/formResponse', {
            method: 'POST',
            body: formData,
            mode: "no-cors"
         });
         setEmail('');
         setMessage('');
         toast.success("Message Sent Successfully!");
      } catch (error) {
         console.error('Error submitting form:', error);
         toast.error("Error submitting form. Please try again later.");
      }
   }

   return (
      <form
         action="https://docs.google.com/forms/d/e/1FAIpQLScornf_vt5WXOOYfqAwAZ9SJvGJsjD05KQOedIiDQRmAndPUQ/formResponse"
         method="POST"
         onSubmit={handleSubmit}
         className="contact-container"
      >
         <div className="contact-background">
            <div className="contact-green-box"></div>
            <div className="contact-text">CONTACT US FOR COLLABORATION</div>
            <div className="contact-rotated-border"></div>
            <div className="contact-email-input">
               <input
                  className="contact-email-container"
                  type="email"
                  name="entry.1934547602"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value) }}
                  placeholder="Enter Your E-mail"
               />
            </div>
            <div className="contact-msg-input">
               <textarea
                  className="contact-msg"
                  name="entry.341006385"
                  value={message}
                  onChange={(e) => { setMessage(e.target.value) }}
                  placeholder="Message To Send"
               ></textarea>
            </div>
            <div className="contact-send-btn">
               <button className="contact-send-btn-container">
                  <div className="contact-send-text">Send</div>
               </button>
            </div>
         </div>
      </form>
   );
}

export const FAQContactForm = () => {

   const [email, setEmail] = useState('');
   const [message,setMessage] = useState('');

   async function handleSubmit(e) {
      e.preventDefault();
      const formData = new FormData();
      formData.append('entry.1934547602', email);
      formData.append('entry.341006385', message);
      try {
         await fetch('https://docs.google.com/forms/d/e/1FAIpQLScornf_vt5WXOOYfqAwAZ9SJvGJsjD05KQOedIiDQRmAndPUQ/formResponse', {
            method: 'POST',
            body: formData,
            mode: "no-cors"
         });
         setEmail('');
         setMessage('');
         toast.success("Message Sent Successfully!");
      } catch (error) {
         console.error('Error submitting form:', error);
         toast.error("Error submitting form. Please try again later.");
      }
   }

   return (

      <form
         action="https://docs.google.com/forms/d/e/1FAIpQLScornf_vt5WXOOYfqAwAZ9SJvGJsjD05KQOedIiDQRmAndPUQ/formResponse"
         onSubmit={handleSubmit}
         method="POST"
         className="faq-contact-container"
      >
         <div className="faq-contact-background">
            <div className="faq-contact-green-box"></div>
            <div className="faq-contact-text">FACING ANY TROUBLE? <br /> LET US KNOW</div>
            <div className="faq-contact-rotated-border"></div>
            <div className="faq-contact-email-input">
               <input
                  className="faq-contact-email-container"
                  type="email"
                  name="entry.1934547602"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value) }}
                  placeholder="Enter Your E-mail"
               />
            </div>
            <div className="faq-contact-msg-input">
               <textarea
                  className="faq-contact-msg"
                  name="entry.341006385"
                  value={message}
                  onChange={(e) => { setMessage(e.target.value) }}
                  placeholder="Message To Send"
               ></textarea>
            </div>
            <div className="faq-contact-send-btn">
               <button className="faq-contact-send-btn-container"
                  type="submit"
               >
                  <div className="faq-contact-send-text">Send</div>
               </button>
            </div>
         </div>
      </ form>
   )
}