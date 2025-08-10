"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";
import Image from "next/image";

export default function MembershipModal({ showForm, setShowForm }) {
  // form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [purpose, setPurpose] = useState("");
  const [paymentRef, setPaymentRef] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // ✅ Client-side validation
    if (!name || !email || !mobile || !gender || !dob || !address || !purpose || !paymentRef) {
      setErrorMsg("❌ Please fill in all mandatory fields marked with *.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "memberships"), {
        name,
        email,
        mobile,
        gender,
        dob,
        address,
        purpose,
        paymentRef,
        message,
        submittedAt: serverTimestamp(),
      });
      setSuccessMsg("✅ Submitted successfully! Our team will verify your payment and contact you shortly.");
      // clear form
      setName("");
      setEmail("");
      setMobile("");
      setGender("");
      setDob("");
      setAddress("");
      setPurpose("");
      setPaymentRef("");
      setMessage("");
    } catch (err) {
      console.error("Error submitting form: ", err);
      setErrorMsg("❌ Submission failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {showForm && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[2000] overflow-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            setShowForm(false);
            setSuccessMsg("");
            setErrorMsg("");
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -30 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg p-8 w-full max-w-md mx-auto my-10 text-left text-gray-800 shadow-xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setShowForm(false);
                setSuccessMsg("");
                setErrorMsg("");
              }}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✖
            </button>
            <h3 className="text-2xl font-bold mb-4 text-center text-orange-700">
              Membership Form
            </h3>

            {/* ✅ QR Code and Instructions */}
            <div className="text-center mb-6">
              <p className="mb-2 font-medium text-gray-700">
                Please scan the QR code below to pay your membership fee.
              </p>
              <div className="flex justify-center">
                <Image
                  src="/images/donation-qr.jpg"
                  alt="UPI QR Code"
                  width={200}
                  height={200}
                  className="border p-2 bg-white"
                />
              </div>
              <p className="mt-2 text-sm text-gray-600">
                After payment, enter the Transaction Reference Number below for verification.
              </p>
            </div>

            {/* ✅ Error Message */}
            {errorMsg && (
              <p className="mb-3 text-center text-red-600 font-medium">{errorMsg}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium">
                  Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block font-medium">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Your Email"
                />
              </div>
              <div>
                <label className="block font-medium">
                  Mobile <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Your Mobile"
                />
              </div>
              <div>
                <label className="block font-medium">
                  Gender <span className="text-red-600">*</span>
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block font-medium">
                  Date of Birth <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium">
                  Address <span className="text-red-600">*</span>
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Your Address"
                ></textarea>
              </div>
              <div>
                <label className="block font-medium">
                  Reason to Connect / Reference / Purpose <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="E.g. Joining Satsang, Volunteer Reference, Seeking Knowledge"
                />
              </div>
              <div>
                <label className="block font-medium">
                  UPI Transaction Reference Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={paymentRef}
                  onChange={(e) => setPaymentRef(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter after payment"
                />
              </div>
              <div>
                <label className="block font-medium">Message (Optional)</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Any Message"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>

            {/* ✅ Success Message */}
            {successMsg && (
              <p className="mt-3 text-center font-medium text-green-600">{successMsg}</p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
