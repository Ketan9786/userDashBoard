import React, { useEffect, useState } from "react";
import "./UserS.css";
import { Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

const UserS = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [page, setPage] = useState(1);
  const [editedData, setEditedData] = useState({});

  const loadMoreUsers = () => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/users?_page=${page + 1}&_limit=5`)
      .then((response) => response.json())
      .then((data) => {
        setUserData([...userData, ...data]);
        setPage(page + 1);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data: ", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users?_page=1&_limit=5")
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error("Error fetching user data: ", error));
  }, []);

  const handleEditClick = (index) => {
    setEditingRow(index);
  };

  const handleCancelClick = () => {
    setEditingRow(null);
  };

  const handleSaveClick = (index) => {
    const editedUser = userData[index];
    if (editedData.name) editedUser.name = editedData.name;
    if (editedData.username) editedUser.username = editedData.username;
    if (editedData.email) editedUser.email = editedData.email;
    if (editedData.suite) editedUser.address.suite = editedData.suite;
  
   
    fetch(`https://jsonplaceholder.typicode.com/users/${editedUser.id}`, {
      method: "PUT",
      body: JSON.stringify(editedUser),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((updatedUserData) => {
        alert("User data updated: please check console.log")
        console.log("User data updated:", updatedUserData);
      })
      .catch((error) => {
        console.error("Error updating user data: ", error);
      });
  
    setEditingRow(null);
  };
  

  const handleChange = (event, field) => {
    const newValue = event.target.value;
    setEditedData((prevData) => ({
      ...prevData,
      [field]: newValue,
    }));
  };
  
  const handleDeleteUser = (userId) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    

    alert("User deleted: please check console log")
    console.log("User deleted:", data);
    const updatedUserData = userData.filter((user) => user.id !== userId);
    setUserData(updatedUserData);
  })
  .catch((error) => {
    console.error("Error deleting user: ", error);
  });

    
  };
  

  return (
    <div className="dashBoard">
      <div className="add-btn">
      <Link to="/new-user-registration">
        <Button variant="contained" color="warning">
          Click Here to Add New User
        </Button>
      </Link>
      </div>
     <Container maxWidth="xl">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Department</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
  {userData.length > 0 ? (
    userData.map((data, index) => {
      const isEditing = editingRow === index;
      return (
        <tr key={data.id}>
          <td>{data.id}</td>
          <td>
            {isEditing ? (
              <input
                type="text"
                value={editedData.name || data.name}
                onChange={(e) => handleChange(e, "name")}
              />
            ) : (
              `${data.name}`
            )}
          </td>
          <td>
            {isEditing ? (
              <input
                type="text"
                value={editedData.username || data.username}
                onChange={(e) => handleChange(e, "username")}
              />
            ) : (
              `${data.username}`
            )}
          </td>
          <td>
            {isEditing ? (
              <input
                type="text"
                value={editedData.email || data.email}
                onChange={(e) => handleChange(e, "email")}
              />
            ) : (
              `${data.email}`
            )}
          </td>
          <td>
            {isEditing ? (
              <input
                type="text"
                value={editedData.suite || data.address.suite}
                onChange={(e) => handleChange(e, "suite")}
              />
            ) : (
              `${data.address.suite}`
            )}
          </td>
          <td>
            {isEditing ? (
              <div>
                <Button
                  variant="contained"
                  onClick={() => handleSaveClick(index)}
                  color="success"
                  sx={{ margin: "3px" }}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="inherit"
                  sx={{ margin: "3px" }}
                  onClick={handleCancelClick}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                variant="contained"
                onClick={() => handleEditClick(index)}
              >
                Edit
              </Button>
            )}
          </td>
          <td>
            <Button variant="contained" color="error" onClick={() => handleDeleteUser(data.id)}>
              Delete
            </Button>
          </td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td colSpan="7">User Not Found</td>
    </tr>
  )}
</tbody>
      </table>
      </Container>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div className="load-more">
          <Button  onClick={loadMoreUsers}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserS;
