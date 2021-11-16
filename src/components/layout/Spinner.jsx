import spinner from "./spinner.gif";

const Spinner = () => {
  return (
    <>
      <img src={spinner} alt="Loading..." style={spinnerStyles} />
    </>
  );
};

const spinnerStyles = {
  width: "200px",
  margin: "auto",
  display: "block"
};

export default Spinner;
