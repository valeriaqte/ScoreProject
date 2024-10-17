class UserModel {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    //metodo para validar las credenciales
    validateCredentials(username, password) {
        //validar credenciales
        //retornar true si son validas
        //retornar false si no son validas
        const storedUser = new UserModel('user', 'password');
        return storedUser.username === username && storedUser.password === password;
    }
}

export default UserModel;