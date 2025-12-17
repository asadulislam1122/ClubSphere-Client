import Forbeden from "../Components/Forbeden";
import Loading from "../Components/Loading/Loading";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();
  if (loading || roleLoading) {
    return <Loading></Loading>;
  }
  if (role !== "admin") {
    return <Forbeden></Forbeden>;
  }
  return children;
};

export default AdminRoute;
