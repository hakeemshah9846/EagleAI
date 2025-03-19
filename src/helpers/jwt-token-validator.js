import { jwtDecode } from 'jwt-decode';

class JwtValidator {
  static instance;

  constructor() {
    if (!JwtValidator.instance) {
      JwtValidator.instance = this;
    }
    return JwtValidator.instance;
  }

  validateToken(token) {
    try {
      console.log("from jwt token validator")
      if (!token || typeof token !== 'string') {
        console.error('Invalid token: Token is either null or not a string.');
        return false;
      }

      const decodedToken = jwtDecode(token); 

      if (!decodedToken.exp) {
        console.error('Invalid token: Missing expiration time (exp).');
        return false;
      }
      // Adjust local time
      const adjustedCurrentTime = Date.now();
      const expirationTime = decodedToken.exp * 1000;

      if (adjustedCurrentTime >= expirationTime) {
        console.error('Token has expired.');
        return false;
      }

      // Optional: Validate other fields (e.g., sessionId)
      // if (!decodedToken.sessionId) {
      //   console.error('Invalid token: Missing sessionId.');
      //   return false;
      // }

      return true; // Token is valid if all checks pass
    } catch (error) {
      console.error('Error validating token:', error);
      return false;
    }
  }
}

const jwtValidator = new JwtValidator();
const validateToken = jwtValidator.validateToken.bind(jwtValidator);

export { validateToken };
