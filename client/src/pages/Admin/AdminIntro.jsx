import React from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading, SetIntro } from "../../redux/rootSlice";
import axios, { API_URL } from "../../api";

const API = API_URL;

function AdminIntro() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(`${API}/update-intro`, {
        ...values,
        _id: portfolioData.intro._id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        dispatch(SetIntro(response.data.data));
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
        key={JSON.stringify(portfolioData.intro)}
        onFinish={onFinish}
        layout="vertical"
        initialValues={portfolioData.intro}
      >
        <Form.Item name="welcomeText" label="Welcome Text" rules={[{ required: true, message: "Required" }]}>
          <Input placeholder="Hi, I'm" />
        </Form.Item>
        <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: "Required" }]}>
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: "Required" }]}>
          <Input placeholder="Last Name" />
        </Form.Item>
        <Form.Item name="caption" label="Caption" rules={[{ required: true, message: "Required" }]}>
          <Input placeholder="e.g. Full-Stack & Backend Engineer" />
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[{ required: true, message: "Required" }]}>
          <Input.TextArea rows={4} placeholder="Short intro paragraph" />
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

export default AdminIntro;
