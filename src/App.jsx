import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "./components/userProvider";
import UserForm from "./components/UserForm";

function App() {
  const user = useContext(UserContext);

  const navigate = useNavigate();

  const handleEdit = (username, firstname, lastname, age, materialstatus, is_employed, is_founder) => {
    // Navigate to the form with updated query parameters
    navigate(`/form?username=${username}&firstname=${firstname}&lastname=${lastname}&age=${age}&materialstatus=${materialstatus}&is_employed=${is_employed}&is_founder=${is_founder}`);
  };

  const handleDeleteUser = (userObj) =>{
    user.deleteUser(userObj)

  }

  return (
    <>
      <div className="bg-slate-50 w-full py-5">
        <h1 className="text-3xl font-bold text-center">User List</h1>

        {/* Add User Button */}
        <div className="flex justify-end p-4">
          <Link to="/form">
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
              Add User <span className="font-extrabold">+</span>
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
          {user?.users?.map((user, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 relative">
              {/* Button container positioned at the top right */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  className="bg-neutral-50 border border-black w-8 h-8 rounded-full transition duration-200 flex items-center justify-center shadow-sm"
                  onClick={()=>{
                    handleDeleteUser(user)
                  }}
                >
                  🗑️ {/* Trash icon */}
                </button>

                <button
                  className="bg-neutral-50 border border-black w-8 h-8 rounded-full transition duration-200 flex items-center justify-center shadow-sm"
                  onClick={() => {
                    handleEdit(user.username, user.first_name, user.last_name, user.age, user.marital_status, user.is_employed, user.is_founder);
                  }}>
                  ✏️ {/* Pencil icon */}
                </button>
              </div>

              <h2 className="text-xl font-semibold mb-2">
                {user.first_name} {user.last_name}
              </h2>
              <p className="mb-2">
                <strong>Username:</strong> {user.username}
              </p>
              <p className="mb-2">
                <strong>Age:</strong> {user.age}
              </p>
              <p className="mb-2">
                <strong>Marital Status:</strong> {user.marital_status}
              </p>
              <p className="mb-2">
                <strong>Employed:</strong> {user.is_employed ? "Yes" : "No"}
              </p>
              <p className="mb-2">
                <strong>Founder:</strong> {user.is_founder ? "Yes" : "No"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
