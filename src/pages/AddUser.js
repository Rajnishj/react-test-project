import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { addUsers } from "../redux/UserAction";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [birthday, setBirthday] = useState("");
  const user = useSelector((state) => state.user.users);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const checkEmail = user.find((contact) => contact.email === email);
  const checkNumber = user.find(
    (contact) => contact.number === parseInt(number)
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !number || !birthday) {
      const notify = () => toast.warning("Please Enter valid data!");
      notify();
      return;
    }
    if (checkEmail) {
      const notify = () => toast.error("This email already exist!");
      notify();
      return;
    }
    if (checkNumber) {
      const notify = () => toast.error("This number already exist!");
      notify();
      return;
    }
    const data = {
      id: Date.now(),
      name,
      email,
      number: parseInt(number),
      birthday,
    };

    dispatch(addUsers(data));
    toast.success("User is added");
    navigate("/");
  };

  return (
    <div className="container">
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
      />
      <div className="row">
        <h1 className="display-3 text-center ">Add users</h1>
        <div className="col-md-6 shadow mx-auto p-5">
          <form onSubmit={handleSubmit}>
            <div className="form-group pb-3">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group pb-3">
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group pb-3">
              <input
                type="number"
                placeholder="Phone Number"
                className="form-control"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className="form-group pb-3">
              <input
                type="date"
                placeholder="Date of birth"
                className="form-control"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>
            <div className="form-group ">
              <input
                type="submit"
                value="Add user"
                className="btn w-100 btn-dark"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
