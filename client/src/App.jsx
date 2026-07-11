import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { useEffect } from "react";
import Loader from "./components/Loader";
import axios, { API_URL } from "./api";
import { useDispatch, useSelector } from "react-redux";
import {
  ShowLoading,
  HideLoading,
  SetPortfolioData,
  SetReloadData,
} from "./redux/rootSlice";
import Admin from "./pages/Admin";
import Login from "./pages/Admin/Login";

// Re-attach the saved JWT to every request after a page refresh.
const savedToken = localStorage.getItem("token");
if (savedToken) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
}

// If the token is missing/expired, drop it and send the user back to login.
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      if (window.location.pathname.startsWith("/admin")) {
        window.location.href = "/admin-login";
      }
    }
    return Promise.reject(error);
  }
);

function App() {
  const { loading, portfolioData, reloadData } = useSelector(
    (state) => state.root
  );
  const dispatch = useDispatch();

  // Fetch data when the component mounts.
  const getPortfolioData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get(`${API_URL}/get-portfolio-data`);
      dispatch(SetPortfolioData(response.data));
      dispatch(SetReloadData(false));
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    if (!portfolioData) {
      getPortfolioData();
    }
  }, [portfolioData]);

  useEffect(() => {
    if (reloadData) {
      getPortfolioData();
    }
  }, [reloadData]);

  return (
    <BrowserRouter>
      {loading ? <Loader /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
