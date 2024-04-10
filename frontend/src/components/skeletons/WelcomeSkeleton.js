const WelcomeSkeleton = () => {
  return (
    <>
      <div className="flex flex-col gap-3 m-auto ">
        <div className="skeleton w-96 h-96 aspect-square shrink-0 bg-slate-600"></div>
        <div className="flex flex-col gap-3 mx-auto">
          <div className="skeleton h-2 w-96 bg-slate-600"></div>
          <div className="skeleton h-2 w-96 bg-slate-600"></div>
          <div className="skeleton h-2 w-96 bg-slate-600"></div>
        </div>
      </div>
    </>
  );
};
export default WelcomeSkeleton;
