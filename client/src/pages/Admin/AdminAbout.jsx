import React from "react";
import { Form, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading, SetAbout } from "../../redux/rootSlice";
import axios from "axios";

const API = "https://mern-portfolio-server-2ft6.onrender.com/api/portfolio";

function AdminAbout() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const onFinish = async (values) => {
    try {
      values.skills = (values.skills || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      dispatch(ShowLoading());
      const response = await axios.post(`${API}/update-about`, {
        ...values,
        _id: portfolioData.about._id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        dispatch(SetAbout(response.data.data));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          ...portfolioData.about,
          skills: portfolioData.about.skills.join("  ,  ")
        }}
      >
        <Form.Item name="lottieURL" label="Lottie URL">
          <input placeholder="Lottie URL" />
        </Form.Item>
      
        <Form.Item name="description1" label="Description-1">
          <textarea placeholder="Description-1" />
        </Form.Item>
        <Form.Item name="description2" label="Description-2">
          <textarea placeholder="Description-2" />
        </Form.Item>
        <Form.Item name="skills" label="Skills">
          <input placeholder="Skills" />
        </Form.Item>
        <div className="flex justify-end w-full" label="Welcome Text">
          <button className="px-10 py-2 bg-primary text-white" type="submit">SAVE</button>
        </div>
      </Form>
    </div>
  );
}

export default AdminAbout;
