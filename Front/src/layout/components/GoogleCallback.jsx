import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { loginGoogleUserCallback } from "../../redux/actions/actions";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const GoogleCallback = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("mentos");

    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      dispatch(loginGoogleUserCallback(decodedToken));
      navigate("/"); // Redirigir a la página principal después del login
    } else {
      // Manejar error
      console.error("No se pudo obtener el token");
    }
  }, [location, dispatch, navigate]);

  return <div>Iniciando sesión con Google...</div>;
};

export default GoogleCallback;
