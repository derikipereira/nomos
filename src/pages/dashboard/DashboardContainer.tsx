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
      {children}
      <FooterDash />
    </div>
  );
};

export default DashboardContainer;
