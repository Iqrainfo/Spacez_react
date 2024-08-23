import React, { useState } from 'react'
import { FiMenu } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import '../../styles/sidebar.css'
import { NavLink } from 'react-router-dom';
//-----------------workflow icon
import { MdOutlineChangeCircle } from "react-icons/md";
import { BsListCheck } from "react-icons/bs";
import { IoSearchCircleOutline } from "react-icons/io5";
import { IoPeopleCircleOutline } from "react-icons/io5";
import { PiCurrencyInr } from "react-icons/pi";
import { GrDocumentTime } from "react-icons/gr";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { GiIdCard } from "react-icons/gi";
import { LiaPencilRulerSolid } from "react-icons/lia";
import { FaUsersLine } from "react-icons/fa6";
import { PiGridNineLight } from "react-icons/pi";
import { RiDatabaseLine } from "react-icons/ri";
import { TbCalendarTime } from "react-icons/tb";
import { FaHandshake } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { IconListSidebar } from '../utils/IconMapping';
//-------------------------------------------
const CustomNavLink = ({ to, children, disabled, ...rest }) => {
  if (disabled) {
    return <span className="side_nav_link_disable">{children}</span>;
  }
  return <NavLink to={to} {...rest}>{children}</NavLink>;
};


const CustomNavLinkRes = ({ to, children, disabled, ...rest }) => {
  if (disabled) {
    return <span className="res_side_disable">{children}</span>;
  }
  return <NavLink to={to} {...rest}>{children}</NavLink>;
};

// const CustomIcon = (IconComponent) => {
//   switch (IconComponent) {
//     case 'IDT Service Request':
//       return <RiCustomerService2Line className='sidebar_icon' />;
//     case 'IDT Clearance Form':
//       return <PiHandSwipeRight className='sidebar_icon' />;
//     case 'IDT Helpdesk':
//       return <PiChatDots className='sidebar_icon' />;
//     case 'SAP Helpdesk':
//       return <RiCustomerServiceLine className='sidebar_icon' />;
//     case 'SAP Helpdesk Reports':
//       return <RiFileEditLine className='sidebar_icon' />;
//     case 'IDT Helpdesk Reports':
//       return <LuFileEdit className='sidebar_icon' />;
//     default:
//       return '';
//   }
// };

const IconMapping = {
  "IDT Service Request": IconListSidebar.ISR,
  "IDT Clearance Form": IconListSidebar.ICF,
  "IDT Helpdesk": IconListSidebar.IHI,
  "SAP Helpdesk": IconListSidebar.SH,
  "SAP Helpdesk Reports":IconListSidebar.IHR,
  "IDT Helpdesk Reports":IconListSidebar.IHR,
  "My WorkFlows": <MdOutlineChangeCircle className='sidebar_icon_two' />,
  "My Assignments": <BsListCheck className='sidebar_icon_two' />,
  "Find Workflows": <IoSearchCircleOutline className='sidebar_icon_two' />,
  "Assign Workflow": <IoPeopleCircleOutline className='sidebar_icon_two' />,
  "Expense Claims": <PiCurrencyInr className='sidebar_icon_two' />,
  "Timesheet Management": <GrDocumentTime className='sidebar_icon_two' />,
  "Suvidha Helpdesk": <TfiHeadphoneAlt className='sidebar_icon_two' />,
  "Business Card Requisition": <GiIdCard className='sidebar_icon_two' />,
  "Stationary Requisition": <LiaPencilRulerSolid className='sidebar_icon_two' />,
  "Conference Room": <FaUsersLine className='sidebar_icon_two' />,
  "Timesheet Report": <PiGridNineLight className='sidebar_icon_two' />,
  "WBS Management": <RiDatabaseLine className='sidebar_icon_two' />,
  "Timsheet Setup": <TbCalendarTime className='sidebar_icon_two' />,
  "Delegation": <FaHandshake className='sidebar_icon_two' />,
  "Log Display": <MdOutlineTimer className='sidebar_icon_two' />,
  "TPCS User Management": <FaRegUser className='sidebar_icon_two' />,
  "Suvidha User Management": <FaRegUser className='sidebar_icon_two' />,
}



function PageSidebar({ data }) {
  const [sidebarOpen, setSideBarOpen] = useState(false);


  // const handleViewSidebar = () => {
  //   setSideBarOpen(!sidebarOpen);
  //   const sidebarWidth = sidebarOpen ? '50px' : '240px';
  //   document.querySelector('.sidebar_ul').style.width = sidebarWidth;

  // }
  const handleViewSidebarHoverIn = () => {
    setSideBarOpen(true);
    document.querySelector('.sidebar_ul').style.width = '240px';

  }
  const handleViewSidebaHoverOut = () => {
    setSideBarOpen(false);
    document.querySelector('.sidebar_ul').style.width = '50px';

  }

  return (
    <>
      {data && (
        <>
          <div className='sidebar'>
            {/* <ul className='sidebar_ul' onMouseEnter={handleViewSidebar} onMouseLeave={handleViewSidebar}> */}
            <ul className='sidebar_ul' onMouseEnter={handleViewSidebarHoverIn} onMouseLeave={handleViewSidebaHoverOut}>
              <li className='sidebar_li'>
                {sidebarOpen ? <RxCross1 className='sidebar_icon' /> : <FiMenu className='sidebar_icon' />}
              </li>
              {data.map((item, i) => {
                return <li className="sidebar_li" key={i}>
                  <CustomNavLink to={item.route} disabled={item.disable} className='sidebar_nav'>
                    {IconMapping[item.title]}
                    {sidebarOpen && <span className='link_tittle'>{item.title}</span>}
                  </CustomNavLink>
                </li>
              })}

              <hr className='mt-2' />
            </ul>
          </div>
          <div className='sidebar-nav'>
            <ul className='res_sidebar'>
              {data.map((item, i) => {
                return <li key={i}>
                  <CustomNavLinkRes to={item.route} disabled={item.disable} className='sidebar_nav'>
                    {IconMapping[item.title]}
                  </CustomNavLinkRes>
                </li>
                // <Tooltip title={item.title} key={i}>
                //   <li  >
                //     <CustomNavLink to={item.route} disabled={item.disable} className='sidebar_nav'>
                //       {CustomIcon(item.icon)}
                //     </CustomNavLink>
                //   </li>
                // </Tooltip>
              })}
            </ul>
          </div>
        </>
      )}
    </>
  )
}

export default PageSidebar