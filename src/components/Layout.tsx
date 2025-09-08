import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GDPRNotice from '@/components/GDPRNotice';
import GitHubAppreciationPopup from '@/components/GitHubAppreciationPopup';
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({
  children
}) => {
  return <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-0 my-0">
        {children}
      </main>
      <Footer />
      <GDPRNotice />
      <GitHubAppreciationPopup />
    </div>;
};
export default Layout;