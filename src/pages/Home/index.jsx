import React, { useEffect, useRef } from "react";
import asset from "../../assets/images/asset.svg";
import backpain from "../../assets/images/backpain.svg";
import growing from "../../assets/images/growing.svg";
import injection from "../../assets/images/injection.svg";
import lab from "../../assets/images/lab.svg";
import map from "../../assets/images/map.svg";
import refresh from "../../assets/images/refresh.svg";
import FaqSection from "./FaqSection";
import { useNavigate } from "react-router-dom";
import MyMapWithSearch from "../../components/MyMapWithSearch";

const Home = () => {
  const mapRef = useRef(null);
  const navigate = useNavigate()

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

  return (
    <>
      <div className="px-[200px]">
        <div className="bg-white">
          {/* Hero Section */}
          <div className=" mx-auto px-4 py-12">
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
                  with Chronic Low Back Pain Caused by Degenerative Disc Disease
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
                  <button className="px-8 py-3 border-2 border-cyan-500 text-cyan-500 rounded-full hover:bg-cyan-50 transition-colors font-medium text-lg">
                    Find A Study Location
                  </button>
                  <button className="px-8 py-3 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition-colors font-medium text-lg">
                    See If You Qualify
                  </button>
                </div>
              </div>

              {/* Right Image */}
              <div className="lg:w-1/2 absolute top-0 right-20 opacity-90">
                <img
                  src={lab}
                  alt="Doctor explaining spinal treatment"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
          {/* Info Cards Section */}
        </div>
        <div className="bg-blue-50 py-10">
          <div className="container mx-auto px-4">
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
                      <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 text-cyan-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                    {card.icon === "syringe" && (
                      <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 text-cyan-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                          <path
                            fillRule="evenodd"
                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                    {card.icon === "location" && (
                      <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 text-cyan-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
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
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-cyan-500 font-medium uppercase tracking-wide text-lg mb-6">
            CHRONIC LOW BACK PAIN DUE TO DDD
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row justify-between">
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
              leading to tearing and further damage within and around the disc.
            </p>

            <p className="text-gray-700 text-lg mb-4">
              This can cause increased pain over time and can lead to other back
              problems including spinal stenosis or a herniated disc.
            </p>

            <p className="text-gray-700 text-lg mb-4">
              Conservative care treatment options for DDD such as pain
              medications, exercise, physical therapy, or epidural steroid
              injections may not adequately relieve the pain for some patients.
              When conservative care is not effective, some patients seek
              surgical alternatives such as spinal fusion or total disc
              replacement.
            </p>

            <p className="text-gray-700 text-lg mb-6">
              Traditional treatments for DDD are often ineffective or come with
              significant risks and side effects. Research is underway to find
              different ways to treat DDD, including the HYDRAFIL-D Research
              Study.
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
              <button className="px-8 py-3 border-2 border-cyan-500 text-cyan-500 rounded-full hover:bg-cyan-50 transition-colors font-medium text-lg">
                Find A Study Location
              </button>
              <button className="px-8 py-3 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition-colors font-medium text-lg">
                See If You Qualify
              </button>
            </div>
          </div>
        </div>
        {/* About The HYDRAFIL-D Study Section */}
        <div className=" py-16 mt-4">
          <div className="bg-[#e5f7fe] mx-auto px-4 py-4">
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
                  This research study is being sponsored by ReGelTec to evaluate
                  the safety and effectiveness of an investigational spinal disc
                  implant called HYDRAFIL.
                </p>

                <p className="text-gray-700 text-lg">
                  <span className="text-cyan-500 font-bold">HYDRAFIL</span> is a
                  hydrated polymer gel (hydrogel) that mimics the natural
                  properties of the nucleus inside the disc, and is designed to
                  be an injectable, soft, space-filling technology for minimally
                  invasive treatment of chronic low back pain from degenerative
                  disc disease (DDD). HYDRAFIL offers a novel approach to
                  treating DDD by delivering a hydrogel implant injected
                  directly through a needle to supplement and reinforce the
                  interior of the degenerated disc that is causing the pain
                  without removing any existing disc material. The intent of the
                  treatment is to reduce pain and improve function for people
                  with chronic low back pain due to DDD.
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
            {/* Eligibility Criteria Section */}
          </div>
          <div>
            <div className="mt-20">
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
                <div className="flex flex-col items-center text-center">
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
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    <img
                      src={backpain}
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
                <div className="flex flex-col items-center text-center">
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
        <div className="bg-[#e5f7fe] pt-12 h-[900px]">
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
                <div className=" w-full rounded-xl overflow-hidden">

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
                        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
                          <h3 className="font-bold text-gray-800 mb-2">
                            Local Study Center Example
                          </h3>
                          <p className="text-gray-600 mb-1">
                            Clinical Investigations
                          </p>
                          <p className="text-gray-700 mb-3">
                            Edmond, Oklahoma, 73103
                          </p>
                          <div className="flex items-center text-gray-600 mb-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            <span>2.5 miles away</span>
                          </div>
                          <button className="w-full bg-cyan-500 text-white rounded-full py-2 hover:bg-cyan-600 transition-colors font-medium">
                            Select This Location
                          </button>
                        </div>
                      </div>
                    )} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Qualification Section */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-cyan-500 font-medium uppercase tracking-wide text-lg mb-4">
              TAKE THE PRE-SCREENER
            </h2>

            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Do I Qualify?
            </h2>

            <p className="text-gray-700 text-lg mb-8 max-w-3xl mx-auto">
              To see if you might qualify for the study, we need to ask you 8
              quick questions. If you pass the pre-screener and appear to
              prequalify, you can submit your contact information to the local
              study center. A study representative may contact you to tell you
              more about the study, ask you more questions, answer your
              questions, and possibly schedule an office visit.
            </p>

            {/* Progress Steps */}
            <div className="max-w-3xl mx-auto mb-12">
              <div className="flex items-center justify-between relative">
                {/* Progress Bar Line */}
                <div className="absolute left-0 right-0 h-1 bg-gray-200 top-1/2 transform -translate-y-1/2 z-0">
                  <div className="h-full bg-cyan-500 w-1/6"></div>
                </div>

                {/* Step 1 - Active */}
                <div className="flex flex-col items-center relative z-10">
                  <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold mb-8">
                    1
                  </div>
                  <span className="text-sm font-medium text-cyan-500">
                    Select Location
                  </span>
                </div>

                {/* Step 2 - Inactive */}
                <div className="flex flex-col items-center relative z-10">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 font-bold mb-8">
                    2
                  </div>
                  <span className="text-sm font-medium text-gray-400">
                    Pre-Screener
                  </span>
                </div>

                {/* Step 3 - Inactive */}
                <div className="flex flex-col items-center relative z-10">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 font-bold mb-8">
                    3
                  </div>
                  <span className="text-sm font-medium text-gray-400">
                    Contact Info
                  </span>
                </div>
              </div>
            </div>

            {/* Location Selection Form */}
            <div className="max-w-3xl mx-auto border border-[#dde2e5] rounded-lg p-10 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-left">
                Select a Study Location
              </h3>

              <p className="text-gray-700 mb-8 text-left">
                Please select a study location near you to begin the
                pre-screening process.
              </p>

              {/* Location Dropdown */}
              <div className="mb-8">
                <div className="flex items-center border rounded-md p-3 text-left">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-500">Select a location...</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400 ml-auto"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              {/* Continue Button */}
              <div className="text-left">
                <button className="px-8 py-3 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition-colors font-medium" onClick={() => navigate("/prescreen")}>
                  Continue To Pre-Screener
                </button>
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
