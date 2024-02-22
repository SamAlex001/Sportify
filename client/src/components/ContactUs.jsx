import "../styles/contactUs.css";

export const ContactForm = () => {
   return (

      <div className="contact-container">
         {/* Background */}
         <div className="contact-background">

            {/* Green Box */}
            <div className="contact-green-box"></div>

            {/* Contact Text */}
            <div className="contact-text">CONTACT US FOR COLLABORATION</div>

            {/* Rotated Border */}
            <div className="contact-rotated-border"></div>

            {/* Email Input */}
            <div className="contact-email-input">
               <input
                  className="contact-email-container"
                  type="email"
                  placeholder="Enter Your E-mail"
               />
            </div>

            {/* Message Input */}
            <div className="contact-msg-input">
               <textarea
                  className="contact-msg"
                  placeholder="Message To Send"
               ></textarea>
            </div>

            {/* Send Button */}
            <div className="contact-send-btn">
               <div className="contact-send-btn-container">
                  <div className="contact-send-text">Send</div>
               </div>
            </div>
         </div>
      </div>
   );
}

export const FAQContactForm = () => {
   return (
      <div className="faq-contact-container">
         {/* Background */}
         <div className="faq-contact-background">

            {/* Green Box */}
            <div className="faq-contact-green-box"></div>

            {/* Contact Text */}
            <div className="faq-contact-text">FACING ANY TROUBLE? <br /> LET US KNOW</div>

            {/* Rotated Border */}
            <div className="faq-contact-rotated-border"></div>

            {/* Email Input */}
            <div className="faq-contact-email-input">
               <input
                  className="faq-contact-email-container"
                  type="email"
                  placeholder="Enter Your E-mail"
               />
            </div>

            {/* Message Input */}
            <div className="faq-contact-msg-input">
               <textarea
                  className="faq-contact-msg"
                  placeholder="Message To Send"
               ></textarea>
            </div>

            {/* Send Button */}
            <div className="faq-contact-send-btn">
               <div className="faq-contact-send-btn-container">
                  <div className="faq-contact-send-text">Send</div>
               </div>
            </div>
         </div>
      </div>
   )
}