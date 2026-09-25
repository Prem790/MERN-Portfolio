import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { useEffect, lazy, Suspense } from "react";
import Loader from "./components/Loader";
import axios, { API_URL } from "./api";
import { useDispatch, useSelector } from "react-redux";
import {
  HideLoading,
  SetPortfolioData,
  SetReloadData,
} from "./redux/rootSlice";

// Code-split the admin area so its heavy dependencies (antd) are NOT
// downloaded by regular visitors to the public portfolio.
const Admin = lazy(() => import("./pages/Admin"));
const Login = lazy(() => import("./pages/Admin/Login"));

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
        localStorage.setItem("sessionExpired", "1");
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

  // Initial fetch shows the Home skeleton (no global spinner);
  // ShowLoading/HideLoading is reserved for admin mutations.
  const getPortfolioData = async () => {
    try {
      const response = await axios.get(`${API_URL}/get-portfolio-data`);
      dispatch(SetPortfolioData(response.data));
      dispatch(SetReloadData(false));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadData]);

  return (
    <BrowserRouter>
      {loading ? <Loader /> : null}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-login" element={<Login />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
