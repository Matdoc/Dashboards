import { Route, Routes, useNavigate, Navigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./components/common/Sidebar";
import UsersPage from "./pages/UsersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import LoginComponent from "./pages/LoginPage/loginComponent";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userid = localStorage.getItem("currentUserId");
    if (userid) {
      const token = localStorage.getItem(`token_${userid}`);
      if (token) {
        setIsLoggedIn(true);
      }
    }
    setIsLoading(false);
  }, []);

  const handleLoginSuccess = (userid, userdata) => {
    if (!userid || !userdata || !userdata.token) {
      console.error("Invalid login data provided.");
      return;
    }
  
    localStorage.setItem(`token_${userid}`, userdata.token);
    localStorage.setItem(`userdata_${userid}`, JSON.stringify(userdata));
    localStorage.setItem("currentUserId", userid);
  
  // Ensure navigation happens after local storage is set
  setIsLoggedIn(true);
  navigate(`/home/${userid}`);
  };
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path='/login' element={<LoginComponent onLoginSuccess={handleLoginSuccess} />} />
      {isLoggedIn ? (
        <Route
          path="*"
          element={
            <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
              {/* BG */}
              <div className='fixed inset-0 z-0'>
                <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
                <div className='absolute inset-0 backdrop-blur-sm' />
              </div>
              <Sidebar/>
              <Routes>
                <Route path='/users/:userid' element={<ProtectedRoute component={UsersPage} />} />
                <Route path='/home/:userid' element={<ProtectedRoute component={AnalyticsPage} />} />
                <Route path='/settings/:userid' element={<ProtectedRoute component={SettingsPage} />} />
                <Route path='*' element={<Navigate to={`/home/${localStorage.getItem("currentUserId")}`} />} />
              </Routes>
            </div>
          }
        />
      ) : (
        <Route path='*' element={<Navigate to='/login' />} />
      )}
    </Routes>
  );
}

const ProtectedRoute = ({ component: Component }) => {
  const { userid } = useParams();
  console.log("ProtectedRoute - userid:", userid);

  const sessionToken = localStorage.getItem(`token_${userid}`);
  if (!sessionToken) {
    console.warn("No valid session token found. Redirecting to login.");
    return <Navigate to="/login" />;
  }

  return <Component />;
};
export default App;