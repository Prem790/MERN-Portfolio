import { Form, Modal, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, SetReloadData, ShowLoading } from "../../redux/rootSlice";
import axios from "axios";

function AdminProjects() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const { projects } = portfolioData;
  const [showAddEditModal, setShowAddEditModal] = React.useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
  const [type , setType]=React.useState("add");
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
        const tempTechnologies=values?.technologies?.split(",") || [];
        values.technologies=tempTechnologies;

      dispatch(ShowLoading());
      let response;
      if (selectedItemForEdit) {
        response = await axios.post("/api/portfolio/update-project",{
            ...values,
            _id: selectedItemForEdit._id,

        });   
    }
    else{
        response = await axios.post(
            "/api/portfolio/add-project",
            values
          );
    }
      
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        setShowAddEditModal(false);
        setSelectedItemForEdit(null);
        dispatch(HideLoading());
        dispatch(SetReloadData(true));
        form.resetFields();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const onDelete = async(item)=>{
    try {
        dispatch(ShowLoading());
        let response = await axios.post("/api/portfolio/delete-project",{
            _id: item._id,
            });
            dispatch(HideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                dispatch(HideLoading());
                dispatch(SetReloadData(true));
                } else {
                    message.error(response.data.message);
                    }
                    } catch (error) {
                        dispatch(HideLoading());
                        message.error(error.message);
                        }
                        }

  

  return (
    <div>
      <div className="flex justify-end">
        <button
          className="bg-primary px-5 py-2 text-white mb-5"
          onClick={() => {
            setShowAddEditModal(true);
            setSelectedItemForEdit(null);
          }}
        >
          Add Project
        </button>
      </div>
      <div className="grid grid-cols-3 gap-5 sm:grid-cols-1">
        {projects.map((project) => (
          <div className="shadow border p-6 border-gray-400 flex flex-col gap-5">
            <h1 className="text-tertiary text-xl font-bold">
              {project.title}
            </h1>
            <hr />
           <img src={project.image} alt="" className="h-60 w-80"/>
            <h1 className="font-semibold mt-2">Title : {project.title}</h1>
            <h1 className="mt-2">Description : {project.description}</h1>
            <div className="flex justify-end gap-5 mt-5">
              <button className="bg-red-500 text-white px-5 py-2"
              onClick={()=>{
                onDelete(project);
              }}
              >
                Delete
              </button>
              <button className="bg-tertiary text-white px-5 py-2"
              onClick={()=>{
                setSelectedItemForEdit(project);
                setShowAddEditModal(true);
                setType("edit");
              }}
              
              >Edit</button>
            </div>
          </div>
        ))}
      </div>

     {(type==="add" || selectedItemForEdit) && (
         <Modal
        open={showAddEditModal}
        title={selectedItemForEdit ? "Edit Projects" : "Add Projects"}
        footer={null}
        onCancel={() => {setShowAddEditModal(false)
        setSelectedItemForEdit(null);}}
      >
        <Form 
        form={form}
        layout="vertical" 
        onFinish={onFinish}
        initialValues={{
            ...selectedItemForEdit,
            technologies : selectedItemForEdit?.technologies?.join(" , "),
            

        }}
        >
          <Form.Item name="title" label="Title">
            <input placeholder="Title" />
          </Form.Item>
          <Form.Item name="image" label="Image URL">
            <input placeholder="Image" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <textarea placeholder="Description" />
          </Form.Item>
          <Form.Item name="link" label="Link">
            <input placeholder="Link" />
          </Form.Item>
          <Form.Item name="technologies" label="Technologies">
            <input placeholder="Technologies" />
          </Form.Item>



          <div className="flex justify-end">
            <button
              className="border-primary text-primary px-5 py-2"
              onClick={() => {
                setShowAddEditModal(false);
              }}
            >
              Cancel
            </button>
            <button className="bg-primary text-white px-5 py-2">
              {selectedItemForEdit ? "Update" : "Add"}
            </button>
          </div>
        </Form>
      </Modal>
     )}
    </div>
  );
}

export default AdminProjects;
