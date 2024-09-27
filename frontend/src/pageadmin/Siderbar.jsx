//import { useState } from "react";
import { NavLink } from "react-router-dom";

const Siderbar = () => {
  return (
    <div
      className="d-flex flex-column flex-shrink-0"
    >
      <a
        href="/admin"
        className="d-flex justify-content-center p-3 link-body-emphasis text-decoration-none"
        title="Icon-only"
        data-bs-toggle="tooltip"
        data-bs-placement="right"
      >
       <span className="visually-hidden">Icon-only</span>
      </a>

      <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
        <li className="nav-item">
          <NavLink
            to={`/admin/sow`}
            className={({ isActive }) =>
              isActive ? "btn btn-secondary w-100" : "btn btn-outline-secondary w-100"
            }
            >
            <span className="material-symbols-outlined">table_view</span>Sow
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to={`/admin/user`}
            className={({ isActive }) =>
              isActive ? "btn btn-secondary w-100" : "btn btn-outline-secondary w-100"
            }
          >
            <span className="material-symbols-outlined">account_circle</span>
            User
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Siderbar;
