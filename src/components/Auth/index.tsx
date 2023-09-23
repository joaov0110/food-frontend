import { FC, ReactNode } from "react";
import useUser from "../../hooks/useUserClient";
import { GET_USER } from "../../constants/queries";
import Loading from "../Loading";
import { useQuery } from "react-query";

interface Iauth {
  children: ReactNode;
}

const Auth: FC<Iauth> = ({ children }) => {
  const { fetchUser } = useUser();

  const { isLoading, data } = useQuery({
    queryKey: [GET_USER],
    queryFn: fetchUser,
  });

  if (isLoading) {
    return <Loading show={isLoading} />;
  }

  if (data) {
    return <>{children}</>;
  }

  return null;
};

export default Auth;
