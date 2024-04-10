import { TbFaceIdError } from "react-icons/tb";

const Error = ({ message, className }) => {
  return (
    <div
      className={` flex w-full gap-2 m-auto  rounded-md bg-red-200 text-slate-900  px-4 py-2 max-w-md ${className}`}
    >
      <TbFaceIdError className="text-4xl" />
      <p className="text-center italic font-bold">{message}</p>
    </div>
  );
};

export default Error;
