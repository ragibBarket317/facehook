import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import useAuth from "../hooks/useAuth";
import { ProfileProvider } from "../providers/ProfileProvider";

const PrivateRoutes = () => {
  const { auth } = useAuth();
  return (
    <>
      {auth?.authToken ? (
        <>
          <ProfileProvider>
            <Header></Header>
            <main className="mx-auto max-w-[1020px] py-8">
              <div className="container">
                <Outlet></Outlet>
              </div>
            </main>
          </ProfileProvider>
        </>
      ) : (
        <Navigate to="/login"></Navigate>
      )}
    </>
  );
};

export default PrivateRoutes;
