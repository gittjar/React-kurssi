import React from "react";

// own module, but not in use now!

const ErrorMessage = ({ errormessage }) => {
    if (errormessage === null) {
      return null
    }
  
    
    return (
      <div className="notification-error">
        {errormessage}
      </div>
    )
  }

  export default ErrorMessage;