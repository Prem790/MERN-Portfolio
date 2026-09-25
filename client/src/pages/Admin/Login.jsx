import React from "react";
import { ConfigProvider, theme, Input, Button, message } from "antd";
import axios, { API_URL } from "../../api";
import { HideLoading, ShowLoading } from "../../redux/rootSlice";
import { useDispatch } from "react-redux";

function Login() {
  const [user, setUser] = React.useState({ username: "", password: "" });
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (localStorage.getItem("sessionExpired")) {
      localStorage.removeItem("sessionExpired");
      message.warning("Your session expired. Please log in again.");
    }
  }, []);

  const login = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(`${API_URL}/admin-login`, user);
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
        window.location.href = "/admin";
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(
        error?.response?.data?.message || error.message || "Login failed"
      );
    }
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#66FCF1",
          borderRadius: 10,
          fontFamily: "Inter, system-ui, sans-serif",
        },
      }}
    >
      <div className="app-bg min-h-screen flex justify-center items-center px-4">
        <div className="glass-card w-full max-w-sm p-8 flex flex-col gap-5">
          <div className="flex items-center gap-1 text-2xl font-display font-bold justify-center">
            <span className="text-secondary">P</span>
            <i className="ri-code-s-slash-line text-white" />
            <span className="text-tertiary">J</span>
          </div>
          <div className="text-center">
            <h1 className="text-xl font-display font-semibold text-white">
              Admin Login
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Sign in to manage your portfolio
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-2">
            <Input
              size="large"
              placeholder="Username"
              prefix={<i className="ri-user-3-line text-gray-500" />}
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              onPressEnter={login}
            />
            <Input.Password
              size="large"
              placeholder="Password"
              prefix={<i className="ri-lock-2-line text-gray-500" />}
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              onPressEnter={login}
            />
            <Button type="primary" size="large" block onClick={login}>
              Login
            </Button>
          </div>

          <a
            href="/"
            className="text-center text-sm text-gray-400 hover:text-secondary transition-colors"
          >
            ← Back to site
          </a>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default Login;
