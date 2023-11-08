export const isUserLogin = async () => {
  let allUsers = await getAllUsers()
  let mainUserToken = getUserFromCookie().userToken

  allUsers = allUsers.map(user => user[0])

  return allUsers.some((userID) => {
    return mainUserToken === userID;
  });

}

export const findUser = (userID) => {
  const fetchUsers = async () => {
    let fetchedData = await fetch(
      "https://sabzlearn-dashboard-default-rtdb.firebaseio.com/users.json"
    );
    let response = await fetchedData.json();
    const userData = Object.entries(response);
    // find mainUser
    return userData.find((user) => user[0] === userID);
  };

  const mainUser = fetchUsers();
  return mainUser;
};

export const putUser = async (userID, userObj) => {
  let isSuccess = false;
  // get user and put to firebase
  if (userObj) {
    let updatedBasket = [...userObj.basket];
    updatedBasket.some((product) => {
      if (product.id === 0) {
        updatedBasket.splice(updatedBasket.indexOf(product), 1);
      }
    });

    userObj = { ...userObj, basket: [...updatedBasket] };

    await fetch(
      `https://sabzlearn-dashboard-default-rtdb.firebaseio.com/users/${userID}.json`,
      {
        method: "PUT",
        body: JSON.stringify(userObj),
      }
    )
      .then((res) => (isSuccess = true))
      .catch((err) => (isSuccess = false));
  }

  return isSuccess;
};

export const getAllUsers = async () => {
  const getUsers = async () => {
    let fetchedData = await fetch(
      "https://sabzlearn-dashboard-default-rtdb.firebaseio.com/users.json"
    );
    let response = await fetchedData.json();
    const userData = Object.entries(response);
    // do something with userData
    return userData;
  };

  let result = await getUsers();

  return result;
};

export const getAllProducts = async () => {
  const getProducts = async () => {
    let fetchedData = await fetch(
      "https://sabzlearn-dashboard-default-rtdb.firebaseio.com/products.json"
    );
    let response = await fetchedData.json();
    const userData = Object.entries(response);
    // do something with userData
    return userData;
  };

  let result = await getProducts();

  return result;
};

export const getUserFromCookie = () => {
  let cookies = document.cookie;
  let slicedArray = cookies.split(";").map((info) => {
    return info.slice(info.indexOf("=") + 1);
  });

  let loggedInUser = {
    username: slicedArray[0],
    password: slicedArray[1],
    userToken: slicedArray[2],
  };

  return loggedInUser;
};

export const deleteUser = async (userID) => {
  await fetch(
    `https://sabzlearn-dashboard-default-rtdb.firebaseio.com/users/${userID}.json`,
    {
      method: "DELETE",
    }
  ).then((res) => console.log(res));
};

export const addNewUser = async (name, password) => {
  let users = await getAllUsers()
  let result = false

  users = users.map(user => user[1])

  let isAlreadySignUp = users.some((user) => {
    return user.name === name;
  });

  if (!isAlreadySignUp) {
    result = true
  }


  if (result) {
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
      .then((res) => result = true)
      .catch((err) => result = false);
  }

  return result
}