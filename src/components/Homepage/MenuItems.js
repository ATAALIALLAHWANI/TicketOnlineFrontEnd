import React from 'react';
import { useAuth } from '../AuthContext.js';

const MenuItems = () => {
  const { isLoggedIn } = useAuth();

  const items = [
    {
      title: "Home",
      url: "/",
      cName: "nav-links",
      icon: "fa-solid fa-house-user",
    },
    {
      title: "About",
      url: "/about",
      cName: "nav-links",
      icon: "fa-solid fa-circle-info",
    },
    {
      title: "Service",
      url: "/service",
      cName: "nav-links",
      icon: "fa-solid fa-briefcase",
    },
    {
      title: "Contact",
      url: "/contact",
      cName: "nav-links",
      icon: "fa-solid fa-address-book",
    },
  ];

  if (!isLoggedIn) {
    items.push({ title: "Sign Up", url: "/SignUp", cName: "nav-links-mobile" });
  }else{
    items.push({ title: "Messages", url: "/Messages", cName: "nav-links", icon: "fa-solid fa-message"});
    items.push({ title: "Notification", url: "/Notification", cName: "nav-links", icon: "fa-sharp fa-solid fa-bell"});
    items.push({ title: "My profile", url: "/Profile", cName: "nav-links", icon: "fa-solid fa-user"});
  }


  return items;
};

export default MenuItems;
