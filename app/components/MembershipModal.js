"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";
import Image from "next/image";
import Head from "next/head";

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

  const reset = () => {
    setName("");
    setEmail("");
    setMobile("");
    setGender("");
    setDob("");
    setAddress("");
    setPurpose("");
    setPaymentRef("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      if (!name || !email || !mobile || !gender || !dob || !address || !purpose || !paymentRef) {
        setErrorMsg("❌ Please fill in all mandatory fields marked with *.");
        return;
      }

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
        verified: false,
        status: "pending",
        submittedAt: serverTimestamp(),
      });

      setSuccessMsg(
        "✅ Submitted successfully! Our team will verify your payment and contact you shortly."
      );
      reset();
    } catch (err) {
      setErrorMsg(`❌ Submission failed. ${err?.message || "Please try again."}`);
    } finally {
      setLoading(false);
    }
  };

  // Structured data for SEO (JSON-LD)
  const membershipFormSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Arya Samaj Seawoods",
      "url": "https://yourwebsite.com",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Membership Registration",
        "email": "info@yourwebsite.com",
        "telephone": "+91-XXXXXXXXXX"
      }
    }
  };

  return (
    <AnimatePresence>
      {showForm && (
        <>
          {/* SEO Head Tags */}
          <Head>
            <title>Membership Form | Arya Samaj Seawoods</title>
            <meta
              name="description"
              content="Join Arya Samaj Seawoods by filling out our membership form. Participate in Satsang, volunteer work, and Vedic learning programs."
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(membershipFormSchema) }}
            />
          </Head>

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
            role="dialog"
            aria-modal="true"
            aria-labelledby="membershipFormTitle"
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
                aria-label="Close form"
              >
                ✖
              </button>

              <h3
                id="membershipFormTitle"
                className="text-2xl font-bold mb-4 text-center text-orange-700"
              >
                Membership Form
              </h3>

              {/* QR Code and Instructions */}
              <div className="text-center mb-6">
                <p className="mb-2 font-medium text-gray-700">
                  Please scan the QR code below to pay your membership fee.
                </p>
                <div className="flex justify-center">
                  <Image
                    src="/images/donation-qr.jpg"
                    alt="UPI QR Code for membership payment"
                    width={200}
                    height={200}
                    className="border p-2 bg-white rounded"
                    priority
                  />
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  After payment, enter the Transaction Reference Number below for verification.
                </p>
              </div>

              {/* Error / Success */}
              {errorMsg && (
                <p
                  className="mb-3 text-center text-red-600 font-medium"
                  role="alert"
                >
                  {errorMsg}
                </p>
              )}
              {successMsg && (
                <p
                  className="mb-3 text-center text-green-600 font-medium"
                  role="status"
                >
                  {successMsg}
                </p>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-medium" htmlFor="name">
                    Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border rounded px-3 py-2"
                    placeholder="Your Name"
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label className="block font-medium" htmlFor="email">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border rounded px-3 py-2"
                    placeholder="Your Email"
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label className="block font-medium" htmlFor="mobile">
                    Mobile <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="mobile"
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                    pattern="^[0-9+\-\s]{8,15}$"
                    className="w-full border rounded px-3 py-2"
                    placeholder="Your Mobile"
                    autoComplete="tel"
                  />
                </div>

                <div>
                  <label className="block font-medium" htmlFor="gender">
                    Gender <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium" htmlFor="dob">
                    Date of Birth <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="dob"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                    className="w-full border rounded px-3 py-2"
                    autoComplete="bday"
                  />
                </div>

                <div>
                  <label className="block font-medium" htmlFor="address">
                    Address <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="w-full border rounded px-3 py-2"
                    placeholder="Your Address"
                    autoComplete="street-address"
                  />
                </div>

                <div>
                  <label className="block font-medium" htmlFor="purpose">
                    Reason to Connect / Reference / Purpose{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="purpose"
                    type="text"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    required
                    className="w-full border rounded px-3 py-2"
                    placeholder="E.g. Joining Satsang, Volunteer Reference, Seeking Knowledge"
                  />
                </div>

                <div>
                  <label className="block font-medium" htmlFor="paymentRef">
                    UPI Transaction Reference Number{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="paymentRef"
                    type="text"
                    value={paymentRef}
                    onChange={(e) => setPaymentRef(e.target.value)}
                    required
                    className="w-full border rounded px-3 py-2"
                    placeholder="Enter after payment"
                  />
                </div>

                <div>
                  <label className="block font-medium" htmlFor="message">
                    Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    placeholder="Any Message"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full text-white py-2 rounded transition ${
                    loading
                      ? "bg-orange-400 cursor-not-allowed"
                      : "bg-orange-600 hover:bg-orange-700"
                  }`}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
