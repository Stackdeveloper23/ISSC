import axios from "axios";

const base_api_url = "http://localhost:8000/api/v1";

const getToken =()=>{
  const tokenString = sessionStorage.getItem('token')
  const token = JSON.parse(tokenString)
  return token
};


export default{

    //auth
    getLogin: (data)=>axios.post(`${base_api_url}/auth/login`,data),

    getLogout: (data) => {
      const token = getToken();
      return axios.post(`${base_api_url}/auth/logout`,data,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })},

   getUserAll: async () => {
    const token = getToken(); // Obtener el token
    try {
      const response = await axios.get(`${base_api_url}/admin/user`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data; 
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error;
    }
  },

  getUserAllWithRoles: async () => {
    const token = getToken();
    try{
      const response = await axios.get(`${base_api_url}/admin/user-roles`,{
        headers: {
          'Authorization':`Bearer ${token}`
        }
      });
      return response.data
    }  catch (error) {
      console.error('Error al obtener usuarios:', error);
  }
},

  getUserRol: async () =>{
    const token = getToken();
    return axios.get(`${base_api_url}/admin/roles`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    })},
      

  getUserById: (id) => {
    const token = getToken(); // Obtener el token
    return axios.get(`${base_api_url}/admin/user/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })},

    getUserCreate:(data)=>{
      const token = getToken();
      return axios.post(`${base_api_url}/admin/user/create`,data,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
     })},

      getUserUpdate: (data, id) => {
        const token = getToken(); // Obtener el token
        return axios.put(`${base_api_url}/admin/user/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })},

        getUserDeleteById: (id) => {
          const token = getToken(); // Obtener el token
          return axios.delete(`${base_api_url}/admin/user/${id}`, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          })},


       getSowAll: async (page=1) => {
        const token = getToken(); // Obtener el token
        try {
          const response = await axios.get(`${base_api_url}/admin/sow?page=${page}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          return response.data;
        } catch (error) {
          console.error('Error al obtener sows:', error);
        }
      },

      getSowCreate:(data)=>{
        const token = getToken();
        return axios.post(`${base_api_url}/admin/sows/create`,data,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
       })},

    getSowById: (id) => {
    const token = getToken(); // Obtener el token
    return axios.get(`${base_api_url}/admin/sow/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })},

       getSowUpdate: (data, id) => {
        const token = getToken(); 
        return axios.put(`${base_api_url}/admin/sow/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })},

        getSowDeleteById: (id) => {
          const token = getToken(); // Obtener el token
          return axios.delete(`${base_api_url}/admin/sow/${id}`, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          })},


        getSearchBar: (query) => {
          const token = getToken();
        return axios.get(`${base_api_url}/search/sows?query=${query}`,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })},

        getEnum: (field) => {
          const token = getToken();
          return axios.get(`${base_api_url}/enums/${field}`,{
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })},
      
    
}


 

  