import { Spinner } from "./StyledComponent";

const Loader = ({ padding = "24px" }) => {
  return (
    <div
      style={{
        padding: padding,
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      }}
      id="loader"
    >
      <Spinner />
    </div>
  );
};
Loader.displayName = "Loader";

export default Loader;
