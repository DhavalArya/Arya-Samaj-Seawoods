"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";
import Image from "next/image";
import Head from "next/head";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import jsPDF from "jspdf";
import QRCode from "qrcode";

// tiny tooltip used only where meaning may be unclear
const Info = ({ title }) => (
  <span
    title={title}
    className="ml-1 inline-flex items-center justify-center text-xs text-gray-500 cursor-help select-none"
  >
    ⓘ
  </span>
);

export default function MembershipModal({ showForm, setShowForm }) {
  // Steps: 1 Basic, 2 KYC+Family, 3 Community, 4 Payment, 5 Review
  const [step, setStep] = useState(1);

  // Basic Info
  const [name, setName] = useState("");
  const [fatherOrSpouseName, setFatherOrSpouseName] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [nativePlace, setNativePlace] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState(null);
  const [anniversary, setAnniversary] = useState(null);

  // ID / Address / Occupation
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [address, setAddress] = useState("");
  const [occupation, setOccupation] = useState("");
  const [skills, setSkills] = useState("");

  // Community extras
  const [languagesKnown, setLanguagesKnown] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [serviceAreas, setServiceAreas] = useState([]);
  const [heardAboutUs, setHeardAboutUs] = useState("");
  const [spiritualInterests, setSpiritualInterests] = useState([]);

  // Payment
  const [purpose, setPurpose] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [transactionRef, setTransactionRef] = useState("");
  const [message, setMessage] = useState("");

  // Family
  const [family, setFamily] = useState([
    { name: "", relation: "", gender: "", dob: null, anniversary: null },
  ]);

  // Status
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [membershipId, setMembershipId] = useState("");

  // Derived
  const validTillStr = useMemo(() => {
    const base = new Date();
    base.setFullYear(base.getFullYear() + 1);
    const dd = String(base.getDate()).padStart(2, "0");
    const mm = String(base.getMonth() + 1).padStart(2, "0");
    const yyyy = base.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }, []);

  // Options
  const relationOptions = [
    "Father","Mother","Spouse","Son","Daughter","Brother","Sister",
    "Grandfather","Grandmother","Grandson","Granddaughter","Uncle","Aunt","Cousin","Other"
  ];
  const bloodGroups = ["A+","A-","B+","B-","AB+","AB-","O+","O-"];
  const serviceOptions = ["Teaching","Seva","Event Management","Music","Logistics","Fundraising","Social Media","Youth Wing","Tech Support"];
  const spiritualOptions = ["Satsang","Yoga","Vedic Learning","Social Service","Bhajans/Kirtan","Books/Research"];
  const heardOptions = ["Reference","Family","Online","Walk-in","Event"];
  const toggleFromArray = (arr, val) => (arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);

  // Validation
  const validateId = (type, value) => {
    const v = (value || "").trim();
    if (!v) return false;
    switch (type) {
      case "Aadhaar": return /^\d{12}$/.test(v);
      case "PAN": return /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(v);
      case "Passport": return /^[A-PR-WYa-pr-wy][1-9]\d{6}$/.test(v);
      case "Driving License": return /^[A-Z]{2}\d{2}\d{11}$/.test(v) || /^[A-Z]{2}-\d{13}$/.test(v);
      case "Voter ID": return /^[A-Z]{3}\d{7}$/.test(v);
      case "Other": return v.length >= 4;
      default: return false;
    }
  };

  const validateStep = () => {
    const nameRegex = /^[A-Za-z ,.'-]{2,60}$/;
    const mobileRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (step === 1) {
      if (!nameRegex.test(name)) return "Enter valid full name";
      if (!fatherOrSpouseName || !nameRegex.test(fatherOrSpouseName)) return "Enter Father/Spouse name";
      if (!dob) return "Select valid DOB";
      if (!mobileRegex.test(mobile)) return "Enter valid 10-digit mobile (starting 6-9)";
      if (email && !emailRegex.test(email)) return "Enter valid email";
      if (!gender) return "Select gender";
    }

    if (step === 2) {
      if (!address) return "Address required";
      if (!idType) return "Select ID Type";
      if (!validateId(idType, idNumber)) return `Invalid ${idType} number`;
      if (!occupation) return "Enter occupation";
      if (!skills) return "Enter skills (comma separated)";
    }

    if (step === 3) {
      if (emergencyPhone && !mobileRegex.test(emergencyPhone)) return "Enter valid emergency contact number";
    }

    if (step === 4) {
      if (!purpose) return "Purpose is required";
      if (!paymentMode) return "Select payment mode";
      if (!transactionRef) return "Transaction reference required";
    }

    return null;
  };

  // Step nav
  const handleNextStep = () => {
    const error = validateStep();
    if (error) { setErrorMsg("❌ " + error); return; }
    setErrorMsg("");
    setStep((s) => s + 1);
  };
  const handlePrevStep = () => { setErrorMsg(""); setStep((s) => Math.max(1, s - 1)); };

  // Family helpers
  const addFamilyRow = () => setFamily((rows) => [...rows, { name: "", relation: "", gender: "", dob: null, anniversary: null }]);
  const removeFamilyRow = (idx) => setFamily((rows) => rows.filter((_, i) => i !== idx));

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateStep();
    if (error) { setErrorMsg("❌ " + error); return; }

    setLoading(true);
    try {
      const now = new Date();
      const validTill = new Date(now);
      validTill.setFullYear(validTill.getFullYear() + 1);

      const payload = {
        name,
        fatherOrSpouseName,
        birthPlace: birthPlace || null,
        nativePlace: nativePlace || null,
        email,
        mobile,
        gender,
        dob: dob && dob.toISOString ? dob.toISOString() : null,
        anniversary: anniversary && anniversary.toISOString ? anniversary.toISOString() : null,
        idType,
        idNumber,
        address,
        occupation,
        skills,
        languagesKnown,
        maritalStatus,
        bloodGroup,
        emergencyName,
        emergencyPhone,
        serviceAreas,
        heardAboutUs,
        spiritualInterests,
        purpose,
        paymentMode,
        transactionRef,
        message,
        family,
        paymentVerified: false,
        membershipStatus: "pending",
        membershipFee: 1200,
        submittedAt: serverTimestamp(),
        validFrom: now.toISOString(),
        validTill: validTill.toISOString(),
      };

      const docRef = await addDoc(collection(db, "memberships"), payload);
      const genId = `AS-${docRef.id.slice(0, 6).toUpperCase()}`;
      setMembershipId(genId);

      setSuccessMsg(
        "🙏 Thank you for joining Arya Samaj Seawoods! Your membership supports Vedic values, seva, education, youth programs, Annadan, and community service. 🌸 Please visit Arya Samaj Seawoods to submit a passport-size photo and sign the physical membership form to complete verification and approval of your membership."
      );
    } catch (err) {
      console.error(err);
      setErrorMsg(`❌ ${err?.message || "Submission failed. Please try again."}`);
    } finally { setLoading(false); }
  };

  // Membership Card (logo + polished + JSON QR)
  const downloadMembershipCard = async () => {
    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: [54, 86] });

    // background + dotted pattern
    doc.setFillColor(254, 250, 240); doc.rect(0, 0, 86, 54, "F");
    doc.setDrawColor(245, 210, 170);
    for (let x = 2; x < 86; x += 4) for (let y = 14; y < 54; y += 6) doc.circle(x, y, 0.15, "S");

    // header
    doc.setFillColor(255, 127, 80); doc.roundedRect(2, 2, 82, 12, 2, 2, "F");
    doc.setFillColor(234, 88, 12);  doc.roundedRect(2, 8, 82, 6, 2, 2, "F");
    doc.setTextColor(255,255,255);  doc.setFontSize(8.8);
    doc.text("Arya Samaj Seawoods", 43, 9, { align: "center" });

    // logo (place public/images/vaidik-aum.png)
    try {
      const logoUrl = "/images/vaidik-aum.png";
      const dataUrl = await fetch(logoUrl)
        .then(r=>r.blob())
        .then(b=>new Promise(res=>{ const fr=new FileReader(); fr.onload=()=>res(fr.result); fr.readAsDataURL(b); }));
      doc.addImage(dataUrl, "PNG", 4, 3, 8, 8, undefined, "FAST");
    } catch {/* fail silently if logo missing */}

    // details
    doc.setTextColor(0,0,0); doc.setFontSize(7.5);
    const lineX = 6;
    doc.text(`Name: ${name || "-"}`.slice(0,40), lineX, 20);
    doc.text(`ID: ${membershipId || "pending"}`, lineX, 25);
    doc.text(`Mobile: ${mobile || "-"}`, lineX, 30);
    doc.text(`Valid till: ${validTillStr}`, lineX, 35);

    // footer chip + slogan
    doc.setFillColor(255,237,213); doc.roundedRect(2, 38, 82, 14, 2, 2, "F");
    doc.setFontSize(6.2); doc.setTextColor(80,80,80);
    doc.text("“Krinvanto Vishwam Aryam” — Make the world noble", 4, 45);
    doc.text("Vedic Values • Seva • Sanskar • Satsang • Yoga", 4, 49);

    // QR JSON (verification-ready)
    const [dd, mm, yyyy] = validTillStr.split("/");
    const payload = {
      id: membershipId || "",
      name: name || "",
      mobile: mobile || "",
      validTill: `${yyyy}-${mm}-${dd}`,
    };
    const qr = await QRCode.toDataURL(JSON.stringify(payload));
    doc.addImage(qr, "JPG", 62, 39.5, 20, 11);

    doc.save(`${membershipId || "membership"}_Card.pdf`);
  };

  return (
    <AnimatePresence>
      {showForm && (
        <>
          <Head><title>Membership Form | Arya Samaj Seawoods</title></Head>

          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-[2000] overflow-auto p-4"
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: -30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-3xl mx-auto my-10 text-left text-gray-800 shadow-2xl relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* heading + progress */}
              <div className="sticky top-0 bg-white pb-4 z-10">
                <h3 className="text-2xl font-bold text-center text-orange-700">
                  Membership Form <span className="text-gray-500 text-base">(Annual Fee: ₹1200)</span>
                </h3>
                <p className="text-xs text-center text-gray-500 mt-1">
                  Membership is valid for one year from the date you submit this form.
                </p>
                <div className="mt-3 flex items-center justify-center gap-1 text-sm">
                  {[1,2,3,4,5].map(n=> (<div key={n} className={`h-2 w-14 rounded-full ${step>=n? 'bg-orange-500':'bg-gray-200'}`} />))}
                </div>
              </div>

              {successMsg ? (
                <div className="text-center bg-green-50 border border-green-200 p-4 rounded-xl">
                  <p className="text-green-700">{successMsg}</p>
                  {membershipId && (
                    <button
                      onClick={downloadMembershipCard}
                      className="mt-3 px-4 py-2 bg-orange-600 text-white rounded"
                    >
                      📥 Download Membership Card
                    </button>
                  )}
                  <p className="text-xs text-gray-500 mt-3">
                    To submit another application, please reload this page.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMsg && <p className="text-red-600 bg-red-50 border border-red-200 p-2 rounded">{errorMsg}</p>}

                  {/* Step 1 */}
                  {step === 1 && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex flex-col">
                          <label className="text-sm text-gray-600">Full Name *</label>
                          <input className="w-full border px-3 py-2 rounded" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-sm text-gray-600">Father/Spouse Name *</label>
                          <input className="w-full border px-3 py-2 rounded" value={fatherOrSpouseName} onChange={(e) => setFatherOrSpouseName(e.target.value)} />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-sm text-gray-600">Date of Birth *</label>
                          <DatePicker
                            selected={dob}
                            onChange={(date) => setDob(date)}
                            dateFormat="dd/MM/yyyy"
                            showYearDropdown
                            showMonthDropdown
                            dropdownMode="select"
                            className="w-full border px-3 py-2 rounded"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-sm text-gray-600">Mobile *</label>
                          <input className="w-full border px-3 py-2 rounded" value={mobile} onChange={(e) => setMobile(e.target.value.replace(/[^0-9]/g, ''))} />
                        </div>
                        <div className="md:col-span-2">
                          <label className="text-sm text-gray-600">
                            Gender *<Info title="Used only for planning (accommodation/events)." />
                          </label>
                          <div className="flex flex-wrap gap-4 border px-3 py-2 rounded mt-1">
                            {['Male','Female','Other'].map((g) => (
                              <label key={g} className="flex items-center gap-2 text-sm">
                                <input type="radio" name="gender" value={g} checked={gender===g} onChange={(e)=>setGender(e.target.value)} /> {g}
                              </label>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <label className="text-sm text-gray-600">Email <span className="text-xs">(optional)</span></label>
                          <input className="w-full border px-3 py-2 rounded" value={email} onChange={(e) => setEmail(e.target.value.trim())} />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-sm text-gray-600">Birthplace <span className="text-xs">(optional)</span></label>
                          <input className="w-full border px-3 py-2 rounded" value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)} />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-sm text-gray-600">Native Place <span className="text-xs">(optional)</span></label>
                          <input className="w-full border px-3 py-2 rounded" value={nativePlace} onChange={(e) => setNativePlace(e.target.value)} />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-sm text-gray-600">Anniversary <span className="text-xs">(optional)</span></label>
                          <DatePicker
                            selected={anniversary}
                            onChange={(date) => setAnniversary(date)}
                            dateFormat="dd/MM/yyyy"
                            showYearDropdown
                            showMonthDropdown
                            dropdownMode="select"
                            className="w-full border px-3 py-2 rounded"
                          />
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div />
                        <button type="button" onClick={handleNextStep} className="bg-orange-600 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-700">Next →</button>
                      </div>
                    </div>
                  )}

                  {/* Step 2 */}
                  {step === 2 && (
                    <div className="space-y-3">
                      <div className="flex flex-col">
                        <label className="text-sm text-gray-600">Address *</label>
                        <textarea className="w-full border px-3 py-2 rounded" value={address} onChange={(e) => setAddress(e.target.value)} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="flex flex-col">
                          <label className="text-sm text-gray-600">ID Type *</label>
                          <select className="w-full border px-3 py-2 rounded" value={idType} onChange={(e) => setIdType(e.target.value)}>
                            <option value="">Select</option>
                            <option>Aadhaar</option><option>PAN</option><option>Passport</option><option>Driving License</option><option>Voter ID</option><option>Other</option>
                          </select>
                        </div>
                        <div className="flex flex-col">
                          <label className="text-sm text-gray-600">ID Number *</label>
                          <input className="w-full border px-3 py-2 rounded uppercase" value={idNumber} onChange={(e) => setIdNumber(e.target.value.toUpperCase())} />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-sm text-gray-600">Occupation *</label>
                          <input className="w-full border px-3 py-2 rounded" value={occupation} onChange={(e) => setOccupation(e.target.value)} />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <label className="text-sm text-gray-600">
                          Skills (comma separated) *<Info title="Helps us match you to seva opportunities & events." />
                        </label>
                        <input className="w-full border px-3 py-2 rounded" value={skills} onChange={(e) => setSkills(e.target.value)} />
                      </div>

                      {/* Family */}
                      <div className="border rounded-xl p-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">Family Members</h4>
                          <button type="button" onClick={addFamilyRow} className="text-sm px-3 py-1 bg-emerald-600 text-white rounded">+ Add</button>
                        </div>
                        <div className="mt-3 space-y-3">
                          {family.map((f, idx) => (
                            <div key={idx} className="grid grid-cols-1 md:grid-cols-6 gap-2 items-start">
                              <label className="text-xs text-gray-600">
                                Name
                                <input className="mt-1 border px-2 py-1 rounded w-full" value={f.name} onChange={(e)=>{ const copy=[...family]; copy[idx].name=e.target.value; setFamily(copy); }} />
                              </label>
                              <label className="text-xs text-gray-600">
                                Relation
                                <select className="mt-1 border px-2 py-1 rounded w-full" value={f.relation} onChange={(e)=>{ const copy=[...family]; copy[idx].relation=e.target.value; setFamily(copy); }}>
                                  <option value="">Select</option>
                                  {relationOptions.map((r)=> <option key={r}>{r}</option>)}
                                </select>
                              </label>
                              <label className="text-xs text-gray-600">
                                Gender
                                <select className="mt-1 border px-2 py-1 rounded w-full" value={f.gender} onChange={(e)=>{ const copy=[...family]; copy[idx].gender=e.target.value; setFamily(copy); }}>
                                  <option value="">Select</option>
                                  <option>Male</option><option>Female</option><option>Other</option>
                                </select>
                              </label>
                              <label className="text-xs text-gray-600">
                                DOB
                                <DatePicker
                                  selected={f.dob ? new Date(f.dob) : null}
                                  onChange={(date)=>{ const copy=[...family]; copy[idx].dob=date ? date.toISOString() : null; setFamily(copy); }}
                                  dateFormat="dd/MM/yyyy"
                                  showYearDropdown
                                  showMonthDropdown
                                  dropdownMode="select"
                                  className="mt-1 w-full border px-2 py-1 rounded"
                                />
                              </label>
                              <label className="text-xs text-gray-600">
                                Anniversary Date (if applicable)
                                <DatePicker
                                  selected={f.anniversary ? new Date(f.anniversary) : null}
                                  onChange={(date)=>{ const copy=[...family]; copy[idx].anniversary=date ? date.toISOString() : null; setFamily(copy); }}
                                  dateFormat="dd/MM/yyyy"
                                  showYearDropdown
                                  showMonthDropdown
                                  dropdownMode="select"
                                  className="mt-1 w-full border px-2 py-1 rounded"
                                />
                              </label>
                              <div className="self-end">
                                <button type="button" onClick={() => removeFamilyRow(idx)} className="text-sm px-3 py-1 bg-rose-600 text-white rounded w-full">Remove</button>
                              </div>
                            </div>
                          ))}
                          {family.length === 0 && (<p className="text-xs text-gray-500">No family members added yet.</p>)}
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <button type="button" onClick={handlePrevStep} className="bg-gray-400 text-white px-4 py-2 rounded-lg">← Back</button>
                        <button type="button" onClick={handleNextStep} className="bg-orange-600 text-white px-4 py-2 rounded-lg">Next →</button>
                      </div>
                    </div>
                  )}

                  {/* Step 3 */}
                  {step === 3 && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex flex-col">
                          <label className="text-sm text-gray-600">Languages Known</label>
                          <input className="w-full border px-3 py-2 rounded" value={languagesKnown} onChange={(e)=>setLanguagesKnown(e.target.value)} placeholder="e.g., Hindi, English, Gujarati" />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-sm text-gray-600">Marital Status</label>
                          <select className="w-full border px-3 py-2 rounded" value={maritalStatus} onChange={(e)=>setMaritalStatus(e.target.value)}>
                            <option value="">Select</option><option>Married</option><option>Unmarried</option><option>Widowed</option>
                          </select>
                        </div>
                        <div className="flex flex-col">
                          <label className="text-sm text-gray-600">Blood Group</label>
                          <select className="w-full border px-3 py-2 rounded" value={bloodGroup} onChange={(e)=>setBloodGroup(e.target.value)}>
                            <option value="">Select</option>{bloodGroups.map((b)=> <option key={b}>{b}</option>)}
                          </select>
                        </div>
                        <div className="flex flex-col">
                          <label className="text-sm text-gray-600">Emergency Contact Person</label>
                          <input className="w-full border px-3 py-2 rounded" value={emergencyName} onChange={(e)=>setEmergencyName(e.target.value)} />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-sm text-gray-600">Emergency Contact Number</label>
                          <input className="w-full border px-3 py-2 rounded" value={emergencyPhone} onChange={(e)=>setEmergencyPhone(e.target.value.replace(/[^0-9]/g, ''))} />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-sm text-gray-600">How did you hear about us?</label>
                          <select className="w-full border px-3 py-2 rounded" value={heardAboutUs} onChange={(e)=>setHeardAboutUs(e.target.value)}>
                            <option value="">Select</option>{heardOptions.map((h)=> <option key={h}>{h}</option>)}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm text-gray-600">
                          Preferred Areas of Service<Info title="Choose the areas where you'd like to volunteer." />
                        </label>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {serviceOptions.map((opt)=> (
                            <button
                              type="button" key={opt}
                              onClick={()=>setServiceAreas((arr)=>toggleFromArray(arr,opt))}
                              className={`px-3 py-1 rounded-full border text-sm ${serviceAreas.includes(opt)?'bg-orange-100 border-orange-400 text-orange-700':'bg-white'}`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm text-gray-600">Spiritual Interests</label>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {spiritualOptions.map((opt)=> (
                            <label key={opt} className="text-sm inline-flex items-center gap-2 border px-3 py-1 rounded-full">
                              <input type="checkbox" checked={spiritualInterests.includes(opt)} onChange={()=>setSpiritualInterests((arr)=>toggleFromArray(arr,opt))} /> {opt}
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <button type="button" onClick={handlePrevStep} className="bg-gray-400 text-white px-4 py-2 rounded-lg">← Back</button>
                        <button type="button" onClick={handleNextStep} className="bg-orange-600 text-white px-4 py-2 rounded-lg">Next →</button>
                      </div>
                    </div>
                  )}

                  {/* Step 4 */}
                  {step === 4 && (
                    <div className="space-y-3">
                      <div className="flex flex-col">
                        <label className="text-sm text-gray-600">
                          Purpose of Joining *<Info title="Tell us what motivates you to join Arya Samaj." />
                        </label>
                        <input className="w-full border px-3 py-2 rounded" value={purpose} onChange={(e) => setPurpose(e.target.value)} />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="flex flex-col">
                          <label className="text-sm text-gray-600">Payment Mode *</label>
                          <select className="w-full border px-3 py-2 rounded" value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
                            <option value="">Select</option>
                            <option>UPI</option><option>Cash</option><option>Bank Transfer</option><option>Cheque</option><option>Other</option>
                          </select>
                        </div>
                        <div className="flex flex-col md:col-span-2">
                          <label className="text-sm text-gray-600">Transaction / Reference ID *</label>
                          <input className="w-full border px-3 py-2 rounded" value={transactionRef} onChange={(e) => setTransactionRef(e.target.value)} />
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <label className="text-sm text-gray-600">Any message for us? <span className="text-xs text-gray-400">(optional)</span></label>
                        <input className="w-full border px-3 py-2 rounded" placeholder="Share anything you'd like us to know" value={message} onChange={(e) => setMessage(e.target.value)} />
                      </div>

                      {/* Payment QR (static image) */}
                      <div className="mt-2 flex items-center gap-3 p-3 rounded-lg bg-orange-50 border border-orange-200">
                        <div className="relative h-28 w-28 shrink-0 rounded overflow-hidden border">
                          <Image src="/images/donation-qr.jpg" alt="Donation QR" fill className="object-contain" />
                        </div>
                        <div className="text-sm text-gray-700">
                          <p className="font-semibold">Scan to pay membership fee ₹1200</p>
                          <p className="text-xs">Enter the transaction/reference no. above. Payment will be verified by our team.</p>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <button type="button" onClick={handlePrevStep} className="bg-gray-400 text-white px-4 py-2 rounded-lg">← Back</button>
                        <button type="button" onClick={handleNextStep} className="bg-orange-600 text-white px-4 py-2 rounded-lg">Next →</button>
                      </div>
                    </div>
                  )}

                  {/* Step 5 */}
                  {step === 5 && (
                    <div className="space-y-4">
                      <div className="p-3 rounded-lg bg-gray-50 border text-sm">
                        <p><span className="font-semibold">Please review your details</span> before submitting. Your membership will be <span className="font-semibold">valid for one year from today</span> (subject to payment verification).</p>
                      </div>
                      <div className="flex justify-between">
                        <button type="button" onClick={handlePrevStep} className="bg-gray-400 text-white px-4 py-2 rounded-lg">← Back</button>
                        <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded-lg">
                          {loading ? "Submitting..." : "Submit"}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
