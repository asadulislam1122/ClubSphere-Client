import Forbidden from "../Components/Forbeden";
import Loading from "../Components/Loading/Loading";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";

const ManagerRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();
  if (loading || !user || roleLoading) {
    return <Loading></Loading>;
  }
  if (role !== "manager") {
    return <Forbidden></Forbidden>;
  }
  return children;
};
export default ManagerRoute;
