import { TailSpin } from "react-loader-spinner";

const Loader = () => (
  <div className="flex justify-center items-center h-screen bg-gray-100">
    <TailSpin
      height={80}
      width={80}
      color="#4fa94d"
      ariaLabel="loading"
      visible={true}
    />
  </div>
);

export default Loader;
