import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, Unsubscribe } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export interface IAuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = ({ children }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe: Unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
        navigate("/");
      } else {
        console.log("unauthorized");
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  if (loading) return <p>loading ...</p>;

  return <>{children}</>;
};

export default AuthRoute;
