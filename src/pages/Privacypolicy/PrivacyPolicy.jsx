import PrivacyLogo from '../../assets/images/privacyLogo.png';

const PrivacyPolicy = () => {
    return (
        <div className="max-w-[77%] mx-auto p-6 bg-white pt-[100px]">
            <div className='flex gap-8 items-center mb-8'>
                <img src={PrivacyLogo} alt="image" className='h-[52px] w-[42px]' />
                <div className="">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
                    <p className='text-[14px] text-[#00B4F1]'>Updated: March 1, 2025</p>
                </div>
            </div>

            <div className="space-y-8 text-[#39394A] font-relay">
                {/* Introduction */}
                <section className='leading-7'>
                    <h2 className="text-[16px] font-bold mb-4">1. Introduction</h2>
                    <p className="">
                        ReGelTec, Inc. ("we," "our," or "us") is committed to safeguarding the privacy of individuals ("you" or "participants") who visit our website and provide personal <br />
                        information to participate in our clinical trial for an injectable spinal implant targeting back pain caused by degenerative disc disease. This Privacy Policy outlines <br />
                        how we collect, use, disclose, and protect your information.
                    </p>
                </section>

                {/* Information We Collect */}
                <section className='leading-7'>
                    <h2 className="text-[16px] font-bold mb-4">2. Information We Collect</h2>
                    <p className="mb-4">
                        We collect information you provide directly to us, information we obtain automatically when you use our Services, and information from third-party sources.
                    </p>

                    <h3 className="text-[16px] font-bold mb-3">Eligibility Information:</h3>
                    <ul className="list-disc pl-6 space-y-2 mb-4 text-sm">
                        <li>City, state, and ZIP code</li>
                        <li>Confirmation of age range (22-85 years old) (Yes or No)</li>
                        <li>Confirmation of duration of chronic low back pain of at least 6 months (Yes or No)</li>
                        <li>Confirmation of any history of lumbar spine surgery (Yes or No)</li>
                        <li>Sex, height, and weight (to calculate Body Mass Index)</li>
                        <li>Confirmation of any cigarette, nicotine, or tobacco use (Yes or No)</li>
                        <li>Confirmation of having insulin-dependent diabetes mellitus (Type 1 diabetes) (Yes or No)</li>
                        <li>Confirmation of having had an MRI in the last 6 months (Yes or No)</li>
                    </ul>

                    <h3 className="text-[16px] font-bold mb-3">Contact Information:</h3>
                    <ul className="list-disc pl-6 space-y-2 text-sm">
                        <li>First and last name</li>
                        <li>City, state, and ZIP code</li>
                        <li>Email address</li>
                        <li>Phone number</li>
                    </ul>

                    <p className="my-4">
                        The contact information we collect from you contains personally identifiable information, including your name. Contact information will only be collected from you if you pre-qualify after completing our pre-screener. Your eligibility information and contact information will be linked and your identity will not be coded. Otherwise, if you do not pre-qualify, any eligibility information we collect from you will not be linked to any personally identifiable information.
                    </p>
                </section>

                {/* How We Use Information */}
                <section className='leading-7'>
                    <h2 className="text-[16px] font-bold mb-4">3. How We Use Your Information</h2>
                    <p className="mb-3">The information collected is used to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-sm">
                        <li>Assess your potential eligibility for participation in the clinical trial and connect you with an appropriate local study center, if applicable </li>
                        <li>Communicate with you regarding trial details, updates, and related opportunities </li>
                        <li>Maintain records as required by regulatory guidelines </li>
                        <li>Evaluate the reason(s) you were not eligible for the study for purposes of market research and to communicate with the FDA (eligibility information only)</li>
                    </ul>
                    <p className="my-4">
                        We do not sell or rent your personal information to third parties.
                    </p>
                    <p className="my-4">
                        Eligibility information that is not linked to your contact information and cannot be used to identify you, may be analyzed and shared in the individual or in the aggregate for our legitimate business purposes.
                    </p>
                </section>

                {/* Information Sharing */}
                <section className='leading-7'>
                    <h2 className="text-[16px] font-bold mb-4">4. Sharing Your Information</h2>
                    <p className="mb-4">

                        Every effort will be made to protect your privacy. The data we collect from you will only be shared in accordance with this Privacy Policy and will not be shared with anyone outside the research unless required by law or a valid court order. We may share your information with:
                    </p>

                    <ul className="list-disc pl-6 space-y-2 text-sm">
                        <li>Clinical Study Sites, Clinical Research Organizations (CROs), and Partners: Trusted entities assisting in conducting the clinical trial, bound by confidentiality agreements.
                        </li>
                        <li>Regulatory Authorities: As required to comply with applicable laws and regulations. </li>
                    </ul>
                </section>

                {/* Data Security */}
                <section className='leading-7'>
                    <h2 className="text-[16px] font-bold mb-4">5. Data Security</h2>
                    <p className="mb-4">

                        We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
                    </p>

                </section>

                {/* Data Retention */}
                <section className='leading-7'>
                    <h2 className="text-[16px] font-bold mb-4">6. Your Rights</h2>
                    <p>
                        Depending on your jurisdiction, you may have rights regarding your personal information, including:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-sm">
                        <li>Accessing the data we hold about you</li>
                        <li>Requesting corrections or updates </li>
                        <li>Withdrawing consent for data processing </li>
                    </ul>

                    <p>
                        To exercise these rights, please contact us using the information provided below.
                    </p>
                </section>

                {/* Your Rights */}
                <section className='leading-7'>
                    <h2 className="text-[16px] font-bold mb-4">7. Links to Other Websites </h2>
                    <p className="mb-3">
                        Our website may contain links to external sites. We are not responsible for the content or privacy practices of such sites. We encourage users to be aware when they leave our site and to read the privacy statements of any other site that collects personally identifiable information.
                    </p>
                </section>

                {/* Cookies */}
                <section className='leading-7'>
                    <h2 className="text-[16px] font-bold mb-4">8. Cookie Policy </h2>
                    <p className="mb-4">
                        Our website uses cookies to enhance user experience and analyze site usage. Cookies are small data files stored on your device that help us understand how you interact with our site. You can manage your cookie preferences through your browser settings; however, disabling cookies may affect site functionality.
                    </p>
                </section>

                {/* Third-Party Services */}
                <section className='leading-7'>
                    <h2 className="text-[16px] font-bold mb-4">9. California Privacy Rights </h2>
                    <p className="mb-4">
                        If you are a California resident, you have specific rights under the California Consumer Privacy Act (CCPA), including:
                    </p>

                    <ul className="list-disc pl-6 space-y-2 text-sm">
                        <li>Right to Know: You may request information about the categories and specific pieces of personal data we have collected about you. </li>
                        <li>Right to Delete: You may request the deletion of personal information we have collected from you, subject to certain exceptions. </li>
                        <li>Right to Opt-Out: You have the right to opt-out of the sale of your personal information.  </li>
                        <li>Right to Non-Discrimination: You will not receive discriminatory treatment for exercising your CCPA rights.   </li>

                    </ul>
                    <p className="mb-4">
                        To exercise these rights, please contact us using the information provided below.
                    </p>

                </section>

                {/* Children's Privacy */}
                <section className='leading-7'>
                    <h2 className="text-[16px] font-bold mb-4">10. Children's Privacy</h2>
                    <p>
                        Our services are not intended for individuals under 18. We do not knowingly collect information from children.
                    </p>
                </section>

                {/* International Users */}
                <section className='leading-7'>
                    <h2 className="text-[16px] font-bold mb-4">11. Changes to This Privacy Policy </h2>
                    <p>
                        We may update this Privacy Policy periodically. Changes will be posted on this page with an updated effective date.
                    </p>
                </section>

                {/* Changes to Privacy Policy */}
                <section className='leading-7'>
                    <h2 className="text-[16px] font-bold mb-4">12. Contact Us</h2>
                    <p className="mb-4">
                        If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                    </p>
                    <div className="">
                        <p className="font-medium">ReGelTec, Inc.</p>
                        <p className="font-medium">323 West Camden Street</p>
                        <p className="font-medium">Suite 600</p>
                        <p className="font-medium">Baltimore, MD 21201</p>
                        <p className="font-medium">Email: referrals@hydrafilresearchstudy.com</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;