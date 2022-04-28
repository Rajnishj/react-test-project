import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateUser } from "../redux/UserAction";

const EditUser = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [birthday, setBirthday] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.users);
  const filterData = userInfo.find((contact) => contact.id === parseInt(id));
  useEffect(() => {
    if (filterData) {
      setName(filterData.name);
      setEmail(filterData.email);
      setNumber(filterData.number);
      setBirthday(filterData.birthday);
    }
  }, [filterData]);
  const checkEmail = userInfo.find(
    (contact) => contact.id !== parseInt(id) && contact.email === email
  );
  const checkNumber = userInfo.find(
    (contact) =>
      contact.id !== parseInt(id) && contact.number === parseInt(number)
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
      id: parseInt(id),
      name,
      email,
      number: parseInt(number),
      birthday,
    };

    dispatch(updateUser(data));
    toast.success("User is updated");
    navigate("/");
  };
  return (
    <div className="container">
      <div className="row">
        <h1 className="display-3 text-center ">Edit Users</h1>
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
                placeholder="Date of Birth"
                className="form-control"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>
            <div className="form-group ">
              <input
                type="submit"
                value="Update User"
                className="btn  btn-dark"
              />
              <Link to="/" className="btn btn-danger ms-3">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
