import React from "react";
import Navbar from "../../components/layout/landing/Navbar";
import Footer from "../../components/layout/landing/Footer";

interface LandingContainerProps {
  children: React.ReactNode;
}

const LandingContainer: React.FC<LandingContainerProps> = ({ children }) => {
  return (
    <div className="landing-container">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default LandingContainer;
