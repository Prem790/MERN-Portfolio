import { Form, Modal, Input, Button, Popconfirm, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HideLoading,
  ShowLoading,
  AddExperience,
  UpdateExperience,
  DeleteExperience,
} from "../../redux/rootSlice";
import axios, { API_URL } from "../../api";

const API = API_URL;

function AdminExperiences() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const { expreiences } = portfolioData;
  const [showAddEditModal, setShowAddEditModal] = React.useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
  const [type , setType]=React.useState("add");

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response;
      if (selectedItemForEdit) {
        response = await axios.post(`${API}/update-experience`, {
          ...values,
          _id: selectedItemForEdit._id,
        });
      } else {
        response = await axios.post(`${API}/add-experience`, values);
      }

      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        if (selectedItemForEdit) {
          dispatch(UpdateExperience(response.data.data));
        } else {
          dispatch(AddExperience(response.data.data));
        }
        setShowAddEditModal(false);
        setSelectedItemForEdit(null);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error?.response?.data?.message || error.message);
    }
  };

  const onDelete = async (item) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(`${API}/delete-experience`, {
        _id: item._id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        dispatch(DeleteExperience(item._id));
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
      <div className="flex justify-between items-center mb-5">
        <p className="text-gray-400 text-sm">{expreiences.length} experience(s)</p>
        <Button
          type="primary"
          onClick={() => {
            setShowAddEditModal(true);
            setSelectedItemForEdit(null);
            setType("add");
          }}
        >
          + Add Experience
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-5 lg:grid-cols-2 sm:grid-cols-1">
        {expreiences.map((expreience) => (
          <div
            key={expreience._id}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-5 flex flex-col gap-2"
          >
            <span className="text-secondary text-sm font-medium">
              {expreience.period}
            </span>
            <h3 className="font-semibold">{expreience.title}</h3>
            <p className="text-tertiary text-sm">{expreience.company}</p>
            <p className="text-gray-400 text-sm line-clamp-3">
              {expreience.description}
            </p>
            <div className="flex justify-end gap-2 mt-auto pt-2">
              <Popconfirm
                title="Delete this experience?"
                description="This can't be undone."
                okText="Delete"
                okButtonProps={{ danger: true }}
                cancelText="Cancel"
                onConfirm={() => onDelete(expreience)}
              >
                <Button danger size="small">
                  Delete
                </Button>
              </Popconfirm>
              <Button
                size="small"
                onClick={() => {
                  setSelectedItemForEdit(expreience);
                  setShowAddEditModal(true);
                  setType("edit");
                }}
              >
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>

     {(type==="add" || selectedItemForEdit) && (
         <Modal
        open={showAddEditModal}
        title={selectedItemForEdit ? "Edit Experience" : "Add Experience"}
        footer={null}
        destroyOnClose
        onCancel={() => {setShowAddEditModal(false)
        setSelectedItemForEdit(null);}}
      >
        <Form
        key={selectedItemForEdit?._id || "new-experience"}
        layout="vertical"
        onFinish={onFinish}
        initialValues={selectedItemForEdit}
        >
          <Form.Item
            name="period"
            label="Period"
            rules={[{ required: true, message: "Period is required" }]}
          >
            <Input placeholder="e.g. Sep 2025 – Present" />
          </Form.Item>
          <Form.Item
            name="company"
            label="Company"
            rules={[{ required: true, message: "Company is required" }]}
          >
            <Input placeholder="Company name" />
          </Form.Item>
          <Form.Item
            name="title"
            label="Title / Role"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input placeholder="e.g. Full-Stack Developer" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Description is required" }]}
          >
            <Input.TextArea rows={4} placeholder="What you did and the impact" />
          </Form.Item>
          <div className="flex justify-end gap-2">
            <Button
              onClick={() => {
                setShowAddEditModal(false);
                setSelectedItemForEdit(null);
              }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              {selectedItemForEdit ? "Update" : "Add"}
            </Button>
          </div>
        </Form>
      </Modal>
     )}
    </div>
  );
}

export default AdminExperiences;
