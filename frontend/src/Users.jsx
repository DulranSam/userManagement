import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function Users() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const gettheID = useRef();
  async function GetUsers() {
    try {
      setLoading(true);
      const response = await Axios.get("http://localhost:8000/main");
      setUsers(response.data);
    } catch (err) {
      setStatus(err.response.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    GetUsers();
  }, []);

  async function DeleteItem(id) {
    try {
      setLoading(true);
      await Axios.delete(`http://localhost:8000/main`, { params: { id } });

      GetUsers();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function SearchUsers(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios.get(`http://localhost:8000/main`, {
        params: { username: search },
      });
      setUsers(response.data);
    } catch (err) {
      setStatus(err.response.data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>{status !== "" ? status : ""}</h1>
      <form onSubmit={SearchUsers}>
        <input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Enter User"
          type="text"
          value={search}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Search User"}
        </button>
      </form>
      {users.map((x) => (
        <div key={x._id}>
          <button onClick={() => DeleteItem(x._id)} disabled={loading}>
            Delete
          </button>
          <br />
          <h1>ID {x._id}</h1>
          <p>Username {x.username}</p>
          {/* Do not display the password for security reasons */}
          <p>Mail {x.mail}</p>
          <br />
        </div>
      ))}
      <p>
        Not registered yet? <Link to="/register">Click Here</Link>
      </p>
    </div>
  );
}

export default Users;
