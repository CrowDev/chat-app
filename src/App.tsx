import { useEffect } from "react";
import { useNavigate } from "react-router";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/chat");
    } else {
      localStorage.clear();
      navigate("/login");
    }
  }, []);
  return <></>;
}

export default App;
