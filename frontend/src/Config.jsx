import axios from "axios";

const base_api_url = "http://localhost:8000/api/v1"; //http://localhost:8000/api/v1

const getToken = () => {
  const tokenString = sessionStorage.getItem("token");
  const token = JSON.parse(tokenString);
  return token;
};

export default {
  //auth
  getLogin: (data) => axios.post(`${base_api_url}/auth/login`, data),

  getLogout: (data) => {
    const token = getToken();
    return axios.post(`${base_api_url}/auth/logout`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  sendRequest: async (data) => {
    try {
      console.log("data", data);
      const response = await axios.post(
        `${base_api_url}/password/reset-request`,
        data
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data; // Lanza los datos del error para que puedan ser capturados en el componente
      } else {
        throw error;
      }
    }
  },

  resetRequests: async () => {
    const token = getToken();
    try {
      const response = await axios.get(`${base_api_url}/admin/reset-requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log("error al obtener las restauraciones de contraseña", error);
    }
  },

  resetRequestsApprove: async (id, email, password) => {
    const token = getToken();
    try {
      const response = await axios.post(
        `${base_api_url}/admin/reset-requests/approve/${id}`,
        { email, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("error al restaurar la  contraseña", error);
    }
  },

  resetRequestsCancel: async (data) => {
    const token = getToken();
    try {
      const response = await axios.post(
        `${base_api_url}/admin/reset-requests/cancel`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("error al cancelar usuarios", error);
    }
  },

  getUserAll: async () => {
    const token = getToken(); // Obtener el token
    try {
      const response = await axios.get(`${base_api_url}/admin/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      throw error;
    }
  },

  getSowCreateInfo: async (ticket_sow) => {
    const token = getToken();
    try {
      const response = await axios.get(
        `${base_api_url}/admin/sows/${ticket_sow}/creator`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("error al obtener informacion del creador", error);
      throw error;
    }
  },

  getUserAllWithRoles: async () => {
    const token = getToken();
    try {
      const response = await axios.get(`${base_api_url}/admin/user-roles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  },

  getUserRol: async () => {
    const token = getToken();
    return axios.get(`${base_api_url}/admin/roles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
/*
  getUserById: (id) => {
    const token = getToken(); 
    return axios.get(`${base_api_url}/admin/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      
    });
  },
*/
getUserById: (id) => {
  const token = getToken();

  console.log("ID:", id);
  console.log("Token:", token);

  return axios
    .get(`${base_api_url}/admin/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      // Imprime la respuesta completa
      console.log("Response:", response);
      return response;
    })
    .catch((error) => {
      // Imprime el error si la llamada falla
      console.error("Error fetching user:", error);
      throw error;
    });
},

  getUserCreate: (data) => {
    const token = getToken();
    return axios.post(`${base_api_url}/admin/user/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getUserUpdate: (data, id) => {
    const token = getToken(); // Obtener el token
    return axios.put(`${base_api_url}/admin/user/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getUserDeleteById: (id) => {
    const token = getToken(); // Obtener el token
    return axios.delete(`${base_api_url}/admin/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getSowAll: async (page = 1) => {
    const token = getToken(); // Obtener el token
    try {
      const response = await axios.get(
        `${base_api_url}/admin/sow?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener sows:", error);
    }
  },

  getSowCreate: (data) => {
    const token = getToken();
    return axios.post(`${base_api_url}/admin/sows/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getSowById: (id) => {
    const token = getToken(); // Obtener el token
    return axios.get(`${base_api_url}/admin/sow/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getSowUpdate: (data, id) => {
    const token = getToken();
    return axios.put(`${base_api_url}/admin/sow/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getSowDeleteById: (id) => {
    const token = getToken(); // Obtener el token
    return axios.delete(`${base_api_url}/admin/sow/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getSearchBar: (query) => {
    const token = getToken();
    return axios.get(`${base_api_url}/search/sows?query=${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getEnum: (field) => {
    const token = getToken();
    return axios.get(`${base_api_url}/enums/${field}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  //Reader

  getSowsAll: async (page = 1) => {
    const token = getToken(); // Obtener el token
    try {
      const response = await axios.get(
        `${base_api_url}/reader/sows?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener sows:", error);
    }
  },

  getSowsById: (id) => {
    const token = getToken(); // Obtener el token
    return axios.get(`${base_api_url}/reader/sow/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  //Writer

  getsSowsAll: async (page = 1) => {
    const token = getToken(); // Obtener el token
    try {
      const response = await axios.get(
        `${base_api_url}/writer/sow?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener sows:", error);
    }
  },

  getsSowsById: (id) => {
    const token = getToken(); // Obtener el token
    return axios.get(`${base_api_url}/writer/sow/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getSowsUpdate: (data, id) => {
    const token = getToken();
    return axios.put(`${base_api_url}/writer/sow/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getsSowCreate: (data) => {
    const token = getToken();
    return axios.post(`${base_api_url}/writer/sows/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  downloadSow: () => {
    const token = getToken();
    return axios.get(`${base_api_url}/export/xlsx`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    });
  },

  getSowStatus: () => {
    const token = getToken();
    return axios.get(`${base_api_url}/admin/sowStatus`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getUserCount: () => {
    const token = getToken();
    return axios.get(`${base_api_url}/admin/userCount`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getSowCount: () => {
    const token = getToken();
    return axios.get(`${base_api_url}/admin/totalSows`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getUserTotal: () => {
    const token = getToken();
    return axios.get(`${base_api_url}/admin/totalUsers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

};
