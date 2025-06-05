import { useEffect, useState } from "react";

const CookiesModal = ({ handlePrivacyPolicyClick }) => {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setShowModal(true);
    }
  }, []);
  const handleAcceptCookies = () => {
    // Store acceptance in localStorage
    localStorage.setItem(
      "cookieConsent",
      JSON.stringify({
        accepted: true,
        timestamp: new Date().toISOString(),
        version: "1.0", // You can use this for future policy updates
      })
    );
    setShowModal(false);
  };

  const handleDeclineCookies = () => {
    // Store decline in localStorage
    localStorage.setItem(
      "cookieConsent",
      JSON.stringify({
        accepted: false,
        timestamp: new Date().toISOString(),
        version: "1.0",
      })
    );
    setShowModal(false);
  };
  if (!showModal) {
    return null;
  }
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-40 w-full">
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Our website uses cookies
        </h3>
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1 space-y-3">
            <p className="text-sm text-gray-600 leading-relaxed">
              We value your privacy. This website stores cookies on your
              computer. These cookies are used to improve your website
              experience and provide more personalized services to you, both on
              this website and through other media. To find out more about the
              cookies we use, see our{"  "}
              <span
                className="text-[#00B4F1] underline cursor-pointer"
                onClick={handlePrivacyPolicyClick}
              >
                Privacy Policy
              </span>
              <span className="text-[#39394A]">.</span>
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              We won't track your information when you visit our website. But in
              order to comply with your preferences, we'll have to use just one
              tiny cookie so that you're not asked to make this choice again.
            </p>
          </div>
        </div>
        <div className="flex space-x-3 lg:justify-end mt-5">
          <button
            onClick={handleDeclineCookies}
            className="px-8 py-2 border border-[#00B4F1] text-[#00B4F1] rounded-full hover:bg-blue-50 transition-colors font-medium"
          >
            Decline
          </button>
          <button
            onClick={handleAcceptCookies}
            className="px-8 py-2 bg-[#00B4F1] text-white rounded-full hover:bg-[#00b5f1d0] transition-colors font-medium cursor-pointer"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookiesModal;
