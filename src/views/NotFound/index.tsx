import { FC } from "react";
import { useRouteError } from "react-router-dom";
import "./index.scss";

interface Ierror {
  statusText?: string;
  message?: string;
}

const NotFound: FC = () => {
  const error = useRouteError() as Ierror;

  console.error(error);

  return (
    <section className="not-found">
      <h1 className="not-found__heading">Oops!</h1>
      <p className="not-found__description">
        Oops, we are unable to find what you're looking for...
      </p>
      <p className="not-found__error">
        <i>{error.statusText || error.message}</i>
      </p>
    </section>
  );
};

export default NotFound;
