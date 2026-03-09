import axios from "axios";

const AUTH_API = "http://localhost:8081/api/auth";
const DONATION_API = "http://localhost:8081/api/donations";
const REQUEST_API_URL = "http://localhost:8081/api/requests";

// --- AUTH ---
export const loginApi = async (email, password) => {
  return axios.post(`${AUTH_API}/login`, null, {
    params: { email, password },
  });
};

export const signupApi = async (formData) => {
  return axios.post(`${AUTH_API}/signup`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};





// --- PROFILE ---
export const updateProfileApi = async (email, formData) => {
  return axios.put(`${AUTH_API}/update/${email}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteProfileApi = async (email) => {
  return axios.delete(`${AUTH_API}/delete/${email}`);
};




const DONOR_API = "http://localhost:8081/api/donors";

// --- DONATIONS ---
export const donorRegisterApi = async (formData) => {
  return await axios.post(`${DONOR_API}/register`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getAllDonors = () => {
  return axios.get(`${DONOR_API}/all`);
};


export const filterDonations = (filters) => {
  return axios.get(`${DONATION_API}/filter`, { params: filters });
};



export const getDonationsByEmail = async (email) => {
  return await axios.get(`${DONATION_API}/${email}`);
};


export const getAllDonations = () => {
  return axios.get(`${DONATION_API}/all`);
};







//----requests----

export const requestApi = async (email, requestData) => {
  return await axios.post(`${REQUEST_API_URL}/${email}`, requestData, {
    headers: { "Content-Type": "application/json" }
  });
};

export const getRequestsByEmail = async (email) => {
  return await axios.get(`${REQUEST_API_URL}/${email}`);
};


export const getAllRequests = () => {
  return axios.get(`${REQUEST_API_URL}/all`);
};