import React from "react";
import FooterDash from "../../components/layout/dashboard/Footer";
import AppBar from "../../components/layout/dashboard/AppBar";

interface DashboardContainerProps {
  children: React.ReactNode;
}

const DashboardContainer: React.FC<DashboardContainerProps> = ({
  children,
}) => {
  return (
    <div>
      <AppBar />
      <div className="pt-16">
      {children}
      </div>
      <FooterDash />
    </div>
  );
};

export default DashboardContainer;
