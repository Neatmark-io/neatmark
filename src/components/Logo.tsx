import React from "react";

const Logo: React.FC = () => {
  return (
    <div className="app-logo">
      <img className="app-logo-img" src="assets/logo.svg" alt="NeatMark"></img>
      <a className="app-logo-name" href="">
        Neatmark
      </a>
    </div>
  );
};

export default Logo;
