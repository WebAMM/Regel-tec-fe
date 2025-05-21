import React, { useEffect, useRef, useState } from "react";
import asset from "../../assets/images/surgery.svg";
import backpain from "../../assets/images/backpain.png";
import lowPain from "../../assets/images/low-pain.png";
import growing from "../../assets/images/growing.svg";
import injection from "../../assets/images/injection.png";
import lab from "../../assets/images/lab.svg";
import refresh from "../../assets/images/refresh.svg";
import FaqSection from "./FaqSection";
import { useNavigate } from "react-router-dom";
import MyMapWithSearch from "../../components/MyMapWithSearch";
import { useGetAllStudyCenterWithOutPaginationQuery } from "../../api/apiSlice";
import bgHome from "../../assets/images/Background.png";
import discIcon from "../../assets/images/disc.png";
import insulinIcon from "../../assets/images/insulin.png";
import placeIcon from "../../assets/images/place.png";
import { FaCheck } from "react-icons/fa";
import { Typography } from "@material-tailwind/react";
import { LuMapPin } from "react-icons/lu";
import LandingPageLogin from "./LandingPageLogin";
import { toast } from "react-toastify";

const Home = () => {
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const [selectLocation, setSelectLocation] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  const { data: allStudyCenter } = useGetAllStudyCenterWithOutPaginationQuery();


  const handleClickScroll = (id) => {
    const element = document.getElementById(`${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleSubmit = (values) => {
    console.log(values, 'values');
    if (!values.email || !values.password) {
      toast.error("Please fill in all fields")
      return
    }
    if (values.email === 'admin@hydrafilstudy.com' && values.password === 'HYiu87t6$') {
      // navigate('/review');
      setIsOpen(false)
    } else {
      toast.error("Invalid email or password");
    }
  };


  const featureItems = [
    { text: "Local study center" },
    { text: "No cost to participate" },
    { text: "Local spine physician" },
    { text: "Enrolling now" },
  ];

  const infoCards = [
    {
      icon: "person",
      title: "Degenerative Disc Disease",
      description:
        "Low back pain caused by DDD is a common and debilitating condition",
    },
    {
      icon: "syringe",
      title: "HYDRAFIL-D Study",
      description:
        "Evaluating an investigational injectable hydrogel spinal implant",
    },
    {
      icon: "location",
      title: "Study Locations",
      description: "The study is now underway at multiple sites in the US",
    },
  ];

  useEffect(() => {
    if (window.google && mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 35.6528, lng: -97.4781 }, // Edmond, Oklahoma
        zoom: 4,
      });

      const marker = new window.google.maps.Marker({
        position: { lat: 35.6528, lng: -97.4781 },
        map,
        title: "Local Study Center",
      });

      const infowindow = new window.google.maps.InfoWindow({
        content: `
          <div style="text-align: center;">
            <h2>Local Study Center</h2>
            <p>Edmond, Oklahoma, 73103</p>
            <p>📍 2.5 miles away</p>
            <button style="background-color: #09bab1; color: white; padding: 8px 16px; border: none; border-radius: 20px; margin-top: 10px;">Select This Location</button>
          </div>
        `,
      });

      marker.addListener("click", () => {
        infowindow.open(map, marker);
      });
    }
  }, []);
  // console.log(allStudyCenter?.data, "allStudyCenter");
  const studyCentersWithCoordinates = allStudyCenter?.data.filter(center =>
    center.coordinates.lat !== null && center.coordinates.long !== null
  );
  // console.log(studyCentersWithCoordinates, 'studyCentersWithCoordinates')
  return (
    <>
      <div className="">
        <div
          className="h-[730px] pt-[100px]"
          style={{
            backgroundImage: `url(${bgHome})`,
            backgroundSize: "100% 100%",
            backgroundPosition: "100% 100%",
          }}
        >
          {/* Hero Section */}
          <div className="container mx-auto">
            <div className=" mx-auto px-4 py-12 ">
              <div className="flex relative flex-col lg:flex-row items-center">
                {/* Left Content */}
                <div className="lg:w-[55%]">
                  <div className="mb-[10px]">
                    <p className="text-[#00B4F1] text-[20px] font-[500] uppercase tracking-widest">
                      CLINICAL RESEARCH STUDY
                    </p>
                  </div>

                  <h1 className="lg:text-[40px] md:text-[30px] sm:text-xl text-xl md:text-4xl font-[700] text-gray-800 mb-4 leading-[50px]">
                    Investigating a New Treatment for People Suffering from
                    Degenerative Disc Disease
                  </h1>

                  <p className="text-[#39394A] font-[400] mb-4 lg:text-[18px] md:text-[16px] sm:text-sm text-sm font-relay leading-[30px]">
                    Learn More About the HYDRAFIL-D Research Study for Patients <br />
                    with Chronic Low Back Pain Caused by Degenerative Disc
                    Disease
                  </p>

                  {/* Features with Checkmarks */}
                  <div className="w-[85%]">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 ">
                      {featureItems.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <div className="flex-shrink-0 h-6 w-6 bg-cyan-500 rounded-full flex items-center justify-center text-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="ml-3 text-[#39394A] text-[16px] font-[700]">
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                    <button type="button" onClick={() => handleClickScroll("nearLocation")} className="cursor-pointer px-5 py-3 border-1 border-cyan-500 text-cyan-500 rounded-full hover:bg-cyan-50 transition-colors font-medium text-md">
                      Find A Study Location
                    </button>
                    <button type="button" onClick={() => handleClickScroll("qualify")} className=" cursor-pointer px-8 py-3 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition-colors font-medium text-md">
                      See If You Qualify
                    </button>
                  </div>
                </div>

                {/* Right Image */}
              </div>
            </div>
          </div>
          {/* Info Cards Section */}
        </div>
        <div className="bg-[#E5F7FE] mt-[-76px] rounded-[12px]  container mx-auto py-5 responsive_infocards">
          <div className="mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-8">
              {infoCards.map((card, index) => (
                <div
                  key={index}
                  className="flex p-4 items-center gap-5"
                  style={{
                    borderRight: index < 2 ? "1px solid #e5e7eb" : "none",
                  }}
                >
                  {/* Icon placeholder */}
                  <div className="flex-shrink-0 ">
                    {card.icon === "person" && (
                      <div className="">
                        <img src={discIcon} alt="" />
                      </div>
                    )}
                    {card.icon === "syringe" && (
                      <div className="">
                        <img src={insulinIcon} alt="" />
                      </div>
                    )}
                    {card.icon === "location" && (
                      <div className="">
                        <img src={placeIcon} alt="" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-[700] text-[#121229] mb-2 text-[18px]">
                      {card.title}
                    </h3>
                    <p className="text-[#39394A] font-relay font-[400] text-[16px]">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Additional Section*/}
        <div className="container mx-auto pt-20 lg:px-0 md:px-5 sm:px-5 px-5">
          <h2 className="text-[#00B4F1] font-[500] uppercase tracking-widest lg:text-[16px] md:text-sm sm:text-xs text-xs">
            CHRONIC LOW BACK PAIN DUE TO DDD
          </h2>
        </div>
        <div className="container mx-auto mb-[50px] lg:px-0 md:px-5 sm:px-5 px-5" id="Degenerative Disc">
          <div className=" flex flex-col lg:flex-row justify-between">
            <div className="lg:w-[52%]">
              <h2 className="lg:text-[38px] md:text-[30px] sm:text-lg xs:text-lg text-lg font-[700] text-[#121229] mb-3">
                About Degenerative Disc Disease
              </h2>

              <p className="text-[#39394A] font-relay lg:text-lg md:text-[16px] sm:text-sm text-sm  font-[400] mb-4">
                Low back pain is a common and debilitating condition affecting
                adults all over the world. Chronic low back pain can have many
                causes; for many, degenerative disc disease (DDD) is the primary
                culprit. The lumbar spine (lower back) plays a critical role in
                weight-bearing function and twisting movements. This makes the
                discs in your lower back more prone to breaking down
                (degeneration).
              </p>

              <p className="text-[#39394A] font-relay lg:text-lg md:text-[16px] sm:text-sm text-sm font-[400] mb-4">
                Wear-and-tear injuries can happen over time, along with natural
                aging processes, where the interior of the disc – the nucleus –
                can begin to dry up, weaken and collapse. As the nucleus
                dehydrates and shrinks, the disc able to properly bear weight,
                leading to tearing and further damage within and around the
                disc.
              </p>

              <p className="text-[#39394A] font-relay lg:text-lg md:text-[16px] sm:text-sm text-sm font-[400] mb-4">
                This can cause increased pain over time and can lead to other
                back problems including spinal stenosis or a herniated disc.
              </p>

              <p className="text-[#39394A] font-relay lg:text-lg md:text-[16px] sm:text-sm text-sm font-[400] mb-4">
                Conservative care treatment options for DDD such as pain
                medications, exercise, physical therapy, or epidural steroid
                injections may not adequately relieve the pain for some
                patients. When conservative care is not effective, some patients
                seek surgical alternatives such as spinal fusion or total disc
                replacement.
              </p>

              <p className="text-[#39394A] font-relay lg:text-lg md:text-[16px] sm:text-sm text-sm font-[400] mb-6">
                Traditional treatments for DDD are often ineffective or come
                with significant risks and side effects. Research is underway to
                find different ways to treat DDD, including the HYDRAFIL-D
                Research Study.
              </p>
            </div>
            <div>
              <div className="rounded-full flex justify-center items-center">
                <img
                  src={backpain}
                  alt="Person with lower back pain"
                  className="lg:w-full lg:h-auto "
                />
              </div>
              <div className="flex flex-col mt-12 sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <button onClick={() => handleClickScroll("nearLocation")} className="cursor-pointer px-5 h-[48px] border-1 border-[#00B4F1] text-[#00B4F1] rounded-full hover:bg-cyan-50 transition-colors font-[500] text-[16px]">
                  Find A Study Location
                </button>
                <button onClick={() => handleClickScroll("qualify")} className=" cursor-pointer px-8 h-[48px] bg-[#00B4F1] text-white rounded-full hover:bg-cyan-600 transition-colors font-[500] text-[16px]">
                  See If You Qualify
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* About The HYDRAFIL-D Study Section */}
        <div className=" " id="Study Overview">
          <div className="bg-[#e5f7fe] mx-auto py-16 mt-4 px-4">
            <div className="container mx-auto">
              <div className="flex flex-col lg:flex-row items-center gap-6">
                {/* Left Side - Image of Device */}
                <div className="pe-8">
                  <img
                    src={injection}
                    alt="HYDRAFIL injection device"
                    className="w-full h-auto xl:m-[-33px] lg:m-[-35px] md:m-[0px] m-0"
                  />
                </div>

                {/* Right Side - Text Content */}
                <div className="lg:w-[50%]">
                  <div className="mb-2">
                    <h2 className="text-[#00B4F1] font-[500] uppercase tracking-wide text-[16px]">
                      HELP US EVALUATE A POTENTIAL NEW TREATMENT FOR DDD
                    </h2>
                  </div>
                  <h2 className="lg:text-[38px] md:text-[30px] sm:text-lg xs:text-lg text-lg font-[700] text-[#121229] mb-3">
                    About The HYDRAFIL-D Study
                  </h2>

                  <p className="font-relay text-[#39394A] font-[400] lg:text-[18px] md:text-[16px] sm:text-sm text-sm mb-4">
                    This research study is being sponsored by <a href="https://regeltec.com/" className="text-[#00B4F1] cursor-pointer">ReGelTec</a> to
                    evaluate the safety and effectiveness of an investigational
                    spinal disc implant called HYDRAFIL
                  </p>

                  <p className="font-relay text-[#39394A] font-[400] lg:text-[18px] md:text-[16px] sm:text-sm text-sm">
                    <span className="text-cyan-500 cursor-pointer" onClick={() => handleClickScroll("FAQs")}>HYDRAFIL</span> is
                    a hydrated polymer gel (hydrogel) that mimics the natural
                    properties of the nucleus inside the disc, and is designed
                    to be an injectable, soft, space-filling technology for
                    minimally invasive treatment of chronic low back pain from
                    degenerative disc disease (DDD). HYDRAFIL offers a novel
                    approach to treating DDD by delivering a hydrogel implant
                    injected directly through a needle to supplement and
                    reinforce the interior of the degenerated disc that is
                    causing the pain without removing any existing disc
                    material. The intent of the treatment is to reduce pain and
                    improve function for people with chronic low back pain due
                    to DDD.
                  </p>
                </div>
              </div>
              <div className=" mt-4">
                <p className="font-relay text-[#39394A] font-[400] lg:text-[18px] md:text-[16px] sm:text-sm text-sm mb-2">
                  Approximately 225 adults with chronic low back pain will
                  participate in this research study at multiple study{" "}
                  <span onClick={() => handleClickScroll("nearLocation")} className="text-cyan-500 hover:underline cursor-pointer">
                    site locations
                  </span>{" "}
                  (i.e., local study centers) in the United States. Adults with
                  chronic low back pain due to DDD{" "}
                  <span onClick={() => handleClickScroll("qualify")} className="text-cyan-500 hover:underline cursor-pointer">
                    may qualify
                  </span>
                  .
                </p>

                <p className="font-relay text-[#39394A] font-[400] lg:text-[18px] md:text-[16px] sm:text-sm text-sm">
                  If you qualify and participate, you will receive study-related
                  medical care and treatment from a local spine specialist
                  physician (i.e., the local study doctor). You will be asked to
                  participate in this study for at least 24 months and up to 5
                  years.
                </p>
              </div>
            </div>
            {/* Eligibility Criteria Section */}
          </div>
          <div>
            <div className="lg:my-20 md:my-15 sm:my-10 my-10 container mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-[#00B4F1] font-[500] uppercase tracking-wide lg:text-[18px] md:text-[16px] sm:text-sm text-sm mb-2">
                  ELIGIBILITY CRITERIA
                </h2>
                <h3 className="lg:text-[28px] md:text-[24px] sm:text-xl text-lg font-[700] text-[#121229] mb-2 text-center">
                  There are many important criteria that you must <br /> meet to be
                  eligible for this study, including*:
                </h3>
                <p className="text-[#39394A] text-[16px] font-[400] italic">
                  *There are additional eligibility criteria
                </p>
              </div>
              {/* Eligibility Icons Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
                {/* Icon 1 */}
                <div className="flex flex-col items-center text-center border-r-[2px] border-r-[#00B4F1] border-dotted">
                  <div className="mb-4">
                    <img
                      src={growing}
                      alt="Age eligibility"
                      className="h-auto w-auto"
                    />
                  </div>
                  <p className="text-[#39394A] text-[16px] font-[500] leading-[1.2]">
                    You are 22 to 85
                    <br />
                    years old
                  </p>
                </div>

                {/* Icon 2 */}
                <div className="flex flex-col items-center text-center border-r-[2px] border-r-[#00B4F1] border-dotted">
                  <div className="mb-2">
                    <img
                      src={lowPain}
                      alt="Back pain"
                      className="h-auto w-auto"
                    />
                  </div>
                  <p className="text-[#39394A] text-[16px] font-[500] leading-[1.2]">
                    Your low back pain is
                    <br />
                    due to DDD
                  </p>
                </div>

                {/* Icon 3 */}
                <div className="flex flex-col items-center text-center border-r-[2px] border-r-[#00B4F1] border-dotted">
                  <div className="mb-2">
                    <img src={refresh} alt="Duration" className="h-auto w-auto" />
                  </div>
                  <p className="text-[#39394A] text-[16px] font-[500] leading-[1.2]">
                    Your low back pain has lasted
                    <br />
                    for at least 6 months
                  </p>
                </div>

                {/* Icon 4 */}
                <div className="flex flex-col items-center text-center">
                  <div className="mb-2">
                    <img src={asset} alt="No surgery" className="h-auto w-auto" />
                  </div>
                  <p className="text-[#39394A] text-[16px] font-[500] leading-[1.2]">
                    You have not had any
                    <br />
                    lower back surgery
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Study Location Section */}
        <div className="bg-[#e5f7fe] pt-12 pb-12 h-[930px]" id="nearLocation">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6">
              <h2 className="text-[#00B4F1] font-[500] uppercase tracking-widest lg:text-[18px] md:text-[16px] sm:text-sm text-sm mb-2">
                STUDY UNDERWAY AT MULTIPLE STUDY CENTERS IN THE US
              </h2>

              <h2 className="lg:text-[38px] md:text-[30px] sm:text-lg xs:text-lg text-lg font-[700] text-[#121229] mb-4 ">
                Find A Study Location Near You
              </h2>

              <p className="text-[#39394A] font-[400] lg:text-[18px] md:text-[16px] sm:text-sm text-sm font-relay mb-1 text-center">
                Find a local study center in your area then see if you may be
                eligible to participate.
              </p>

              <p className="text-[#39394A] font-[400] lg:text-[18px] md:text-[16px] sm:text-sm text-sm font-relay text-center">
                If you don't see a local study center available in your area at
                this time, please check back regularly, as new <br /> study centers may
                be added in the future.
              </p>
            </div>

            {/* Map Section */}
            <div className="rounded-lg overflow-hidden shadow-md mb-16 relative">
              {/* US Map */}
              <div className="relative ">
                <div className="h-[600px] w-full rounded-xl overflow-hidden">
                  <div ref={mapRef} className="h-full w-full relative" >
                    {/* Fallback content if Google Maps fails to load */}
                    <MyMapWithSearch center={studyCentersWithCoordinates} className="p-10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Qualification Section */}
        <div className="bg-white lg:py-16 md:py-12 sm:py-8 py-8" id="qualify">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-[#00B4F1] font-[500] uppercase tracking-wide lg:text-[18px] md:text-[16px] sm:text-sm text-sm mb-2">
              TAKE THE PRE-SCREENER
            </h2>

            <h2 className="lg:text-[38px] md:text-[30px] sm:text-lg xs:text-lg text-lg font-[700] text-[#121229] mb-3">
              Do I Qualify?
            </h2>

            <p className="text-[#39394A] lg:text-[18px] md:text-[16px] sm:text-sm text-sm font-relay mb-12">
              To see if you might qualify for the study, we need to ask you 8
              quick questions. If you pass the pre-screener and appear to <br />
              prequalify, you can submit your contact information to the local
              study center. A study representative may contact you to tell you <br />
              more about the study, ask you more questions, answer your
              questions, and possibly schedule an office visit.
            </p>

            {/* Progress Steps */}
            <div className="mx-auto border border-[#DDE2E5] rounded-lg lg:p-10 md:p-8 sm:p-4 p-2 shadow-sm">
              <div className=" mx-auto mb-12">
                <div className="flex justify-center items-center lg:gap-8 md:gap-6 sm:gap-4 gap-4 mb-8">
                  <div className="text-center">
                    <div className="rounded-full border border-[#00B4F1] flex items-center justify-center w-6 h-6 mx-auto">
                      <div className="w-3 h-3 bg-[#00B4F1] rounded-full"></div>
                    </div>
                    <div className="text-[14px] font-[400] font-relay text-[#00B4F1] mt-2">
                      Select Location
                    </div>
                  </div>
                  <div className="lg:w-24 md:w-20 sm:w-[200px] w-[200px] mb-2 h-1 bg-[#CFD6DC] rounded"></div>

                  <div className="text-center">
                    <div className="rounded-full bg-blue-100 w-6 h-6 mx-auto"></div>

                    <div className="text-[14px] font-[400] font-relay text-[#ABB7C2] mt-2">
                      Pre-Screener
                    </div>
                  </div>
                  <div className="lg:w-24 md:w-20 sm:w-[200px] w-[200px] mb-2 h-1 bg-[#CFD6DC] rounded"></div>

                  <div className="text-center">
                    <div className="rounded-full bg-blue-100 w-6 h-6 mx-auto"></div>
                    <div className="text-[14px] font-[400] font-relay text-[#ABB7C2] mt-2">
                      Contact Info
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Selection Form */}
              <div className="lg:px-20 md:px-20 sm:px-3 px-3 mx-auto ">
                <h3 className="lg:text-[28px] md:text-[24px] sm:text-xl text-sm  font-[700] text-[#121229] mb-5 text-left">
                  Select a Study Location
                </h3>

                <p className="text-[#39394A] lg:text-[18px] md:text-[16px] sm:text-sm text-sms font-[400] font-relay mb-5 text-left">
                  Please select a study location near you to begin the
                  pre-screening process.
                </p>

                {/* Location Dropdown */}
                <div className="mb-8">
                  <div className="relative w-full sm:min-w-[360px] md:min-w-[360px] md:max-w-[300px] lg:max-w-[300px]">
                    <LuMapPin className="absolute left-[10px] top-[16px] text-[#ABAFB1]" />
                    <select
                      name="cars"
                      id="cars"
                      className="flex border-[#EDEDFF] w-full  items-center border rounded-md p-3 ps-7 text-left lg:text-xl md:text-lg sm:text-sm text-sm"
                      onChange={(e) => setSelectLocation(e.target.value)}
                    >
                      <option value="">Select a Location</option>
                      {studyCentersWithCoordinates?.map((center) => (
                        <option key={center?.id} value={center?.id}>
                          {center?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Continue Button */}
                <div className="text-left">
                  <button
                    className="lg:text-xl md:text-lg sm:text-sm text-xs lg:px-5 md:px-5 sm:px-3 px-3 h-[48px] bg-[#00B4F1] text-white rounded-full hover:bg-cyan-600 transition-colors font-medium disabled:cursor-not-allowed"
                    onClick={() =>
                      navigate("/prescreen", {
                        state: { center: selectLocation },
                      })
                    }
                    disabled={!selectLocation}
                  >
                    Continue To Pre-Screener
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white lg:py-10 md:py-8 sm:py-2 py-2" id="FAQs">
          <div className="container mx-auto px-4">
            <h3 className="text-[#00B4F1] font-[500] uppercase tracking-wide lg:text-[18px] md:text-[16px] sm:text-sm text-sm mb-4">FAQS</h3>
            <h2 className="lg:text-[38px] md:text-[30px] sm:text-lg xs:text-lg text-lg font-[700] text-[#121229] mb-6">
              Frequently Asked Question
            </h2>
            <FaqSection />
          </div>
        </div>
      </div>
      <LandingPageLogin open={isOpen} handleSubmit={handleSubmit} />
    </>
  );
};

export default Home;
