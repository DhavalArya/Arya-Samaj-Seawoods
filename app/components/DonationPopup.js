"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function DonationPopup() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 🙏 Donate Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full shadow-lg z-50"
      >
        🙏 Donate
      </button>

      {/* Popup Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4 pt-40 sm:pt-15"  
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl w-full max-w-md mx-auto text-center relative overflow-y-auto max-h-[80vh]" 
              initial={{ scale: 0.8, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: -20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                🙏 Support Arya Samaj
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Your contribution helps us continue our mission. Please use the details below to donate.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Your contribution is tax exempt under Section 80G of the Income Tax Act.
              </p>

              {/* Bank Details */}
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-left text-sm">
                <p className="text-gray-800 dark:text-gray-200 font-semibold">
                  🏦 Bank Name: <span className="font-normal">Axis Bank</span>
                </p>
                <p className="text-gray-800 dark:text-gray-200 font-semibold">
                  🔢 Account No: <span className="font-normal">916020037778800</span>
                </p>
                <p className="text-gray-800 dark:text-gray-200 font-semibold">
                  🏷️ IFSC Code: <span className="font-normal">UTIB0001365</span>
                </p>
                <p className="text-gray-800 dark:text-gray-200 font-semibold">
                  💳 UPI ID: <span className="font-normal">Q245091890@ybl</span>
                </p>
              </div>

              {/* QR Code for UPI Donations */}
              <div className="flex justify-center mt-4">
                <Image
                  src="/images/donation-qr.jpg"
                  alt="Donation QR Code"
                  width={160}
                  height={160}
                  className="border-2 border-gray-300 rounded-lg"
                />
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
