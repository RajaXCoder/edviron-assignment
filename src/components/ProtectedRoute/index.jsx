import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = (prop) => {
  // console.log(prop);

  if (Cookies.get("jwt_token") === undefined) {
    return <Navigate to="/login" replace />;
  }

  // Render the children if authenticated
  return prop.children;
};

export default ProtectedRoute;
