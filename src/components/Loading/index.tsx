import { FC } from "react";
import "./index.scss";

interface Iloading {
  show: boolean;
}

const Loading: FC<Iloading> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="loader__container">
      <p className="loader__text">Loading...</p>
    </div>
  );
};

export default Loading;
