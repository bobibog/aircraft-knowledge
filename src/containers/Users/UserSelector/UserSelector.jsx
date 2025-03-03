import React from "react";
import DropdownFilterSelector from "../../../components/UI/DropdownFilterSelector/DropdownFilterSelector";
// import axios from "axios";
import axios from "../../../axios-private";

const UserSelector = ({ currentFeeder, onSelect }) => {
  // Fetch users API
  const fetchUsers = async (searchString) => {
    const response = await axios.get("/Account/UsersBySearchString", {
      params: { searchString },
    });
    return response.data; // Ensure API returns objects with unique `id`
  };

  // Render user as (username, email, fullName)
  const renderUser = (user) =>
    `${user.userName}, ${user.email}, ${user.name} ${user.surname}`;

  return (
    <DropdownFilterSelector
      selectedItem={currentFeeder}
      fetchOptions={fetchUsers}
      renderOption={renderUser}
      onOptionSelect={(user) => onSelect(user.id)}
      placeholder="Search users..."
    />
  );
};

export default UserSelector;