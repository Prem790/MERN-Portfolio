import React from "react";
import { Form, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading, SetContact } from "../../redux/rootSlice";
import axios from "axios";

const API = "https://mern-portfolio-server-2ft6.onrender.com/api/portfolio";

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
        onFinish={onFinish}
        layout="vertical"
        initialValues={portfolioData.contact}
      >
       
        <Form.Item name="name" label="Name">
          <input placeholder="Name" />
        </Form.Item>
        <Form.Item name="email" label="Email">
            <input placeholder="Email" />
        </Form.Item>
        <Form.Item name="mobile" label="Phone">
            <input placeholder="Phone" />
        </Form.Item>
        <Form.Item name="address" label="Address">
        <input placeholder="Address" />
        </Form.Item>
        <Form.Item name="gender" label="Gender">
        <input placeholder="Gender" />
        </Form.Item>
        

       
       



        <div className="flex justify-end w-full" label="Welcome Text">
          <button className="px-10 py-2 bg-primary text-white" type="submit">SAVE</button>
        </div>
      </Form>
    </div>
  );
}

export default AdminContact;
