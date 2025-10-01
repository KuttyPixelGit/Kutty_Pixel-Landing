import React from 'react';

interface HeaderProps {
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode }) => {
  // Empty header that just maintains the same layout
  return <header className="fixed top-6 right-6 z-50 h-12" />;
};

export default Header;