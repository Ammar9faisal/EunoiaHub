import React from "react";
import "./UserProfile.css";
import { stubData } from "../stubdata.js"; 

const UserProfile = () => {
  const { username, email, age, address, accountAge, dob } = stubData.userProfile; 

  return (
    <div className="user-profile">
      <div className="div">
        <div className="ellipse"></div>

        <div className="group">
          <div className="overlap-group">
            <div className="rectangle"></div>
            <div className="text-wrapper">{username}</div>
          </div>
        </div>

        <div className="group-2">
          <div className="text-wrapper-2">Email Address</div>
          <div className="text-wrapper-3">Account Age</div>
          <div className="text-wrapper-4">Address</div>
          <div className="text-wrapper-5">Date of Birth</div>
        </div>

        <div className="group-3">
          <div className="text-wrapper-6">{email}</div>
          <div className="text-wrapper-7">{accountAge}</div>
          <div className="text-wrapper-8">{address}</div>
          <div className="text-wrapper-9">{dob}</div>
        </div>

        <p className="p">© 2025 Wellness App. All rights reserved.</p>
      </div>
    </div>
  );
};

export default UserProfile;

