import React from "react";

/**
 * Logo Component
 *
 * This component displays the application's logo and name.
 *
 * @returns {JSX.Element} A JSX element representing the logo.
 */
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
