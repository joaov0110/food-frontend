import { FC, ReactNode } from "react";
import useUser from "../../hooks/useUser";
import Loading from "../Loading";

interface Iauth {
  children: ReactNode;
}

const Auth: FC<Iauth> = ({ children }) => {
  const {
    user: { isLoading, isError, error },
  } = useUser();

  if (isLoading) {
    return <Loading show={isLoading} />;
  }

  if (isError) {
    return <div>{error?.message}</div>;
  }

  return <>{children}</>;
};

export default Auth;
