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

const Home = () => {
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const [selectLocation, setSelectLocation] = useState(null);
  const { data: allStudyCenter } = useGetAllStudyCenterWithOutPaginationQuery();


   const handleClickScroll = (id) => {
		const element = document.getElementById(`${id}`);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};


  const featureItems = [
    { text: "Local study center" },
    { text: "Local spine physician" },
    { text: "No cost to participate" },
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
  console.log(selectLocation, "selectLocation");
  return (
    <>
      <div className="">
        <div
          className="bg-white min-h-[100vh]"
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
                <div className="lg:w-1/2 lg:pr-12">
                  <div className="mb-6">
                    <p className="text-cyan-500 font-medium uppercase tracking-wide text-lg">
                      CLINICAL RESEARCH STUDY
                    </p>
                  </div>

                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                    Investigating a New Treatment for People Suffering from
                    Degenerative Disc Disease
                  </h1>

                  <p className="text-gray-700 mb-8 text-lg">
                    Learn More About the HYDRAFIL-D Research Study for Patients
                    with Chronic Low Back Pain Caused by Degenerative Disc
                    Disease
                  </p>

                  {/* Features with Checkmarks */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
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
                        <span className="ml-3 text-gray-700 text-lg">
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                    <button type="button" onClick={() => 	handleClickScroll("nearLocation")}  className="cursor-pointer px-8 py-3 border-2 border-cyan-500 text-cyan-500 rounded-full hover:bg-cyan-50 transition-colors font-medium text-lg">
                      Find A Study Location
                    </button>
                    <button type="button" onClick={() => 	handleClickScroll("qualify")}  className=" cursor-pointer px-8 py-3 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition-colors font-medium text-lg">
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
        <div className="bg-[#E5F7FE] mt-[-70px] rounded-[20px]  container mx-auto py-10">
          <div className="mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {infoCards.map((card, index) => (
                <div
                  key={index}
                  className="flex p-4 items-start"
                  style={{
                    borderRight: index < 2 ? "1px solid #e5e7eb" : "none",
                  }}
                >
                  {/* Icon placeholder */}
                  <div className="flex-shrink-0 mr-4">
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
                    <h3 className="font-medium text-gray-800 mb-2 text-xl">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 text-base">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Additional Section*/}
        <div className="container mx-auto pt-12 pt-8 ">
          <h2 className="text-cyan-500 font-medium uppercase tracking-wide text-lg">
            CHRONIC LOW BACK PAIN DUE TO DDD
          </h2>
        </div>
        <div className="container mx-auto mb-[50px]">
          <div className=" flex flex-col lg:flex-row justify-between">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                About Degenerative Disc Disease
              </h2>

              <p className="text-gray-700 text-lg mb-4">
                Low back pain is a common and debilitating condition affecting
                adults all over the world. Chronic low back pain can have many
                causes; for many, degenerative disc disease (DDD) is the primary
                culprit. The lumbar spine (lower back) plays a critical role in
                weight-bearing function and twisting movements. This makes the
                discs in your lower back more prone to breaking down
                (degeneration).
              </p>

              <p className="text-gray-700 text-lg mb-4">
                Wear-and-tear injuries can happen over time, along with natural
                aging processes, where the interior of the disc – the nucleus –
                can begin to dry up, weaken and collapse. As the nucleus
                dehydrates and shrinks, the disc able to properly bear weight,
                leading to tearing and further damage within and around the
                disc.
              </p>

              <p className="text-gray-700 text-lg mb-4">
                This can cause increased pain over time and can lead to other
                back problems including spinal stenosis or a herniated disc.
              </p>

              <p className="text-gray-700 text-lg mb-4">
                Conservative care treatment options for DDD such as pain
                medications, exercise, physical therapy, or epidural steroid
                injections may not adequately relieve the pain for some
                patients. When conservative care is not effective, some patients
                seek surgical alternatives such as spinal fusion or total disc
                replacement.
              </p>

              <p className="text-gray-700 text-lg mb-6">
                Traditional treatments for DDD are often ineffective or come
                with significant risks and side effects. Research is underway to
                find different ways to treat DDD, including the HYDRAFIL-D
                Research Study.
              </p>
            </div>
            <div>
              <div className="rounded-full ">
                <img
                  src={backpain}
                  alt="Person with lower back pain"
                  className="w-full h-auto"
                />
              </div>
              <div className="flex flex-col mt-8 sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <button onClick={() => 	handleClickScroll("nearLocation")}  className="cursor-pointer px-8 py-3 border-2 border-cyan-500 text-cyan-500 rounded-full hover:bg-cyan-50 transition-colors font-medium text-lg">
                  Find A Study Location
                </button>
                <button onClick={() => 	handleClickScroll("qualify")}  className=" cursor-pointer px-8 py-3 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition-colors font-medium text-lg">
                  See If You Qualify
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* About The HYDRAFIL-D Study Section */}
        <div className=" ">
          <div className="bg-[#e5f7fe] mx-auto py-16 mt-4 px-4 py-4">
            <div className="container mx-auto">
              <div className="flex flex-col lg:flex-row items-center gap-6">
                {/* Left Side - Image of Device */}
                <div>
                  <img
                    src={injection}
                    alt="HYDRAFIL injection device"
                    className="w-full h-auto"
                  />
                </div>

                {/* Right Side - Text Content */}
                <div className="lg:w-2/3 px-30">
                  <div className="mb-2">
                    <h2 className="text-cyan-500 font-medium uppercase tracking-wide text-lg">
                      HELP US EVALUATE A POTENTIAL NEW TREATMENT FOR DDD
                    </h2>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    About The HYDRAFIL-D Study
                  </h2>

                  <p className="text-gray-700 text-lg mb-4">
                    This research study is being sponsored by ReGelTec to
                    evaluate the safety and effectiveness of an investigational
                    spinal disc implant called HYDRAFIL.
                  </p>

                  <p className="text-gray-700 text-lg">
                    <span className="text-cyan-500 font-bold">HYDRAFIL</span> is
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
              <div className="px-8">
                <p className="text-gray-700 text-lg mb-4">
                  Approximately 225 adults with chronic low back pain will
                  participate in this research study at multiple study{" "}
                  <a href="#" className="text-cyan-500 hover:underline">
                    site locations
                  </a>{" "}
                  (i.e., local study centers) in the United States. Adults with
                  chronic low back pain due to DDD{" "}
                  <a href="#" className="text-cyan-500 hover:underline">
                    may qualify
                  </a>
                  .
                </p>

                <p className="text-gray-700 text-lg mb-4">
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
            <div className="my-20 container mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-cyan-500 font-medium uppercase tracking-wide text-lg mb-4">
                  ELIGIBILITY CRITERIA
                </h2>
                <h3 className="text-2xl font-bold text-gray-800 mb-2 max-w-3xl mx-auto">
                  There are many important criteria that you must meet to be
                  eligible for this study, including*:
                </h3>
                <p className="text-gray-600 italic">
                  *There are additional eligibility criteria
                </p>
              </div>
              {/* Eligibility Icons Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
                {/* Icon 1 */}
                <div className="flex flex-col items-center text-center border-r-[1px] border-r-[#00B4F1] border-dotted">
                  <div className="mb-4">
                    <img
                      src={growing}
                      alt="Age eligibility"
                      className="h-20 w-auto"
                    />
                  </div>
                  <p className="text-gray-700 font-medium">
                    You are 22 to 85
                    <br />
                    years old
                  </p>
                </div>

                {/* Icon 2 */}
                <div className="flex flex-col items-center text-center border-r-[1px] border-r-[#00B4F1] border-dotted">
                  <div className="mb-4">
                    <img
                      src={lowPain}
                      alt="Back pain"
                      className="h-20 w-auto"
                    />
                  </div>
                  <p className="text-gray-700 font-medium">
                    Your low back pain is
                    <br />
                    due to DDD
                  </p>
                </div>

                {/* Icon 3 */}
                <div className="flex flex-col items-center text-center border-r-[1px] border-r-[#00B4F1] border-dotted">
                  <div className="mb-4">
                    <img src={refresh} alt="Duration" className="h-20 w-auto" />
                  </div>
                  <p className="text-gray-700 font-medium">
                    Your low back pain has lasted
                    <br />
                    for at least 6 months
                  </p>
                </div>

                {/* Icon 4 */}
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    <img src={asset} alt="No surgery" className="h-20 w-auto" />
                  </div>
                  <p className="text-gray-700 font-medium">
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
        <div className="bg-[#e5f7fe] pt-12 h-[900px]" id="nearLocation">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6">
              <h2 className="text-cyan-500 font-medium uppercase tracking-wide text-lg">
                STUDY UNDERWAY AT MULTIPLE STUDY CENTERS IN THE US
              </h2>

              <h2 className="text-3xl font-bold text-gray-800 mb-6 mt-4">
                Find A Study Location Near You
              </h2>

              <p className="text-gray-700 text-lg mb-2 max-w-3xl mx-auto">
                Find a local study center in your area then see if you may be
                eligible to participate.
              </p>

              <p className="text-gray-700 text-lg mb-8 max-w-3xl mx-auto">
                If you don't see a local study center available in your area at
                this time, please check back regularly, as new study centers may
                be added in the future.
              </p>
            </div>

            {/* Map Section */}
            <div className="rounded-lg overflow-hidden shadow-md mb-16 relative">
              {/* US Map */}
              <div className="relative ">
                <div className="h-[600px] w-full rounded-xl overflow-hidden">
                  <div ref={mapRef} className="h-full w-full relative">
                    {/* Fallback content if Google Maps fails to load */}
                    <MyMapWithSearch />
                    {/* <img
                      src={map}
                      alt="Map"
                      className="w-full h-full object-cover"
                    /> */}
                    {/* {!window.google && (
                      <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center p-4">
                        <p className="text-gray-700 text-lg mb-4 text-center">
                          Map loading failed. Please ensure you have a valid
                          Google Maps API key configured.
                        </p>
                       
                      </div>
                    )} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Qualification Section */}
        <div className="bg-white py-16" id="qualify">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-cyan-500 font-medium uppercase tracking-wide text-lg mb-4">
              TAKE THE PRE-SCREENER
            </h2>

            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Do I Qualify?
            </h2>

            <p className="text-gray-700 text-lg mb-8  mx-auto px-20">
              To see if you might qualify for the study, we need to ask you 8
              quick questions. If you pass the pre-screener and appear to
              prequalify, you can submit your contact information to the local
              study center. A study representative may contact you to tell you
              more about the study, ask you more questions, answer your
              questions, and possibly schedule an office visit.
            </p>

            {/* Progress Steps */}
            <div className="mx-auto border border-[#DDE2E5] rounded-lg p-10 shadow-sm">
              <div className=" mx-auto mb-12">
                <div className="flex justify-center items-center gap-8 mb-8">
                  <div className="text-center">
                    <div className="rounded-full border border-[#00B4F1] flex items-center justify-center w-6 h-6 mx-auto">
                      <div className="w-3 h-3 bg-[#00B4F1] rounded-full"></div>
                    </div>
                    <Typography variant="small" className="text-[#00B4F1]">
                      Select Location
                    </Typography>
                  </div>
                  <div className="w-24 mb-2 h-1 bg-[#CFD6DC] rounded"></div>

                  <div className="text-center">
                    <div className="rounded-full bg-blue-100 w-6 h-6 mx-auto"></div>

                    <Typography variant="small" className="text-gray-400">
                      Pre-Screener
                    </Typography>
                  </div>
                  <div className="w-24 mb-2 h-1 bg-[#CFD6DC] rounded"></div>

                  <div className="text-center">
                    <div className="rounded-full bg-blue-100 w-6 h-6 mx-auto"></div>
                    <Typography variant="small" className="text-gray-400">
                      Contact Info
                    </Typography>
                  </div>
                </div>
              </div>

              {/* Location Selection Form */}
              <div className="px-20 mx-auto ">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-left">
                  Select a Study Location
                </h3>

                <p className="text-gray-700 mb-8 text-left">
                  Please select a study location near you to begin the
                  pre-screening process.
                </p>

                {/* Location Dropdown */}
                <div className="mb-8">
                  <div className="relative min-w-[300px] max-w-[300px]">
                    <LuMapPin className="absolute left-[10px] top-[16px]" />
                    <select
                      name="cars"
                      id="cars"
                      className="flex border-[#EDEDFF] w-full  items-center border rounded-md p-3 ps-7 text-left"
                      onChange={(e) => setSelectLocation(e.target.value)}
                    >
                      <option value="">Select Location</option>
                      {allStudyCenter?.data.map((center) => (
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
                    className="px-8 py-3 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition-colors font-medium disabled:cursor-not-allowed"
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
        <div className="bg-white py-10">
          <div className="container mx-auto px-4">
            <h3 className="text-xl font-bold text-[#00b4f1] mb-4">FAQS</h3>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Frequently Asked Question
            </h2>
            {/* FAQ content would go here */}
            <FaqSection />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
