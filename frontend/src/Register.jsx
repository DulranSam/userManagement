import React, { useState } from "react";
import Axios from "axios";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
    mail: "",
  });
  const [status, setStatus] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios.post("http://localhost:8000/main", {
        username: user.username,
        password: user.password,
        mail: user.mail,
      });

      if (response.status === 201) {
        setStatus("Account Created");
      } else {
        setStatus("Error");
      }
    } catch (err) {
      console.error(err);
      setStatus("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <br />
        <input
          onChange={handleInputChange}
          value={user.username}
          name="username"
          placeholder="Enter Username"
          type="text"
        />
        <input
          onChange={handleInputChange}
          value={user.password}
          name="password"
          placeholder="Enter Password"
          type="password"
        />
        <input
          onChange={handleInputChange}
          value={user.mail}
          name="mail"
          placeholder="Enter mail"
          type="email"
        />
        <br />
        <button type="submit">{loading ? "Loading..." : "Create User"}</button>
      </form>
      <p>{status}</p>
    </div>
  );
};

export default Register;
