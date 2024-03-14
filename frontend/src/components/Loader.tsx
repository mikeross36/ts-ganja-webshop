import PulseLoader from "react-spinners/PulseLoader";

export default function Loader(): JSX.Element {
  return (
    <div style={loaderStyle}>
      <PulseLoader color="#1d976c" size={30} speedMultiplier={0.7} />
    </div>
  );
}

const loaderStyle: React.CSSProperties | undefined = {
  width: "300px",
  height: "200px",
  margin: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
};
