import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import TimelineIcon from "@mui/icons-material/Timeline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PersonIcon from "@mui/icons-material/Person";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BarChartIcon from "@mui/icons-material/BarChart";
import FeedbackIcon from "@mui/icons-material/Feedback";
import EmailIcon from "@mui/icons-material/Email";
import MessageIcon from "@mui/icons-material/Message";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { Link } from "react-router-dom";
import "./SideBar.css";

export default function SideBar() {
  return (
    <div className="sideBar-container">
      <div className="sideBar-wrapper">
        <div className="sideBar-list">
          <p className="list__title">DashBoard</p>
          <ul className="sideBar-items">
            <Link className="sideBar__link" to="/cms">
              <HomeIcon className="icon" />
              Home
            </Link>
            <Link className="sideBar__link">
              <TimelineIcon className="icon" />
              Analytics
            </Link>
            <Link className="sideBar__link">
              <TrendingUpIcon className="icon" />
              Sales
            </Link>
          </ul>
        </div>

        <div className="sideBar-list">
          <p className="list__title">Quick Menu</p>
          <ul className="sideBar-items">
            <Link className="sideBar__link" to="/cms/users">
              <PersonIcon className="icon" />
              Users
            </Link>
            <Link className="sideBar__link" to="/cms/newUser">
              <AccessibilityNewIcon className="icon" />
              New User
            </Link>
            <Link className="sideBar__link" to="/cms/products">
              <Inventory2Icon className="icon" />
              Products
            </Link>
            <Link className="sideBar__link" to="/cms/newProduct">
              <ProductionQuantityLimitsIcon className="icon" />
              New Product
            </Link>
            <Link className="sideBar__link">
              <AttachMoneyIcon className="icon" />
              Transactions
            </Link>
            <Link className="sideBar__link">
              <BarChartIcon className="icon" />
              Report
            </Link>
          </ul>
        </div>

        <div className="sideBar-list">
          <p className="list__title">Notifacions</p>
          <ul className="sideBar-items">
            <Link className="sideBar__link">
              <EmailIcon className="icon" />
              Mail
            </Link>
            <Link className="sideBar__link">
              <FeedbackIcon className="icon" />
              Feedback
            </Link>
            <Link className="sideBar__link">
              <MessageIcon className="icon" />
              Messages
            </Link>
          </ul>
        </div>

        <div className="sideBar-list">
          <p className="list__title">Staff</p>
          <ul className="sideBar-items">
            <Link className="sideBar__link">
              <BusinessCenterIcon className="icon" />
              Manage
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
