import React from "react";
import { Link } from "react-router-dom";

// Styles + Components
import LogoWhite from "../../assets/images/logo.svg";

const Forgot = () => {
  return (
    <>
      <div className="hero">
        {/* logo */}
        <div className="logo">
          <img src={LogoWhite} alt="Logo" />
        </div>
        <h1 className="title">Reset Password</h1>
      </div>
      <div>
        <p>
          We're really sorry, but you currently cannot reset your password on
          this domain. If you still forgot the password, try contacting the
        </p>
        <p>
          If you can try harder, <Link to="/auth">Login Here</Link>
        </p>
        <p>
          Or signup with a new account <Link to="/auth/signup">Here</Link>
        </p>
      </div>
    </>
  );
};

export default Forgot;
