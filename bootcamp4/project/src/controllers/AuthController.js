import UserModel from '../models/UserModel';

class AuthController {
    static login(req, res) {
        const { email, password } = req.body;
        const isValid = UserModel.validateCredentials(username, password);

        if (isValid) {
            // Aquí podrías generar un token, establecer una sesión, etc.
            return res.status(200).json({ message: 'Login successful' });
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    }
}

export default AuthController;
