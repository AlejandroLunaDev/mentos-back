
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./common/context/AuthProvider";
import AppRoutes from "./routes/AppRoutes";


function App() {
  return (
    <div>
        
    <BrowserRouter>
      <AuthProvider>
      <AppRoutes />
      </AuthProvider>
    </BrowserRouter>

    </div>
    
  );
}

export default App;
