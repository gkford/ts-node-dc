import React from "react";
import { NavBarTabs } from "./navigation/desktop/nav-bar-tabs";
import { MobileNavBarTabs } from "./navigation/mobile/mobile-nav-bar-tabs";

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="page-layout">
      <NavBarTabs />
      <MobileNavBarTabs />
      <div>{children}</div>
    </div>
  );
};
