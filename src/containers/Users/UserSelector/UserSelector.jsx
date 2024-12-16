import React from "react";
import DropdownFilterSelector from "../../../components/UI/DropdownFilterSelector/DropdownFilterSelector";
// import axios from "axios";
import axios from "../../../axios-private";

const UserSelector = ({ onSelect }) => {
  // Fetch users API
  const fetchUsers = async (query) => {
    const response = await axios.get("/Account/UsersBySearchString", {
      params: { query },
    });
    return response.data; // Ensure API returns objects with unique `id`
  };

  // Render user as (username, email, fullName)
  const renderUser = (user) =>
    `${user.userName}, ${user.email}), ${user.fullName}`;

  return (
    <DropdownFilterSelector
      fetchOptions={fetchUsers}
      renderOption={renderUser}
      onOptionSelect={(user) => onSelect(user.id)}
      placeholder="Search users..."
    />
  );
};

export default UserSelector;