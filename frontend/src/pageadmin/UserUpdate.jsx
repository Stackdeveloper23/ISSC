import { useEffect, useState } from "react";
import Siderbar from "./Siderbar";
import Config from "../Config";
import { Link, useNavigate, useParams } from "react-router-dom";

const UserUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);

  useEffect(() => {
    const getUserById = async () => {
      try {
        const { data } = await Config.getUserById(id);
        console.log("datos usuario: ", data);
        setName(data.name);
        setEmail(data.email);
        if (data.roles && Array.isArray(data.roles)) {
          setSelectedRoles(data.roles.map((role) => role.id.toString()));
          console.log("roles", data.roles.map((role) => role.id.toString()));
        } else {
          setSelectedRoles([]);
        }
      } catch (error) {
        console.error("Error al obtener usuario:", error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await Config.getUserRol();
        console.log("rol de usuario:", response)
        setRoles(response.data);
      } catch (error) {
        console.error("Error al obtener roles:", error);
      }
    };

    getUserById();
    fetchRoles(); 
  }, [id]);

  const handleRoleChange = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedRoles(value);
  };

  const submitUpdate = async (ev) => {
    ev.preventDefault();
    try {
      const currentUser = { name, email, roles: selectedRoles };
      await Config.getUserUpdate(currentUser, id);
      console.log("Usuario actualizado correctamente");
      navigate("/admin/user");
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-sm-1">
        <Siderbar />
        </div>
        <div className="col-sm-11 mt-3 mb-3">
          <div className="me-4">
          <div className="card">
            <div className="card-header">
              <div className="container d-flex">
                <div className="col-sm-1">
                  <Link
                    to={-1}
                    className="btn btn-secondary d-flex align-items-center"
                  >
                    <span className="material-symbols-outlined">
                      arrow_back
                    </span>
                    Back
                  </Link>
                </div>
                <div className="col-sm-11 d-flex justify-content-center align-items-center">
                  Edit User id: {id}
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="container">
                <form onSubmit={submitUpdate}>
                  <div className="col-sm-12 mt-3">
                    <label htmlFor="name">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-12 mt-3">
                    <label htmlFor="name">Email:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="col-sm-12 mt-3">
                    <label htmlFor="roles">Rol:</label>
                    <select
                      id="roles"
                      className="form-select"
                      value={selectedRoles}
                      onChange={handleRoleChange}
                    >
                      {roles.map((role) => (
                        <option key={role.id} value={role.id.toString()}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="btn-group mt-3">
                    <button type="submit" className="btn btn-primary d-flex">
                      <span className="material-symbols-outlined">upgrade</span>
                      Update User
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default UserUpdate;
