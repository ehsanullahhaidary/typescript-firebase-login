import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, Unsubscribe } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";

export interface IAuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = ({ children }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth: Unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        console.log("User is logged in");
        if (location.pathname === "/login") {
          navigate("/");
        }
      } else {
        console.log("User is not logged in");
        if (location.pathname !== "/login") {
          navigate("/login");
        }
      }
    });

    const unlisten = navigate;

    return () => {
      unsubscribeAuth();
    };
  }, [auth, navigate, location]);

  if (loading) return <p>loading ...</p>;

  return <>{children}</>;
};

export default AuthRoute;
