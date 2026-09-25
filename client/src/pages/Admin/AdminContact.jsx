import React from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading, SetContact } from "../../redux/rootSlice";
import axios, { API_URL } from "../../api";

const API = API_URL;

function AdminContact() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(`${API}/update-contact`, {
        ...values,
        _id: portfolioData.contact._id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        dispatch(SetContact(response.data.data));
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
        key={JSON.stringify(portfolioData.contact)}
        onFinish={onFinish}
        layout="vertical"
        initialValues={portfolioData.contact}
      >
       
        <Form.Item name="name" label="Name" rules={[{ required: true, message: "Required" }]}>
          <Input placeholder="Full name" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Required" },
            { type: "email", message: "Enter a valid email" },
          ]}
        >
          <Input placeholder="you@example.com" />
        </Form.Item>
        <Form.Item name="mobile" label="Phone" rules={[{ required: true, message: "Required" }]}>
          <Input placeholder="+91 ..." />
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

export default AdminContact;
