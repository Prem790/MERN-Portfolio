import { Form, Modal, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, SetReloadData, ShowLoading } from "../../redux/rootSlice";
import axios from "axios";

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
        response = await axios.post("/api/portfolio/update-experience",{
            ...values,
            _id: selectedItemForEdit._id,

        });   
    }
    else{
        response = await axios.post(
            "/api/portfolio/add-experience",
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
        let response = await axios.post("/api/portfolio/delete-experience",{
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
          Add Experience
        </button>
      </div>
      <div className="grid grid-cols-4 gap-5 sm:grid-cols-1">
        {expreiences.map((expreience) => (
          <div className="shadow border p-6 border-gray-400 flex flex-col">
            <h1 className="text-tertiary text-xl font-bold">
              {expreience.period}
            </h1>
            <hr />
            <h1 className="font-semibold mt-2">
              Company : {expreience.company}
            </h1>
            <h1 className="font-semibold mt-2">Role : {expreience.title}</h1>
            <h1 className="mt-2">Description : {expreience.description}</h1>
            <div className="flex justify-end gap-5 mt-5">
              <button className="bg-red-500 text-white px-5 py-2"
              onClick={()=>{
                onDelete(expreience);
              }}
              >
                Delete
              </button>
              <button className="bg-tertiary text-white px-5 py-2"
              onClick={()=>{
                setSelectedItemForEdit(expreience);
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
        title={selectedItemForEdit ? "Edit Experiences" : "Add Experiences"}
        footer={null}
        onCancel={() => {setShowAddEditModal(false)
        setSelectedItemForEdit(null);}}
      >
        <Form layout="vertical" 
        onFinish={onFinish}
        initialValues={selectedItemForEdit}
        >
          <Form.Item name="period" label="Period">
            <input placeholder="Period" />
          </Form.Item>
          <Form.Item name="company" label="Company">
            <input placeholder="Company" />
          </Form.Item>
          <Form.Item name="title" label="Title">
            <input placeholder="Title" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <input placeholder="Description" />
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

export default AdminExperiences;
