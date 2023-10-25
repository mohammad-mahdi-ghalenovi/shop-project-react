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
      .catch((err) => (isSuccess = true));
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
