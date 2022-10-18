import React, { useState } from "react";
import { MDBValidation, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUserStart } from "../redux/actions";
import { ToastContainer, toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

const AddEditUser = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { name, email, phone, address } = formValue;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && phone && address) {
      dispatch(createUserStart(formValue));
      toast.success("User Added Successfully");
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  return (
    <MDBValidation
      className="row g-3"
      style={{ marginTop: "100px" }}
      onSubmit={handleSubmit}
    >
      <p className="fs-2 fw-bold">Add User Detail</p>
      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
      >
        <MDBInput
          value={name}
          name="name"
          type="text"
          onChange={onInputChange}
          required
          label="Name"
          validation="Please provide a name"
          invalid
        />
        <br />
        <MDBInput
          value={email}
          name="email"
          type="email"
          onChange={onInputChange}
          required
          label="Email"
          validation="Please provide a email"
          invalid
        />
        <br />
        <MDBInput
          value={phone}
          name="phone"
          type={"number"}
          onChange={onInputChange}
          required
          label="Phone"
          validation="Please provide a Phone no."
          invalid
        />
        <br />
        <MDBInput
          value={address}
          name="address"
          type={"text"}
          onChange={onInputChange}
          required
          label="Address"
          validation="Please provide an Address"
          invalid
        />
      </div>
      <div className="col-12">
        <MDBBtn style={{ marginRight: "10px" }} type="submit">
          Add
        </MDBBtn>
        <MDBBtn onClick={() => navigate("/")} color="danger">
          Go Back
        </MDBBtn>
      </div>
    </MDBValidation>
  );
};

export default AddEditUser;
