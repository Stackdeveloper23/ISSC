import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Siderbar = () => {
     const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (button) => {
    setActiveButton(prevActiveButton => (prevActiveButton === button ? null : button));
  };

    return (
        <div className="col-sm-1 pt-3 pb-3">
            <div className="list-group">
              
                <NavLink
                    to={`/admin/sow`}
                    className={({ isActive }) =>
                        isActive
                            ? "btn btn-secondary"
                            : "btn btn-outline-secondary"
                    }
                >
                    <span className="material-symbols-outlined">table_view</span>Sow
                </NavLink>
                <NavLink
                    to={`/admin/user`}
                    className={({ isActive }) =>
                        isActive
                            ? "btn btn-secondary"
                            : "btn btn-outline-secondary"
                    }
                >
                    <span className="material-symbols-outlined">table_view</span>
                    User
                </NavLink>
            </div>
        </div>
    );
};

export default Siderbar;