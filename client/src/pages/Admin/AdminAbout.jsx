import React from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading, SetAbout } from "../../redux/rootSlice";
import axios, { API_URL } from "../../api";

const API = API_URL;

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
        key={JSON.stringify(portfolioData.about)}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          ...portfolioData.about,
          skills: portfolioData.about.skills.join("  ,  ")
        }}
      >
        <Form.Item name="lottieURL" label="Lottie Animation URL" rules={[{ required: true, message: "Required" }]}>
          <Input placeholder="https://lottie.host/..." />
        </Form.Item>

        <Form.Item name="description1" label="Description (paragraph 1)" rules={[{ required: true, message: "Required" }]}>
          <Input.TextArea rows={3} placeholder="First paragraph" />
        </Form.Item>
        <Form.Item name="description2" label="Description (paragraph 2)" rules={[{ required: true, message: "Required" }]}>
          <Input.TextArea rows={3} placeholder="Second paragraph" />
        </Form.Item>
        <Form.Item
          name="skills"
          label="Skills"
          extra="Separate each skill with a comma"
        >
          <Input placeholder="React, Node.js, PostgreSQL, ..." />
        </Form.Item>
        <div className="flex justify-end w-full">
          <Button type="primary" htmlType="submit" size="large">
            Save changes
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AdminAbout;
