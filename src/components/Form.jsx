import { useContext } from "react";
import { UserContext } from "./UserProvider"; // Corrected import path
import UserForm from "./UserForm";

function Form() {
  return (
    <div className="">
      <UserForm />
    </div>
  );
}

export default Form;
