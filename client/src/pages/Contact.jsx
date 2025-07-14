import React from 'react'
import Footer from '../components/footer'

const Contact = () => {
  return (
    <>
    <div class="min-h-screen w-full bg-gray-50 flex flex-col items-center justify-center px-4 py-8">
  {/* <!-- Heading --> */}
  <h1 class="text-2xl font-semibold text-gray-800 mb-6 text-center">सम्पर्क गर्नुहोस्</h1>

  {/* <!-- Contact Form --> */}
  <form class="bg-white shadow-xl rounded-lg w-full max-w-xl px-6 py-8 flex flex-col gap-5">
    <input
      type="email"
      placeholder="Email Address"
      required
      class="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <textarea
      placeholder="Type your message here..."
      required
      rows="5"
      class="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    ></textarea>

    <button
      type="submit"
      class="bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition duration-200"
    >
      Submit
    </button>
  </form>

  {/* <!-- Google Map Embed --> */}
 <div  className="w-full max-w-xl mt-10 rounded-lg overflow-hidden shadow-md">
  <iframe
    className="w-full h-[400px] border-0"
    loading="lazy"
    allowFullScreen
    referrerPolicy="no-referrer-when-downgrade"
    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d28267.454441003596!2d85.37545!3d27.673046!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1a13269174b9%3A0x8b9583c158c7f911!2sGatthaghar%2C%20Madhyapur%20Thimi%2044600%2C%20Nepal!5e0!3m2!1sen!2sus!4v1752460663372!5m2!1sen!2sus" 
  ></iframe>
</div>
</div>
<Footer/>

</>
  )
}

export default Contact