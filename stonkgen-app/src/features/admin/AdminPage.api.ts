export const fetchUserLists = async ()  =>{
    fetch("http://localhost:3001/userList")
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
}