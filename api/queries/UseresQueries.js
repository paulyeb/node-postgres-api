const getsUsers = "SELECT * FROM users";

const getUser = "SELECT * FROM users WHERE id = $1";

const addUser = "INSERT into users (name, email, password, residence) VALUES ($1, $2, $3, $4)";

const checkIfEmailExists = "SELECT * FROM users WHERE email = $1";

const deleteUser = "DELETE FROM users WHERE id = $1";

module.exports = {
    getsUsers, 
    getUser,
    addUser,
    checkIfEmailExists,
    deleteUser
}