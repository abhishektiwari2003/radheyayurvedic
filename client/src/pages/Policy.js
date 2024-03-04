import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="container mt-4">
        <div className="row align-items-center">
          <div className="col-md-6 text-center">
            <img
              src="/images/contactus.jpeg"
              alt="contactus"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-md-6">
            <p>
              Privacy Policy: At Radhey Ayurvedic Enterprises, we are deeply
              committed to protecting your privacy and ensuring the security of
              your personal information. This Privacy Policy outlines how we
              collect, use, and safeguard your data when you interact with our
              website and services.
            </p>
            <p>
              Information Collection: We may collect personal information, such
              as your name, email address, shipping address, and payment details
              when you make a purchase. We also gather non-personal data, such
              as browser type and IP address, to improve your browsing
              experience.
            </p>
            <p>
              Data Security: We employ robust security measures to protect your
              information from unauthorized access, alteration, disclosure, or
              destruction. Our secure payment processing partners ensure the
              security of your financial information.
            </p>
            <p>
              Cookies: We may use cookies to enhance your website experience.
              You can adjust your browser settings to manage cookies or opt out,
              although this may impact website functionality.
            </p>
            <p>
              Third-Party Links: Our website may contain links to third-party
              sites. We are not responsible for their privacy practices and
              recommend reviewing their privacy policies.
            </p>
            <p>
              Policy Updates: We may update this policy periodically to reflect
              changes in our practices and legal requirements. You will be
              notified of any substantial changes.
            </p>
            <p>
              Contact Us: If you have questions or concerns regarding your
              privacy or this policy, please reach out to us through our contact
              information provided on the website.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
