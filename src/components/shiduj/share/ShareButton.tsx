import React, {useState, useContext} from 'react'
import { RWebShare } from "react-web-share";
import { UserContext } from './../../auth/UserContext'
import CryptoJS from "crypto-js"

const ShareButton = () => {
 const { user } = useContext(UserContext)
// Encrypt
  var hash;
  if (user?.idResume) {
    hash  = CryptoJS.AES.encrypt(user.idResume.toString(), 'shidujKey').toString();
  }
  

  return (
    <div>
      {
        user.idResume &&
        <RWebShare
          data={{
            text: "",
            url: "https://myshidduchresume.com/#/profile/profileHub?" + hash ,
            title: "Share your resume information",
          }}
          onClick={() => console.log("shared successfully!")}

        >
          <button className="navbar__bottom--share btn__blue">Send & Share</button>

        </RWebShare>
      }

      {
        !user.idResume &&
          <button className="navbar__bottom--share btn__blue">Send & Share</button>
      }
    </div>
  );
};

export default ShareButton;