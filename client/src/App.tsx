//@ts-nocheck

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AllBooks from "./pages/AllBooks";
import ProtectedRoute from "../utils/ProtectedRoute";
import AvailableBooks from "./pages/AvailableBooks";
import BookDetails from "./pages/BookDetails";
import AllUsersWithBook from "./pages/AllUsersWithBook";
import { AuthProvider } from "../context/AuthContext";
import AuthForm from "./pages/AuthForm";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";


function App() {
  return (
        <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/books" element={<AvailableBooks />} />
            <Route path="/" element={<AuthForm />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route
              path="/borrowed"
              element={
                <ProtectedRoute role="admin">
                  <AllUsersWithBook />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booksall"
              element={
                <ProtectedRoute role="admin">
                  <AllBooks />
                </ProtectedRoute>
              }
            />
          </Routes>
          <ToastContainer/>
          </AuthProvider>
        </BrowserRouter>
    
  );
}

export default App;
