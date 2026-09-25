import { Form, Modal, Input, Button, Popconfirm, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HideLoading,
  ShowLoading,
  AddProject,
  UpdateProject,
  DeleteProject,
} from "../../redux/rootSlice";
import axios, { API_URL } from "../../api";

const API = API_URL;

function AdminProjects() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const { projects } = portfolioData;
  const [showAddEditModal, setShowAddEditModal] = React.useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
  const [type , setType]=React.useState("add");
  const [form] = Form.useForm();
  const watchedImage = Form.useWatch("image", form);

  const onFinish = async (values) => {
    try {
      values.technologies = (values.technologies || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      dispatch(ShowLoading());
      let response;
      if (selectedItemForEdit) {
        response = await axios.post(`${API}/update-project`, {
          ...values,
          _id: selectedItemForEdit._id,
        });
      } else {
        response = await axios.post(`${API}/add-project`, values);
      }

      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        // Update the store locally — no full re-fetch needed.
        if (selectedItemForEdit) {
          dispatch(UpdateProject(response.data.data));
        } else {
          dispatch(AddProject(response.data.data));
        }
        setShowAddEditModal(false);
        setSelectedItemForEdit(null);
        form.resetFields();
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
      const response = await axios.post(`${API}/delete-project`, {
        _id: item._id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        dispatch(DeleteProject(item._id));
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
        <p className="text-gray-400 text-sm">{projects.length} project(s)</p>
        <Button
          type="primary"
          onClick={() => {
            setShowAddEditModal(true);
            setSelectedItemForEdit(null);
            setType("add");
          }}
        >
          + Add Project
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-5 lg:grid-cols-2 sm:grid-cols-1">
        {projects.map((project) => (
          <div
            key={project._id}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-5 flex flex-col gap-3"
          >
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="h-32 w-full object-cover rounded-lg border border-white/10"
              />
            ) : (
              <div className="h-32 w-full rounded-lg bg-gradient-to-br from-secondary/20 to-tertiary/10 grid place-items-center text-gray-500">
                No image
              </div>
            )}
            <h3 className="text-secondary font-semibold">{project.title}</h3>
            <p className="text-gray-400 text-sm line-clamp-3">
              {project.description}
            </p>
            <div className="flex justify-end gap-2 mt-auto pt-2">
              <Popconfirm
                title="Delete this project?"
                description="This can't be undone."
                okText="Delete"
                okButtonProps={{ danger: true }}
                cancelText="Cancel"
                onConfirm={() => onDelete(project)}
              >
                <Button danger size="small">
                  Delete
                </Button>
              </Popconfirm>
              <Button
                size="small"
                onClick={() => {
                  setSelectedItemForEdit(project);
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
        title={selectedItemForEdit ? "Edit Project" : "Add Project"}
        footer={null}
        destroyOnClose
        onCancel={() => {setShowAddEditModal(false)
        setSelectedItemForEdit(null);}}
      >
        <Form
        key={selectedItemForEdit?._id || "new-project"}
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
            ...selectedItemForEdit,
            technologies : selectedItemForEdit?.technologies?.join(" , "),


        }}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input placeholder="Project title" />
          </Form.Item>
          <Form.Item name="image" label="Image URL (optional)">
            <Input placeholder="/projects/... or https://..." />
          </Form.Item>
          {watchedImage && watchedImage.trim() && (
            <div className="mb-4 -mt-2">
              <img
                src={watchedImage}
                alt="preview"
                className="h-28 w-full object-cover rounded-lg border border-white/10"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
                onLoad={(e) => {
                  e.currentTarget.style.display = "block";
                }}
              />
              <p className="text-xs text-gray-500 mt-1">Image preview</p>
            </div>
          )}
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Description is required" }]}
          >
            <Input.TextArea rows={4} placeholder="What it does, tech, impact" />
          </Form.Item>
          <Form.Item name="link" label="Live / Demo URL (optional)">
            <Input placeholder="https://..." />
          </Form.Item>
          <Form.Item name="githubLink" label="GitHub URL (optional)">
            <Input placeholder="https://github.com/..." />
          </Form.Item>
          <Form.Item
            name="technologies"
            label="Technologies"
            extra="Separate each with a comma"
          >
            <Input placeholder="React, Node.js, ..." />
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

export default AdminProjects;
