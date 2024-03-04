import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"Abouts Us - Radhey Ayurvedic"}>
      <div className="container mt-4">
        <div className="row align-items-center">
          <div className="col-md-6 text-center">
            <img
              src="/images/about.jpeg"
              alt="about"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-md-6">
            <p className="text-justify">
              At Radhey Ayurvedic Enterprises, we are dedicated to promoting
              holistic health and well-being through the ancient wisdom of
              Ayurveda. We are a leading online-based Ayurvedic medicine
              supplier with an extensive catalog of over 5,000 high-quality
              products from various renowned Ayurvedic companies. Our mission is
              to make traditional Ayurvedic remedies and wellness products
              easily accessible to customers worldwide through a seamless
              e-commerce platform.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
