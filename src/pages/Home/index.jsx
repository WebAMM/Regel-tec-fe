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
import bgHome1 from "../../assets/images/Background1.png";
import PrivacyLogo from "../../assets/images/privacyLogo.png";
import discIcon from "../../assets/images/disc.png";
import insulinIcon from "../../assets/images/insulin.png";
import placeIcon from "../../assets/images/place.png";
import { FaCheck } from "react-icons/fa";
import { Typography } from "@material-tailwind/react";
import { LuMapPin } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import LandingPageLogin from "./LandingPageLogin";
import { toast } from "react-toastify";

const Home = () => {
  const [showCookiesModal, setShowCookiesModal] = useState(true);
  const [showLocationModal, setShowLocationModal] = useState(true);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [openReGelTecFaq, setOpenReGelTecFaq] = useState(false);
  const [openHydrafil, setOpenHydrafil] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
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
    console.log(values, "values");
    if (!values.email || !values.password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (
      values.email === "admin@hydrafilstudy.com" &&
      values.password === "HYiu87t6$"
    ) {
      // navigate('/review');
      setIsOpen(false);
    } else {
      toast.error("Invalid email or password");
    }
  };
  const handleAcceptCookies = () => {
    setShowCookiesModal(false);
  };

  const handleDeclineCookies = () => {
    setShowCookiesModal(false);
  };

  const handleLocationModalOk = () => {
    setShowLocationModal(false);
  };
  const handlePrivacyPolicyClick = () => {
    setShowPrivacyModal(true);
  };

  const handlePrivacyModalClose = () => {
    setShowPrivacyModal(false);
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
        "Low back pain caused by DDD is a <br/> common  and debilitating condition",
    },
    {
      icon: "syringe",
      title: "HYDRAFIL-D Study",
      description:
        "Evaluating an investigational <br/> injectable hydrogel spinal implant",
    },
    {
      icon: "location",
      title: "Study Locations",
      description:
        "The study is now underway at <br/> multiple sites in the US",
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
  const studyCentersWithCoordinates = allStudyCenter?.data.filter(
    (center) =>
      center.coordinates.lat !== null && center.coordinates.long !== null
  );
  // console.log(studyCentersWithCoordinates, 'studyCentersWithCoordinates')
  return (
    <>
      <div className="">
        <div
          className="h-[730px] pt-[100px]  "
          style={{
            backgroundImage:
              window.innerWidth >= 640 ? `url(${bgHome})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Hero Section */}
          <div className="container mx-auto">
            <div className=" mx-auto px-4 lg:py-12 md:py-10 sm:py-3 py-3">
              <div className="flex relative flex-col lg:flex-row items-center">
                {/* Left Content */}
                <div className="lg:w-[55%]">
                  <div className="lg:mb-[10px] md:mb-[10px] sm:mb-0 mb-0">
                    <p className="text-[#00B4F1] lg:text-[20px] md:text-[16px] sm:text-sm text-sm font-[500] uppercase tracking-widest">
                      CLINICAL RESEARCH STUDY
                    </p>
                  </div>

                  <h1 className="lg:text-[40px] md:text-[30px] sm:text-xl xs:text-[15px] text-[15px] md:text-4xl font-[700] text-gray-800 lg:mb-4 md:mb-3 sm:mb-0 mb-0 lg:leading-[50px] md:leading-[40px] sm:leading-[35px] leading-[35px]">
                    Investigating a New Treatment <br /> for People Suffering
                    from
                    <br />
                    Degenerative Disc Disease
                  </h1>

                  <p className="text-[#39394A] font-[400] lg:mb-4 md:mb-3 sm:mb-0 mb-0 lg:text-[18px] md:text-[16px] sm:text-sm text-sm font-relay leading-[30px]">
                    Learn More About the HYDRAFIL-D Research Study for Patients{" "}
                    <br />
                    with Chronic Low Back Pain Caused by Degenerative Disc
                    Disease
                  </p>

                  {/* Features with Checkmarks */}
                  <div className="w-[85%]">
                    <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:gap-4 md:gap-3 sm:gap-2 gap-2 lg:mb-6 md:mb-4 sm:mb-2 mb-2">
                      {featureItems.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <div className="flex-shrink-0 h-6 w-6 bg-[#00B4F1] rounded-full flex items-center justify-center text-white">
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
                  <div className="flex lg:space-y-4 md:space-y-3 sm:space-y-2 space-y-2 sm:space-x-6 flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => handleClickScroll("nearLocation")}
                      className="cursor-pointer px-2 sm:px-5 py-3 border-1 border-[#00B4F1] text-[#00B4F1] rounded-full hover:bg-cyan-50 transition-colors font-medium lg:text-[16px] md:text-sm sm:text-xs text-xs"
                    >
                      Find A Study Location
                    </button>
                    <button
                      type="button"
                      onClick={() => handleClickScroll("qualify")}
                      className="xl:h-[50px] lg:h-[46px] md:h-[44] h-[44px] cursor-pointer px-[28px] py-3 bg-[#00B4F1] text-white rounded-full hover:bg-cyan-600 transition-colors font-medium text-md"
                    >
                      See If You Qualify
                    </button>
                  </div>

                  <div className="w-full h-screen">
                    <img
                      src={bgHome1}
                      alt=""
                      className="block sm:hidden w-full object-cover"
                    />
                  </div>
                </div>

                {/* Right Image */}
              </div>
            </div>
          </div>
          {/* Info Cards Section */}
        </div>
        <div className="bg-[#E5F7FE] mt-[-76px] rounded-[12px]  container mx-auto py-5 responsive_infocards h-auto">
          <div className="p-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-8">
              {infoCards.map((card, index) => (
                <div
                  key={index}
                  className="flex px-5 items-center gap-5"
                  style={{
                    borderRight: index < 2 ? "2px dotted #8F8F95" : "none",
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
                    <h3 className="font-[700] text-[#121229] text-[18px]">
                      {card.title}
                    </h3>
                    <p
                      className="text-[#39394A] font-relay font-[400] text-[16px]"
                      dangerouslySetInnerHTML={{ __html: card.description }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Additional Section*/}
        <div
          className="container mx-auto lg:pt-10 md:pt-5 sm:pt-3 pt-3 lg:px-0 md:px-5 sm:px-5 px-5"
          id="Degenerative Disc"
        ></div>
        <div>
          <div className="container mx-auto pt-10 lg:px-0 md:px-5 sm:px-5 px-5">
            <h2 className="text-[#00B4F1] font-[500] uppercase tracking-widest lg:text-[16px] md:text-sm sm:text-xs text-xs">
              CHRONIC LOW BACK PAIN DUE TO DDD
            </h2>
          </div>
          <div className="container mx-auto lg:mb-[50px] md:mb-[40px] sm:mb-[20px] mb-[20px] lg:px-0 md:px-5 sm:px-5 px-5">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:gap-4 gap-4">
              <div className="lg:w-[55%] w-full">
                <h2 className="lg:text-[38px] md:text-[30px] sm:text-lg xs:text-lg text-lg font-[700] text-[#121229] mb-[20px] mt-[5px]">
                  About Degenerative Disc Disease
                </h2>

                <p className="text-[#39394A] font-relay lg:text-lg md:text-[16px] sm:text-sm text-sm font-[400] mb-6 leading-relaxed">
                  Low back pain is a common and debilitating condition affecting
                  adults all over the world. Chronic low back pain can have many
                  causes; for many, degenerative disc disease (DDD) is the
                  primary culprit. The lumbar spine (lower back) plays a
                  critical role in weight-bearing function and twisting
                  movements. This makes the discs in your lower back more prone
                  to breaking down (degeneration).
                </p>

                <p className="text-[#39394A] font-relay lg:text-lg md:text-[16px] sm:text-sm text-sm font-[400] mb-6 leading-relaxed">
                  Wear-and-tear injuries can happen over time, along with
                  natural aging processes, where the interior of the disc – the
                  nucleus – can begin to dry up, weaken and collapse. As the
                  nucleus dehydrates and shrinks, the disc able is less to
                  properly bear weight, leading to tearing and further damage
                  within and around the disc. DDD can cause increased pain over
                  time and can lead to other back problems including spinal
                  stenosis or a herniated disc.
                </p>

                <p className="text-[#39394A] font-relay lg:text-lg md:text-[16px] sm:text-sm text-sm font-[400] mb-6 leading-relaxed">
                  Conservative care treatment options for DDD such as pain
                  medications, exercise, physical therapy, or epidural steroid
                  injections may not adequately relieve the pain for some
                  patients. When conservative care is not effective, some
                  patients seek surgical alternatives such as spinal fusion or
                  total disc replacement.
                </p>

                <p className="text-[#39394A] font-relay lg:text-lg md:text-[16px] sm:text-sm text-sm font-[400] mb-8 leading-relaxed">
                  Traditional treatments for DDD are often ineffective or come
                  with significant risks and side effects. Research is underway
                  to find different ways to treat DDD, including the HYDRAFIL-D
                  Research Study.
                </p>
              </div>

              <div className="lg:w-[40%] w-full flex flex-col xl:items-start lg:items-center items-center">
                <div className="flex justify-center items-center mb-8">
                  <img
                    src={backpain}
                    alt="Person with lower back pain"
                    className="w-full h-auto max-w-auto"
                  />
                </div>
                <div className="flex flex-col lg:mt-12 md:mt-6 sm:mt-3 mt-3 sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                  <button
                    onClick={() => handleClickScroll("nearLocation")}
                    className="cursor-pointer px-5 border-1 h-[50px] border-[#00B4F1] text-[#00B4F1] rounded-full hover:bg-cyan-50 transition-colors font-[500] text-[16px]"
                  >
                    Find A Study Location
                  </button>
                  <button
                    onClick={() => handleClickScroll("qualify")}
                    className=" cursor-pointer px-[28px] h-[50px] bg-[#00B4F1] text-white rounded-full hover:bg-cyan-600 transition-colors font-[500] text-[16px]"
                  >
                    See If You Qualify
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About The HYDRAFIL-D Study Section */}
        <div
          id="Study Overview"
          className="container mx-auto pt-[15px] lg:px-0 md:px-5 sm:px-5 px-5"
        ></div>
        <div className=" ">
          <div className="bg-[#e5f7fe] mx-auto py-[60px] mt-4 px-4">
            <div className="container mx-auto">
              <div className="flex flex-col lg:flex-row items-start gap-8">
                {/* Left Side - Image of Device */}
               {/* Left Side - Image of Device */}
                <div className="pe-8">
                  <img
                    src={injection}
                    alt="HYDRAFIL injection device"
                    className="w-full h-auto xl:m-[-33px] lg:m-[-35px] md:m-[0px] m-0"
                  />
                </div>

                {/* Right Side - Text Content */}
                <div className="lg:w-[55%] flex flex-col">
                  <div className="mb-4">
                    <div className="text-[#00B4F1] font-[500] uppercase tracking-wide text-[16px]">
                      HELP US EVALUATE A POTENTIAL NEW TREATMENT FOR DDD
                    </div>
                  </div>
                  <h2 className="lg:text-[38px] md:text-[30px] sm:text-lg xs:text-lg text-lg font-[700] text-[#121229] mb-4">
                    About The HYDRAFIL-D Study
                  </h2>

                  <p className="font-relay text-[#39394A] font-[400] lg:text-[18px] md:text-[16px] sm:text-sm text-sm mb-4 leading-relaxed">
                    This research study is being sponsored by{" "}
                    <a
                      href="https://regeltec.com/"
                      className="text-[#00B4F1] cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        handleClickScroll("FAQs");
                        setTimeout(() => setOpenReGelTecFaq(true), 500);
                      }}
                    >
                      ReGelTec, Inc.
                    </a>{" "}
                    to evaluate the safety and effectiveness of an
                    investigational spinal disc implant called HYDRAFIL.
                  </p>

                  <p className="font-relay text-[#39394A] font-[400] lg:text-[18px] md:text-[16px] sm:text-sm text-sm leading-relaxed">
                    <span
                      className="text-[#00B4F1] cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        handleClickScroll("FAQs");
                        setTimeout(() => setOpenHydrafil(true), 500);
                      }}
                    >
                      HYDRAFIL
                    </span>{" "}
                    is a hydrated polymer gel (hydrogel) that mimics the natural
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

              <div className="mt-8">
                <p className="font-relay text-[#39394A] font-[400] lg:text-[18px] md:text-[16px] sm:text-sm text-sm mb-4 leading-relaxed">
                  Approximately 225 adults with chronic low back pain will
                  participate in this research study at multiple study{" "}
                  <span
                    onClick={() => handleClickScroll("nearLocation")}
                    className="text-[#00B4F1] hover:underline cursor-pointer"
                  >
                    site locations
                  </span>{" "}
                  (i.e., local study centers) in the United States. Adults with
                  chronic low back pain due to DDD{" "}
                  <span
                    onClick={() => handleClickScroll("qualify")}
                    className="text-[#00B4F1] hover:underline cursor-pointer"
                  >
                    may qualify
                  </span>
                  .
                </p>

                <p className="font-relay text-[#39394A] font-[400] lg:text-[18px] md:text-[16px] sm:text-sm text-sm leading-relaxed">
                  If you qualify and participate, you will receive study-related
                  medical care and treatment from a local spine specialist
                  physician (i.e., the local study doctor). You will be asked to
                  participate in this study for at least 24 months and up to 5
                  years.
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="lg:my-[4.5rem] md:my-15 sm:my-10 my-10 container mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-[#00B4F1] font-[500] uppercase tracking-wide lg:text-[16px] md:text-[16px] sm:text-sm text-sm mb-2">
                  ELIGIBILITY CRITERIA
                </h2>
                <h3 className="lg:text-[28px] md:text-[24px] sm:text-xl text-lg font-[700] text-[#121229] mb-2 text-center">
                  There are many important criteria that you must <br /> meet to
                  be eligible for this study, including*:
                </h3>
                <p className="text-[#39394A] text-[16px] font-[400] italic">
                  *There are additional eligibility criteria
                </p>
              </div>
              {/* Eligibility Icons Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 sm:gap-3 gap-3 mt-10">
                {/* Icon 1 */}
                <div className="flex flex-col items-center text-center border-r-[2px] border-r-[#00B4F1] border-dotted">
                  <div className="mb-[10px]">
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
                  <div className="mb-[10px]">
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
                  <div className="mb-[10px]">
                    <img
                      src={refresh}
                      alt="Duration"
                      className="h-auto w-auto"
                    />
                  </div>
                  <p className="text-[#39394A] text-[16px] font-[500] leading-[1.2]">
                    Your low back pain has lasted
                    <br />
                    for at least 6 months
                  </p>
                </div>

                {/* Icon 4 */}
                <div className="flex flex-col items-center text-center">
                  <div className="mb-[10px]">
                    <img
                      src={asset}
                      alt="No surgery"
                      className="h-auto w-auto"
                    />
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
        <div
          id="nearLocation"
          className="container mx-auto pt-4 lg:px-0 md:px-5 sm:px-5 px-5"
        ></div>
        <div className="bg-[#e5f7fe] pt-[60px] pb-12 h-[960px]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6">
              <h2 className="text-[#00B4F1] font-[500] uppercase tracking-widest lg:text-[16px] md:text-[16px] sm:text-sm text-sm mb-2">
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
                this time, please check back regularly, as new <br /> study
                centers may be added in the future.
              </p>
            </div>

            {/* Map Section */}
            <div className="rounded-lg overflow-hidden shadow-md mb-16 relative mt-[50px]">
              {/* US Map */}
              <div className="relative ">
                <div className="h-[600px] w-full rounded-xl overflow-hidden">
                  <div ref={mapRef} className="h-full w-full relative">
                    {/* Fallback content if Google Maps fails to load */}
                    <MyMapWithSearch
                      center={studyCentersWithCoordinates}
                      className="p-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Qualification Section */}
        <div
          id="qualify"
          className="container mx-auto pt-5 lg:px-0 md:px-5 sm:px-5 px-5"
        ></div>
        <div className="bg-white lg:py-14 md:py-8 sm:py-4 py-4">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-[#00B4F1] font-[500] uppercase tracking-wide lg:text-[18px] md:text-[16px] sm:text-sm text-sm mb-2">
              TAKE THE PRE-SCREENER
            </h2>

            <h2 className="lg:text-[38px] md:text-[30px] sm:text-lg xs:text-lg text-lg font-[700] text-[#121229] mb-3">
              Do I Qualify?
            </h2>

            <p className="text-[#39394A] lg:text-[18px] md:text-[16px] sm:text-sm text-sm font-relay mb-[55px]">
              To see if you might qualify for the study, we need to ask you 8
              quick questions. If you pass the pre-screener and appear to <br />
              prequalify, you can submit your contact information to the local
              study center. A study representative may contact you to tell you{" "}
              <br />
              more about the study, ask you more questions, answer your
              questions, and possibly schedule an office visit.
            </p>

            {/* Progress Steps */}
            <div className="mx-auto border border-[#DDE2E5] rounded-lg lg:p-10 md:p-8 sm:p-4 p-2 shadow-sm lg:h-[34rem] md:h-[32rem] sm:h-[30rem] h-[30rem]">
              <div className=" mx-auto mb-16">
                <div className="flex justify-center items-center mb-8 pt-4">
                  <div className="text-center">
                    <div className="rounded-full border border-[#00B4F1] flex items-center justify-center w-[20px] h-[20px]  mx-auto">
                      <div className="w-3 h-3 bg-[#00B4F1] rounded-full"></div>
                    </div>
                    <div className="text-[14px] font-[400] font-relay text-[#00B4F1] mt-2">
                      Select Location
                    </div>
                  </div>
                  <div className="lg:w-[130px] md:w-20 sm:w-[200px] w-[200px] mb-2 h-[3px] bg-[#CFD6DC] rounded relative bottom-[10px]"></div>

                  <div className="text-center">
                    <div className="rounded-full bg-blue-100 w-[20px] h-[20px] mx-auto"></div>

                    <div className="text-[14px] font-[400] font-relay text-[#ABB7C2] mt-2">
                      Pre-Screener
                    </div>
                  </div>
                  <div className="lg:w-[130px] md:w-20 sm:w-[200px] w-[200px] mb-2 h-[3px] bg-[#CFD6DC] rounded relative bottom-[10px]"></div>

                  <div className="text-center">
                    <div className="rounded-full bg-blue-100 w-[20px] h-[20px] mx-auto"></div>
                    <div className="text-[14px] font-[400] font-relay text-[#ABB7C2] mt-2">
                      Contact Info
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Selection Form */}
              <div className="lg:px-20 md:px-20 sm:px-3 px-3 mx-auto lg:pt-5 md:pt-3 pt-3">
                <h3 className="lg:text-[28px] md:text-[24px] sm:text-xl text-sm  font-[700] text-[#121229] mb-5 text-left">
                  Select a Study Location
                </h3>

                <p className="text-[#39394A] lg:text-[18px] md:text-[16px] sm:text-sm text-sms font-[400] font-relay mb-5 text-left">
                  Please select a study location near you to begin the
                  pre-screening process.
                </p>

                {/* Location Dropdown */}
                <div className="mb-8 pt-3">
                  <div className="relative w-full sm:min-w-[360px] md:min-w-[360px] md:max-w-[300px] lg:max-w-[320px]">
                    <LuMapPin className="absolute left-[10px] top-[16px] text-[#ABAFB1] text-[20px] ml-[5px]" />
                    <select
                      name="cars"
                      id="cars"
                      className="flex text-[#39394A] font-normal border-[#EDEDFF] w-full items-center border rounded-md p-3 ps-7 ml-[10px] text-left text-sm"
                      onChange={(e) => setSelectLocation(e.target.value)}
                    >
                      <option value="">Select a location...</option>
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
                    className="lg:text-[16px] md:text-[16px] sm:text-sm text-xs lg:px-5 md:px-5 sm:px-3 px-3 h-[48px] bg-[#00B4F1] text-white rounded-full hover:bg-cyan-600 transition-colors font-medium disabled:cursor-not-allowed"
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
        <div
          id="FAQs"
          className="container mx-auto lg:px-0 md:px-5 sm:px-5 px-5"
        ></div>
        <div className="bg-white lg:py-[15px] md:py-4 sm:py-2 py-2">
          <div className="container mx-auto px-4">
            <h3 className="text-[#00B4F1] font-[500] uppercase tracking-wide lg:text-[18px] md:text-[16px] sm:text-sm text-sm mb-[5px]">
              FAQS
            </h3>
            <h2 className="lg:text-[38px] md:text-[30px] sm:text-lg xs:text-lg text-lg font-[700] text-[#121229] mb-6">
              Frequently Asked Questions
            </h2>
            <FaqSection
              openReGelTecFaq={openReGelTecFaq}
              openHydrafil={openHydrafil}
            />
          </div>
        </div>
      </div>
      {/* <LandingPageLogin open={isOpen} handleSubmit={handleSubmit} /> */}
      {/* Cookies Modal */}
      {showCookiesModal && (
        <div className="fixed bottom-64 left-1/2 transform -translate-x-1/2 z-40 w-full">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Our website uses cookies
            </h3>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1 space-y-3">
                <p className="text-sm text-gray-600 leading-relaxed">
                  We value your privacy. This website stores cookies on your
                  computer. These cookies are used to improve your website
                  experience and provide more personalized services to you, both
                  on this website and through other media. To find out more
                  about the cookies we use, see our <br />{" "}
                  <span
                    className="text-[#00B4F1] underline cursor-pointer"
                    onClick={handlePrivacyPolicyClick}
                  >
                    Privacy Policy
                  </span>
                  .
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We won't track your information when you visit our website.
                  But in order to comply with your preferences, we'll have to
                  use just one tiny cookie so that you're not asked to make this
                  choice again.
                </p>
              </div>
            </div>
            <div className="flex space-x-3 lg:justify-end">
              <button
                onClick={handleDeclineCookies}
                className="px-8 py-2 border border-[#00B4F1] text-[#00B4F1] rounded-full hover:bg-blue-50 transition-colors font-medium"
              >
                Decline
              </button>
              <button
                onClick={handleAcceptCookies}
                className="px-8 py-2 bg-[#00B4F1] text-white rounded-full hover:bg-blue-600 transition-colors font-medium"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed top-[180px] left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-white rounded-lg p-6 w-[480px] shadow shadow-[#14142B14]">
            <p className="text-sm text-gray-700 mb-6 leading-relaxed">
              This website is only for use in the United States. By clicking OK
              you confirm that you are an adult over 18 years of age located in
              the United States, and you agree to the terms of our{" "}
              <span
                className="text-[#00B4F1] underline cursor-pointer"
                onClick={handlePrivacyPolicyClick}
              >
                Privacy Policy
              </span>
              .
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => window.open("https://regeltec.com/", "_blank")}
                className="px-6 py-2 border border-[#00B4F1] text-[#00B4F1] rounded text-sm font-medium hover:bg-blue-50"
              >
                Leave Website
              </button>
              <button
                onClick={handleLocationModalOk}
                className="px-8 py-2 bg-[#00B4F1] text-white rounded text-sm font-medium hover:bg-blue-600"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      {showPrivacyModal && (
        <div className="fixed inset-0 flex items-center justify-center z-60 shadow shadow-[#14142B14]">
          <div className="bg-white rounded-lg w-full max-w-2xl mx-4 h-[65vh] border-[#EFF0F6] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                  <img src={PrivacyLogo} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Privacy Policy
                  </h2>
                  <p className="text-sm text-[#00B4F1]">
                    Updated: March 1, 2025
                  </p>
                </div>
              </div>
              <button
                onClick={handlePrivacyModalClose}
                className="rounded-full hover:bg-gray-100 flex items-center justify-center"
              >
                <RxCross2 size={25} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  1. Introduction
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  ReGelTec, Inc. ("we," "our," or "us") is committed to
                  safeguarding the privacy of individuals ("you" or
                  "participants") who visit our website and provide personal
                  information to participate in our clinical trial for an
                  injectable spinal implant targeting back pain caused by
                  degenerative disc disease. This Privacy Policy outlines how we
                  collect, use, disclose, and protect your information.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  2. Information We Collect
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  We collect information that you voluntarily provide to us when
                  expressing interest in participating in our clinical trial and
                  completing our pre-screener to learn if you may qualify. The
                  information you provide may be used and disclosed in
                  accordance with this Privacy Policy, your express written
                  consent, to comply with a valid court order, or applicable
                  laws.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  The information we collect from you includes eligibility
                  information (on our pre-screener) and contact information,
                  including:
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Eligibility Information
                </h3>
                <ul className="text-sm text-gray-600 space-y-2 ml-4">
                  <li>• City, state, and ZIP code</li>
                  <li>
                    • Confirmation of age range (at least 22 years old) (Yes or
                    No)
                  </li>
                  <li>
                    • Confirmation of duration of chronic low back pain (at
                    least 6 months) (Yes or No)
                  </li>
                  <li>
                    • Confirmation of any history of lumbar spine surgery (Yes
                    or No)
                  </li>
                  <li>
                    • Sex, height, and weight (to calculate Body Mass Index)
                  </li>
                  <li>
                    • Confirmation of any cigarette, nicotine, or tobacco use
                    (Yes or No)
                  </li>
                  <li>
                    • Confirmation of having insulin-dependent diabetes mellitus
                    (Type 1 diabetes) (Yes or No)
                  </li>
                  <li>
                    • Confirmation of having had an MRI in the last 6 months
                    (Yes or No)
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Contact Information
                </h3>
                <ul className="text-sm text-gray-600 space-y-2 ml-4">
                  <li>• First and last name</li>
                  <li>• City, state and ZIP code</li>
                  <li>• Email address</li>
                  <li>• Phone number</li>
                </ul>
              </div>

              <div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  The contact information will be collected from you complete
                  personally identifiable information, including your name.
                  Contact information will only be collected from you if you
                  pre-qualify after completing our pre-screener. Your
                  eligibility information and contact information will be stored
                  and your identity will not be coded. Otherwise, if you do not
                  pre-qualify, any eligibility information we collect from you
                  will not be linked to any identifiable information about you.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  3. How We Use Your Information
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-2">
                  The information collected is used to:
                </p>
                <ul className="text-sm text-gray-600 space-y-2 ml-4 mb-4">
                  <li>
                    • Assess your eligibility for participation in the clinical
                    trial and contact you with an appropriate local study center
                    if applicable
                  </li>
                  <li>
                    • Provide you with information about clinical trial
                    enrollment and related opportunities
                  </li>
                  <li>
                    • Maintain records as required by regulatory guidelines
                  </li>
                  <li>
                    • Evaluate the reasons you were not eligible for the study
                    for purposes of market research and to communicate with the
                    FDA eligibility information only
                  </li>
                </ul>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We do not sell or rent your personal information to third
                  parties.
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Eligibility information that is not linked to your contact
                  information and cannot be used to identify you may be stripped
                  and shared in the individual or in the aggregate for our
                  legitimate business purposes.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  4. Sharing Your Information
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Every effort will be made to protect your privacy. This data
                  we collect from you will only be shared in accordance with
                  this Privacy Policy and will not be shared with anyone outside
                  this research unless required by law or a valid court order.
                  We may share your information only with:
                </p>
                <ul className="text-sm text-gray-600 space-y-2 ml-4">
                  <li>
                    • Clinical Study Sites, Clinical Research Organizations
                    (CROs), and Partners: Trusted entities assisting in
                    conducting the clinical trial, bound by confidentiality
                    agreements.
                  </li>
                  <li>
                    • Regulatory Authorities: As required to comply with
                    applicable laws and regulations.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  5. Data Security
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  We implement appropriate technical and organizational measures
                  to protect your personal information against unauthorized
                  access, alteration, disclosure, or destruction. However, no
                  method of transmission over the Internet or electronic storage
                  is 100% secure. While we strive to use commercially acceptable
                  means to protect your personal information, we cannot
                  guarantee its absolute security.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  6. Your Rights
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-2">
                  Depending on your jurisdiction, you may have rights regarding
                  your personal information, including:
                </p>
                <ul className="text-sm text-gray-600 space-y-2 ml-4 mb-4">
                  <li>• Accessing the data we hold about you</li>
                  <li>• Correcting inaccurate data</li>
                  <li>• Withdrawing consent for data processing</li>
                </ul>
                <p className="text-sm text-gray-600 leading-relaxed">
                  To exercise these rights, please contact us using the
                  information provided below.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  7. Links to Other Websites
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Our website may contain links to external sites. We are not
                  responsible for the content or privacy practices of such
                  sites. We encourage users to be aware when they leave our site
                  and to read the privacy statements of any other site that
                  collects personally identifiable information.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  8. Cookie Policy
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Our website uses cookies to enhance user experience and
                  analyze site usage. Cookies are small data files stored on
                  your device that help us understand how you interact with our
                  site. You can manage your cookie preferences through your
                  browser settings; however, disabling cookies may affect site
                  functionality.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  9. California Privacy Rights
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-2">
                  If you are a California resident, you have specific rights
                  under the California Consumer Privacy Act (CCPA), including:
                </p>
                <ul className="text-sm text-gray-600 space-y-2 ml-4 mb-4">
                  <li>
                    • Right to Know: You may request information about the
                    categories and specific pieces of personal data we have
                    collected about you
                  </li>
                  <li>
                    • Right to Delete: You may request the deletion of personal
                    information we have collected about you
                  </li>
                  <li>
                    • Right to Opt-Out: You have the right to opt-out of the
                    sale of your personal information
                  </li>
                  <li>
                    • Right to Non-Discrimination: You will not receive
                    discriminatory treatment for exercising your CCPA rights
                  </li>
                </ul>
                <p className="text-sm text-gray-600 leading-relaxed">
                  To exercise these rights, please contact us using the
                  information provided below.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  10. Children's Privacy
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Our services are not intended for individuals under 18. We do
                  not knowingly collect information from children.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  11. Changes to This Privacy Policy
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  We may update this Privacy Policy periodically. Changes will
                  be posted on this page with an updated effective date.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  12. Contact Us
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  If you have questions or concerns about this Privacy Policy or
                  our data practices, please contact us at:
                </p>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>ReGelTec, Inc.</p>
                  <p>307 West Camden Street</p>
                  <p>Suite 400</p>
                  <p>Baltimore, MD 21201</p>
                  <p>Email: privacy@regeltec.com</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 flex justify-end items-end">
              <button
                onClick={handlePrivacyModalClose}
                className="cursor-pointer bg-[#00B4F1] text-white px-6 py-[12px] text-[16px] rounded-full hover:bg-cyan-600 transition-colors font-normal"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
