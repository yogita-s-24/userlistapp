import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

function UserProvider({ children }) {
  const [users, setUsers] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const response = await axios.get(
          "https://mocki.io/v1/a6a0fb6b-a84a-4934-b3f2-5c92cc77c44e"
        );
        setUsers(response.data); // Set the fetched user data
        console.log("Fetched users:", response.data); // Log fetched users
      } catch (error) {
        console.log("Error fetching the user data", error);
      }
    };

    fetchApiData();
  }, []);

  const addUser = (userObject) => {
    setUsers([
      {
        first_name: userObject.first_name,
        last_name: userObject.last_name,
        username: userObject.username,
        age: userObject.age,
        marital_status: userObject.marital_status,
        is_employed: userObject.is_employed,
        is_founder: userObject.is_founder,
      },
      ...users,
    ]);
  };

  const editUser = (userObject) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.username === userObject.username ? { ...userObject } : user
      )
    );
  };
  
  const deleteUser = (userObject) =>{
    setUsers((prevUsers) =>
      prevUsers.filter((user) =>
        user.username !== userObject.username
      )
    );

  }

  return (
    <UserContext.Provider value={{ users, addUser, editUser, deleteUser }}>
      {/* childeren props like form component and app component */}
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
