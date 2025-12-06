


import React, { useState, useEffect, useRef } from 'react';
import { Logo } from './icons/Logo';
import { SearchIcon } from './icons/SearchIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { MenuIcon } from './icons/MenuIcon';
import { CloseIcon } from './icons/CloseIcon';
import { BellIcon } from './icons/BellIcon';
import { CurrentUser, Notification } from '../types';
import ThemeToggle from './ThemeToggle';
import { getNotifications, markAllNotificationsAsRead } from '../services/database';

interface HeaderProps {
  onSearchToggle: () => void;
  currentUser: CurrentUser | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchToggle, currentUser, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const navRef = useRef<HTMLElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNotifications(getNotifications());
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const navLinks = [
    { name: 'Home', href: '#' },
    {
      name: 'About Us',
      submenu: [
        { name: 'Our Mission', href: '#' },
        { name: 'Campus Tour', href: '#campus-map' },
        { name: 'Our Team', href: '#our-team' },
      ],
    },
    { name: 'Courses', href: '#' },
    { name: 'Reports', href: '#' },
    { name: 'News', href: '#news-section' },
    {
      name: 'Resources',
      submenu: [
        { name: 'Learning Materials', href: '#resources-section' },
        { name: 'FAQ', href: '#faq' },
      ],
    },
    { name: 'Contact', href: '#' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const targetNode = event.target as Node;
      if (navRef.current && !navRef.current.contains(targetNode)) {
        setOpenDropdown(null);
      }
      if (notificationRef.current && !notificationRef.current.contains(targetNode)) {
        setIsNotificationPanelOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleDropdownToggle = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
    setIsNotificationPanelOpen(false);
  };

  const handleMouseEnter = (name: string) => {
    if (window.innerWidth >= 1024) { // Only on desktop
        setOpenDropdown(name);
        setIsNotificationPanelOpen(false);
    }
  };
  
  const handleMouseLeave = () => {
    if (window.innerWidth >= 1024) { // Only on desktop
        setOpenDropdown(null);
    }
  };
  
  const handleLinkClick = (isSubmenu: boolean) => {
    if (isSubmenu) {
      setOpenDropdown(null);
    }
  };
  
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(prev => {
      const isOpening = !prev;
      if (!isOpening) {
        setOpenDropdown(null);
      }
      return isOpening;
    });
  };
  
  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };
  
  const handleNotificationToggle = () => {
    setIsNotificationPanelOpen(prev => !prev);
    setOpenDropdown(null);
  };

  const handleMarkAllAsRead = () => {
    markAllNotificationsAsRead();
    setNotifications(getNotifications());
  };


  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between h-20">
          <a href="#" className="flex-shrink-0" onClick={handleMobileLinkClick}>
            <Logo />
          </a>
          <nav ref={navRef} className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) =>
              link.submenu ? (
                <div key={link.name} className="relative" onMouseEnter={() => handleMouseEnter(link.name)} onMouseLeave={handleMouseLeave}>
                  <button
                    onClick={() => handleDropdownToggle(link.name)}
                    className="flex items-center text-current hover:text-sky-500 dark:hover:text-sky-300 transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black"
                    aria-expanded={openDropdown === link.name}
                  >
                    {link.name}
                    <ChevronDownIcon className={`ml-1 w-5 h-5 transition-transform ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                  </button>
                  {openDropdown === link.name && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white dark:bg-gray-900 rounded-md shadow-lg py-2 z-10 border dark:border-gray-700">
                      {link.submenu.map((sublink) => (
                        <a
                          key={sublink.name}
                          href={sublink.href}
                          onClick={() => handleLinkClick(true)}
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white"
                        >
                          {sublink.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a key={link.name} href={link.href} onClick={() => handleLinkClick(false)} className="text-current hover:text-sky-500 dark:hover:text-sky-300 transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black">
                  {link.name}
                </a>
              )
            )}
          </nav>
          <div className="flex items-center space-x-2 md:space-x-4">
            <button onClick={onSearchToggle} aria-label="Open search" className="text-current hover:text-sky-500 dark:hover:text-sky-300 p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black">
              <SearchIcon className="w-6 h-6" />
            </button>
            <ThemeToggle />
            <div className="relative" ref={notificationRef}>
              <button
                onClick={handleNotificationToggle}
                aria-label="Open notifications"
                className="relative text-current hover:text-sky-500 dark:hover:text-sky-300 p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black"
              >
                <BellIcon className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center ring-2 ring-white dark:ring-black">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotificationPanelOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 md:w-96 bg-white dark:bg-gray-900 rounded-md shadow-lg z-20 border dark:border-gray-700">
                  <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-current">Notifications</h3>
                    {unreadCount > 0 && (
                       <button onClick={handleMarkAllAsRead} className="text-sm text-sky-500 dark:text-sky-400 hover:underline focus:outline-none focus-visible:ring-2 rounded focus-visible:ring-sky-500">
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <ul className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map(notification => (
                        <li key={notification.id} className="border-b border-gray-100 dark:border-gray-800 last:border-b-0">
                          <a href={notification.link || '#'} className="block p-4 hover:bg-gray-100 dark:hover:bg-gray-800">
                            <div className="flex items-start space-x-3">
                              {!notification.read && (
                                <span className="flex-shrink-0 w-2.5 h-2.5 bg-sky-400 rounded-full mt-1.5" aria-label="Unread notification"></span>
                              )}
                              <div className={notification.read ? 'pl-5' : ''}>
                                <p className={`text-sm ${notification.read ? 'text-gray-500 dark:text-gray-400' : 'text-current'}`}>
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
                              </div>
                            </div>
                          </a>
                        </li>
                      ))
                    ) : (
                      <li className="p-4 text-center text-gray-500 dark:text-gray-400">No new notifications</li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {currentUser ? (
              <div className="hidden lg:flex items-center space-x-4">
                {currentUser.role === 'student' && (
                  <a href={`#/students/${currentUser.id}`} className="font-semibold hover:text-sky-500 dark:hover:text-sky-300 transition-colors">
                    My Dashboard
                  </a>
                )}
                <button onClick={onLogout} className="bg-gray-800 text-white font-semibold px-4 py-2 rounded-full hover:bg-gray-700 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-300 transition-colors">
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-2">
                <a href="#login" className="bg-transparent font-semibold px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  Login
                </a>
                 <a href="#signup" className="bg-gray-800 text-white dark:bg-white dark:text-black font-semibold px-4 py-2 rounded-full hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors">
                  Sign Up
                </a>
              </div>
            )}
            <button onClick={handleMobileMenuToggle} className="lg:hidden p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black" aria-label="Toggle mobile menu" aria-expanded={isMobileMenuOpen}>
              {isMobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-sm lg:hidden transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="container mx-auto px-6 pt-24">
             <nav className="flex flex-col space-y-4">
               {navLinks.map((link) => (
                 <div key={link.name}>
                   {link.submenu ? (
                     <>
                       <button onClick={() => handleDropdownToggle(link.name)} className="w-full text-left flex justify-between items-center py-2 text-xl">
                         {link.name}
                         <ChevronDownIcon className={`w-5 h-5 transition-transform ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                       </button>
                       {openDropdown === link.name && (
                         <div className="pl-4 pt-2 space-y-2">
                           {link.submenu.map((sublink) => (
                             <a key={sublink.name} href={sublink.href} onClick={handleMobileLinkClick} className="block py-2 text-lg text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                               {sublink.name}
                             </a>
                           ))}
                         </div>
                       )}
                     </>
                   ) : (
                     <a href={link.href} onClick={handleMobileLinkClick} className="block py-2 text-xl">
                       {link.name}
                     </a>
                   )}
                 </div>
               ))}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                  {currentUser ? (
                    <>
                      {currentUser.role === 'student' && (
                        <a href={`#/students/${currentUser.id}`} onClick={handleMobileLinkClick} className="block py-2 text-xl">
                            My Dashboard
                        </a>
                      )}
                      <button onClick={() => { onLogout(); handleMobileLinkClick(); }} className="w-full text-left py-2 text-xl">
                        Logout
                      </button>
                    </>
                  ) : (
                     <>
                        <a href="#login" onClick={handleMobileLinkClick} className="block py-2 text-xl">
                          Login
                        </a>
                        <a href="#signup" onClick={handleMobileLinkClick} className="block py-2 text-xl">
                          Sign Up
                        </a>
                     </>
                  )}
                </div>
             </nav>
          </div>
      </div>
    </>
  );
};

export default Header;