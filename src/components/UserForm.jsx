import { UserContext } from "./UserProvider";
import { useState, useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function UserForm() {
  const [searchParams] = useSearchParams();
  // console.log(searchParams);

  const userData = useContext(UserContext);
  // console.log(userData);

  const navigate = useNavigate();

  const usernameFromParams = searchParams.get("username");
  const firstNameFromParams = searchParams.get("firstname");
  const lastNameFromParams = searchParams.get("lastname");
  const ageFromParams = searchParams.get("age");
  const materialstatusFromParams = searchParams.get("materialstatus");
  const isEmployedFromParam = searchParams.get("is_employed");
  const isFoundFromParam = searchParams.get("is_founder");

  console.log(isEmployedFromParam);
  console.log(isFoundFromParam);

  // console.log(usernameFromParams);

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [age, setAge] = useState();
  const [materialstatus, setMaterialStatus] = useState("");
  const [isEmployed, setIsEmployed] = useState(false);
  const [isFounder, setIsFounder] = useState(false);

  const handleAddUser = () => {
    const user = {
      first_name: firstname,
      last_name: lastname,
      username: username,
      age: age,
      marital_status: materialstatus,
      is_employed: isEmployed,
      is_founder: isFounder,
    };

    if (user) {
      userData.addUser(user);
      navigate("/");
    } else {
      alert("Please provide all fields");
    }
  };

  const handleEditUser = () => {
    const user = {
      first_name: firstname,
      last_name: lastname,
      username: username,
      age: age,
      marital_status: materialstatus,
      is_employed: isEmployed,
      is_founder: isFounder,
    };

    if (user) {
      userData.editUser(user);
      navigate("/");
    } else {
      alert("Please provide all fields");
    }
  };

  useEffect(() => {
    if (
      usernameFromParams ||
      firstNameFromParams ||
      lastNameFromParams ||
      ageFromParams ||
      materialstatusFromParams ||
      isEmployedFromParam ||
      isFoundFromParam
    ) {
      setUserName(usernameFromParams);
      setFirstName(firstNameFromParams);
      setLastName(lastNameFromParams);
      setAge(ageFromParams);
      setMaterialStatus(materialstatusFromParams);

      // Convert "true" or "false" (with trimming) to boolean values
      setIsEmployed(
        isEmployedFromParam && isEmployedFromParam.trim() === "true"
      );
      setIsFounder(isFoundFromParam && isFoundFromParam.trim() === "true");
    }
  }, [
    usernameFromParams,
    firstNameFromParams,
    lastNameFromParams,
    ageFromParams,
    materialstatusFromParams,
    isEmployedFromParam,
    isFoundFromParam,
  ]);

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-8 my-10">
      <h1 className="text-2xl font-bold text-center mb-6">User Details</h1>
      <form className="space-y-6">
        {/* First Name */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-700 mb-2">First Name:</label>
          <input
            type="text"
            name="first_name"
            placeholder="Enter first name"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={firstname}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-700 mb-2">Last Name:</label>
          <input
            type="text"
            name="last_name"
            placeholder="Enter last name"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={lastname}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>

        {/* Username */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-700 mb-2">Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            disabled = {Boolean(usernameFromParams)}
          />
        </div>

        {/* Age */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-700 mb-2">Age:</label>
          <input
            type="number"
            name="age"
            placeholder="Enter Age"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
        </div>

        {/* Marital Status */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-700 mb-2">
            Marital Status:
          </label>
          <select
            name="marital_status"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={materialstatus}
            onChange={(e) => {
              setMaterialStatus(e.target.value);
            }}>
            <option value="">Select</option>
            <option value="married">Married</option>
            <option value="unmarried">Unmarried</option>
          </select>
        </div>

        {/* Employed */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="is_employed"
            className="mr-2 h-5 w-5 text-blue-500 focus:ring-blue-500 rounded"
            checked={isEmployed}
            onChange={(e) => {
              setIsEmployed(e.target.checked);
            }}
          />
          <label className="font-medium text-gray-700">Employed</label>
        </div>

        {/* Founder */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="is_founder"
            className="mr-2 h-5 w-5 text-blue-500 focus:ring-blue-500 rounded"
            checked={isFounder}
            onChange={(e) => {
              setIsFounder(e.target.checked);
            }}
          />
          <label className="font-medium text-gray-700">Founder</label>
        </div>

        {/* Add User Button */}
        <button
          type="button"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          onClick={
            usernameFromParams && firstNameFromParams
              ? handleEditUser
              : handleAddUser
          }>
          {usernameFromParams && firstNameFromParams ? "Edit User" : "Add User"}
        </button>
      </form>
    </div>
  );
}
