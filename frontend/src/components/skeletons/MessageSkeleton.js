const MessageSkeleton = () => {
  return (
    <>
      <div className="flex gap-3 items-center px-32 py-16 ">
        <div className="skeleton w-10 h-10 rounded-full shrink-0 bg-slate-700"></div>
        <div className="flex flex-col gap-1 ">
          <div className="skeleton h-2 w-20 bg-slate-700"></div>
          <div className="skeleton h-2 w-32 bg-slate-700"></div>
          <div className="skeleton h-2 w-40 bg-slate-700"></div>
        </div>
      </div>
      <div className="flex gap-3 items-center justify-end px-32 py-16">
        <div className="flex flex-col gap-1">
          <div className="skeleton h-2 w-20 bg-slate-700"></div>
          <div className="skeleton h-2 w-32 bg-slate-700"></div>
          <div className="skeleton h-2 w-40 bg-slate-700"></div>
        </div>
        <div className="skeleton w-10 h-10 rounded-full shrink-0 bg-slate-700"></div>
      </div>
      <div className="flex gap-3 items-center px-32 py-16 ">
        <div className="skeleton w-10 h-10 rounded-full shrink-0 bg-slate-700"></div>
        <div className="flex flex-col gap-1 ">
          <div className="skeleton h-2 w-20 bg-slate-700"></div>
          <div className="skeleton h-2 w-32 bg-slate-700"></div>
          <div className="skeleton h-2 w-40 bg-slate-700"></div>
        </div>
      </div>
    </>
  );
};
export default MessageSkeleton;
