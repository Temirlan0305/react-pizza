import React from 'react';
import Header from '../Header';
import { Outlet } from 'react-router-dom';

const MenuLayout: React.FC = () => {
   return (
      <div className="wrapper">
         <Header />
         <div className="content">
            <div className="container">
               <Outlet />
            </div>
         </div>
      </div>
   )
}

export default MenuLayout;