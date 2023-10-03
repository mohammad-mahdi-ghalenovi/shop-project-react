import React, { useState, useEffect } from "react";

export default function Login() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("mmd");
  const [password, setPassword] = useState("321");
  const [getUsers, setGetUsers] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      let fetchedData = await fetch(
        "https://sabzlearn-dashboard-default-rtdb.firebaseio.com/users.json"
      );
      let response = await fetchedData.json();
      const userData = Object.entries(response).map((user) => user[1]);
      setUsers(userData);
    };

    fetchUsers();
  }, [getUsers]);

  const addUser = async () => {
    let newUser = {
      id: users.length + 1,
      name,
      password,
      basket: [{ name: "", price: 0, count: 1 }],
    };

    await fetch(
      "https://sabzlearn-dashboard-default-rtdb.firebaseio.com/users.json",
      {
        method: "POST",
        body: JSON.stringify(newUser),
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data));

    setGetUsers((prev) => !prev);
    setName("");
    setPassword("");
  };

  return (
    <>
      <h1>SIGN UP</h1>
      <input
        type="text"
        placeholder="Name:"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="password"
        placeholder="Password: "
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button onClick={addUser}>Submit</button>
    </>
  );
}
