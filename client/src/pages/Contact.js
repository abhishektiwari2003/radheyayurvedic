import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact Us"}>
      <div className="container mt-4">
        <div className="row align-items-center">
          <div className="col-md-12 text-center">
            <img
              src="/images/contactus.jpeg"
              alt="contactus"
              style={{ width: "100%" }}
            />
            <h1 className="bg-green p-2 text-white text-center mt-3">
              CONTACT US
            </h1>
          </div>
          <div className="col-md-12 text-center">
            <p className="text-justify mt-2">
              Any query and info about the product, feel free to call anytime;
              we're available 24x7.
            </p>
            <p className="mt-3">
              <BiMailSend /> : radheyayurvedic@gmail.com
            </p>
            <p className="mt-3">
              <BiPhoneCall /> : +91 7021885204
            </p>
            <p className="mt-3">
              <BiSupport /> : 1800-0000-0000 (toll-free)
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
