import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import HotelRegister from "./pages/HotelRegister";
import ProtectedRoute from "./layouts/ProtectedRoute";
import MyHotels from "./pages/MyHotels";
import { EditHotel } from "./pages/EditHotel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout>{<p>Home Page</p>}</Layout>} />
        <Route path="/search" element={<Layout>{<p>Search</p>}</Layout>} />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />
        <Route
          path="/my-hotels"
          element={
            <ProtectedRoute>
              <Layout>
                <MyHotels />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/new-hotel"
          element={
            <ProtectedRoute>
              <Layout>
                <HotelRegister />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-hotel/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <EditHotel />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to={"/"}></Navigate>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
