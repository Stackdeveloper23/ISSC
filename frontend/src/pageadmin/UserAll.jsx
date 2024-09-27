import { useEffect, useState } from "react";
import Siderbar from "./Siderbar";
import Config from "../Config";
import { Link } from "react-router-dom";

const UserAll = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserAllWithRoles();
  }, []);

  const getUserAllWithRoles = async () => {
    try {
      const response = await Config.getUserAllWithRoles();
      console.log(response); 
         setUsers(response || []); 
     } catch (error) {
      console.error("Error al obtener usuarios:", error);
      setUsers([]); // En caso de error, establece users como un array vacío
    } finally {
      setLoading(false);
    }
  };

  const deleteUserById = async (id) => {
    const isDelete = window.confirm("Delete User?");
    if (isDelete) {
      await Config.getUserDeleteById(id);
      getUserAllWithRoles();
    }
  };

  return (
    <div style={{ overflow: 'hidden' }}>
      <div className="row">
        <div className="col-sm-1">
        <Siderbar />
        </div>
        <div className="col-sm-11 mt-4 mb-3">
          <div className="me-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <Link to={"/admin/user/create"} className="btn btn-primary">
                  <span className="material-symbols-outlined">add_circle</span>
                  New
                </Link>
                <Link
                  to={"/admin/user/password"}
                  className="btn btn-secondary "
                >
                  <span className="material-symbols-outlined">key</span>
                  Requests
                </Link>
              </div>

              <div className="table-responsive mt-3">
                <table className="table text-center align-middle">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Rol</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="5">Loading...</td>
                      </tr>
                    ) : users.length > 0 ? (
                      users.map((user) => (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.role_name || "No role assigned"}</td>
                          <td>
                            <div className="d-flex justify-content-center">
                              {user.role_name !== "admin" ? (
                                <>
                                  <Link
                                    to={`/admin/user/edit/${user.id}`}
                                    className="btn btn-primary d-flex w-30 me-1"
                                  >
                                    <span className="material-symbols-outlined">
                                      edit
                                    </span>
                                  </Link>
                                  <button
                                    className="btn btn-danger d-flex w-30"
                                    onClick={() => deleteUserById(user.id)}
                                  >
                                    <span className="material-symbols-outlined">
                                      delete
                                    </span>
                                  </button>
                                </>
                              ) : (
                                <span>Admin</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5">No users found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default UserAll;
