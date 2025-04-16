import { PacmanLoader } from "react-spinners";
import s from "./Loader.module.css";
const Loader = () => {
  return (
    <div className={s.backdrop}>
      {" "}
      <PacmanLoader />
    </div>
  );
};

export default Loader;
