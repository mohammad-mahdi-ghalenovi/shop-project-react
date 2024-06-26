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
      id: findBiggestID(users) + 1,
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

// Products 📳📳

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

export const deleteProduct = async (productID) => {
  await fetch(
    `https://sabzlearn-dashboard-default-rtdb.firebaseio.com/products/${productID}.json`,
    {
      method: "DELETE",
    }
  ).then((res) => console.log(res));
};

export const addNewProduct = async (productObj) => {
  let products = await getAllProducts();
  let result = false;
  products = products.map(product => product[1])

  let isAlreadyAdded = products.some((product) => {
    return product.name === productObj.name;
  });

  if (!isAlreadyAdded) {
    result = true
  }


  if (result) {
    let newProduct = {
      id: findBiggestID(products) + 1,
      ...productObj
    };

    await fetch(
      "https://sabzlearn-dashboard-default-rtdb.firebaseio.com/products.json",
      {
        method: "POST",
        body: JSON.stringify(newProduct),
      }
    )
      .then((res) => result = true)
      .catch((err) => result = false);
  }

  return result
}

export const putProduct = async (productObj, productID) => {
  let result = false;

  await fetch(
    `https://sabzlearn-dashboard-default-rtdb.firebaseio.com/products/${productID}.json`, {
    method: "PUT",
    body: JSON.stringify(productObj),
  }
  )
    .then(res => {
      if (res) {
        result = true
      }
    })
    .catch(err => result = false)

  return result

}

const findBiggestID = (array) => {

  let sortedIdNumbers = []

  array.forEach(obj => {
    sortedIdNumbers.push(obj.id) // an array with all objects ID
  })

  sortedIdNumbers = sortedIdNumbers.sort().reverse() // sort the array from big to small to find the biggest ID

  if (sortedIdNumbers[0] === 0) { // for first init
    sortedIdNumbers[0] = 1
  }

  return sortedIdNumbers[0] * 1
}