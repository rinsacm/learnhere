module.exports.getUserRole = (role) => {
  let userId = localStorage.getItem("id") ? localStorage.getItem("id") : null;
  console.log(userId);
  console.log(role);
  if (userId != null && !role == true) {
    return fetch(`http://localhost:3001/get-role/${userId}`, {
      method: "GET",
      credentials: "include",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.role);
        return data.role;
      });
  }
};
