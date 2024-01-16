export const ContactForm = () => {
   return (
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
         {/* Background */}
         <div
            style={{
               width: 1280,
               height: 465,
               left: 0,
               top: 0,
               position: 'absolute',
               background: 'white',
            }}
         ></div>

         {/* Green Box */}
         <div
            style={{
               width: 730,
               height: 249,
               left: 299,
               top: 108,
               position: 'absolute',
               background: '#397367',
               borderRadius: 10,
            }}
         ></div>

         {/* Contact Text */}
         <div
            style={{
               width: 225,
               left: 357,
               top: 204,
               position: 'absolute',
               textAlign: 'center',
               color: 'white',
               fontSize: 24,
               fontFamily: 'Montserrat',
               fontWeight: '700',
               wordWrap: 'break-word',
            }}
         >
            CONTACT US FOR COLLABORATION
         </div>

         {/* Rotated Border */}
         <div
            style={{
               width: 194.01,
               height: 0,
               left: 647,
               top: 135,
               position: 'absolute',
               transform: 'rotate(90deg)',
               transformOrigin: '0 0',
               border: '6px white solid',
            }}
         ></div>

         {/* Email Input */}
         <div
            style={{
               width: 308,
               height: 33,
               left: 652,
               top: 155,
               position: 'absolute',
            }}
         >
            <div
               style={{
                  width: 308,
                  height: 33,
                  left: 0,
                  top: 0,
                  position: 'absolute',
                  borderRadius: 6,
                  border: '2px white solid',
               }}
            >
               <input
                  type="email"
                  placeholder="Enter your e-mail"
                  style={{
                     width: '100%',
                     height: '100%',
                     border: 'none',
                     background: 'transparent',
                     fontSize: 16,
                     fontFamily: 'Montserrat',
                     fontWeight: '700',
                     color: 'rgba(255, 255, 255, 0.40)',
                  }}
               />
            </div>
         </div>

         {/* Message Input */}
         <div
            style={{
               width: 308,
               height: 89,
               left: 652,
               top: 200,
               position: 'absolute',
            }}
         >
            <div
               style={{
                  width: 308,
                  height: 89,
                  left: 0,
                  top: 0,
                  position: 'absolute',
                  borderRadius: 6,
                  border: '2px white solid',
               }}
            >
               <textarea
                  placeholder="Message To Send"
                  style={{
                     width: '100%',
                     height: '100%',
                     border: 'none',
                     background: 'transparent',
                     fontSize: 16,
                     fontFamily: 'Montserrat',
                     fontWeight: '700',
                     color: 'rgba(255, 255, 255, 0.40)',
                  }}
               ></textarea>
            </div>
         </div>

         {/* Send Button */}
         <div
            style={{
               width: 89,
               height: 20,
               left: 762,
               top: 302,
               position: 'absolute',
            }}
         >
            <div
               style={{
                  width: 89,
                  height: 20,
                  left: 0,
                  top: 0,
                  position: 'absolute',
                  background: 'white',
                  borderRadius: 4,
               }}
            ></div>
            <div
               style={{
                  left: 21,
                  top: 0,
                  position: 'absolute',
                  color: '#35393C',
                  fontSize: 16,
                  fontFamily: 'Montserrat',
                  fontWeight: '700',
                  wordWrap: 'break-word',
               }}
            >
               Send
            </div>
         </div>
      </div>
   );
}

export default ContactForm;
