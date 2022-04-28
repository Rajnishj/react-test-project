import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Model from "./Model";

const Home = () => {
  const newData = useSelector((state) => state.user.users);
  const [lists, setLists] = useState(newData);

  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
    listTitle: "",
  });
  const idListRef = useRef();
  const handleDialog = (message, isLoading, listTitle) => {
    setDialog({
      message,
      isLoading,
      listTitle,
    });
  };

  const handleDelete = (id) => {
    const index = lists.findIndex((p) => p.id === id);
    handleDialog("Are you sure you want to delete?", true, lists[index].name);
    idListRef.current = id;
  };

  const areUSureDelete = (choose) => {
    if (choose) {
      setLists(lists.filter((p) => p.id !== idListRef.current));
      toast.success("Item deleted successfully");
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 mt-4">
          <Link to="/add" className="btn btn-outline-dark">
            Add User
          </Link>
        </div>
        <div className="col-md-10 text-center mx-auto">
          <table className="table table-hover">
            <thead className="text-white bg-dark text-center">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Number</th>
                <th scope="col">Date of Birth</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {lists.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.number}</td>
                  <td>{contact.birthday}</td>
                  <td>
                    <Link
                      to={`/edit/${contact.id}`}
                      className="btn btn-small btn-primary me-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(contact.id)}
                      className="btn btn-danger btn-small"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {dialog.isLoading && (
            <Model
              listTitle={dialog.listTitle}
              onDialog={areUSureDelete}
              message={dialog.message}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
