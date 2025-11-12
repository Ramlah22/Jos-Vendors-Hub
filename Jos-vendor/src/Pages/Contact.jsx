import React from "react";
import { MapPin, Mail, Phone, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function ContactPage() {
  const navigate = useNavigate();

  return (
    <>
      {/* Header */}
      <Header />

      {/* Back Button */}
      <div className="pt-6 pl-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 cursor-pointer hover:text-emerald-700 transition font-medium"
        >
          <ArrowLeft size={20} />
          Back
        </button>
      </div>

      {/* Contact Header */}
      <div className="bg-white pt-10 pb-10">
        <h1 className="text-center text-3xl text-emerald-600 font-semibold">Contact us</h1>
        <p className="text-center text-lg text-gray-600 mt-2">Reach us on any of these mediums</p>

        <div className="grid lg:grid-cols-3 grid-cols-1 gap-6 mt-10 px-6 lg:px-20">

          {/* Address */}
          <div className="bg-white shadow-md hover:shadow-lg cursor-pointer rounded h-[200px] flex flex-col items-center justify-center text-center px-4">
            <MapPin size={30} className="text-emerald-700" />
            <p className="mt-3 text-gray-500 text-base">
               3rd floor, TAEN business Complex, NITEL office, Yakubu gowon way, Jos
            </p>
          </div>

          {/* Email */}
          <div className="bg-white shadow-md hover:shadow-lg cursor-pointer rounded h-[200px] flex flex-col items-center justify-center text-center px-4">
            <Mail size={30} className="text-emerald-700" />
            <p className="mt-3 text-gray-500 text-lg">aminuramlah001@gmail.com</p>
            <p className="text-gray-500 text-lg">watsonretyit1@gmail.com</p>
            <p className="text-gray-500 text-lg">damadida@gmail.com</p>
          </div>

          {/* Phone */}
          <div className="bg-white shadow-md hover:shadow-lg cursor-pointer rounded h-[200px] flex flex-col items-center justify-center text-center px-4">
            <Phone size={30} className="text-emerald-700" />
            <p className="mt-3 text-gray-500 text-lg">+234 9160094080</p>
            <p className="text-gray-500 text-lg">+234 9158900701</p>
            <p className="text-gray-500 text-lg">+234 8074170883</p>
          </div>
        </div>
      </div>

      {/* Form + Map */}
      <div className="bg-white grid lg:grid-cols-2 grid-cols-1 gap-10 px-6 lg:px-20 pb-20">
        {/* Form */}
        <div className="border-t-4 border-emerald-700 rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-semibold text-gray-600 mb-6">Send us a message</h2>

          <label className="block text-gray-600 font-medium mb-2">Full name</label>
          <input type="text" placeholder="Full Name" className="w-full p-2 border-gray-300 border rounded mb-4" />

          <label className="block text-gray-600 font-medium mb-2">Your Email</label>
          <input type="email" placeholder="example@email.com" className="w-full p-2 border-gray-300 border rounded mb-4" />

          <label className="block text-gray-600 font-medium mb-2">Subject</label>
          <input type="text" placeholder="Subject title" className="w-full p-2 border-gray-300 border rounded mb-4" />

          <label className="block text-gray-600 font-medium mb-2">Message</label>
          <textarea placeholder="Your Message" className="w-full p-2 border-gray-300 border rounded h-32 mb-5"></textarea>

          <button className="w-full bg-emerald-600 text-white py-3 rounded text-lg font-semibold hover:bg-emerald-700 transition">
            Submit
          </button>
        </div>

        {/* Map */}
        <div className="w-full flex justify-center items-start lg:pt-10">
          <iframe
            className="w-full h-[500px] rounded-lg shadow-md"
            src="https://www.google.com/maps?q=3rd+floor,+TAEN+Business+Complex,+NITEL+office,+Yakubu+Gowon+Way,+Jos&output=embed"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </>
  );
}
