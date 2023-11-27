import { useState } from "react";
import Axios from "axios";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
    mail: "",
  });
  const [photo, setPhoto] = useState();
  const [status, setStatus] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    setStatus("");
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios.post("http://localhost:8000/main", {
        username: user.username,
        password: user.password,
        mail: user.mail,
        photo: photo,
      });

      if (response.status === 201) {
        setStatus("Account Created");
      } else if (response.status === 409) {
        setStatus(
          "User already exists , Please try using a different Email or Username"
        );
      }
    } catch (err) {
      console.error(err);
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
          required
        />
        <input
          onChange={handleInputChange}
          value={user.password}
          name="password"
          placeholder="Enter Password"
          type="password"
          required
        />
        <input
          onChange={handleInputChange}
          value={user.mail}
          name="mail"
          placeholder="Enter mail"
          type="email"
          required
        />
        <input
          onChange={(e) => {
            setPhoto(e.target.files[0]);
          }}
          type="file"
        ></input>
        <br />
        <button type="submit">{loading ? "Loading..." : "Create User"}</button>
      </form>
      <p>{status}</p>
    </div>
  );
};

export default Register;
