const ConversationsSkeleton = () => {
  return (
    <>
      <div className="flex gap-3 items-center p-5">
        <div className="skeleton w-10 h-10 rounded-full shrink-0 bg-slate-700"></div>
        <div className="flex flex-col gap-1 ">
          <div className="skeleton h-3 w-40 bg-slate-700"></div>
        </div>
      </div>
      <div className="flex gap-3 items-center p-5">
        <div className="skeleton w-10 h-10 rounded-full shrink-0 bg-slate-700"></div>
        <div className="flex flex-col gap-1 ">
          <div className="skeleton h-3 w-40 bg-slate-700"></div>
        </div>
      </div>
      <div className="flex gap-3 items-center p-5">
        <div className="skeleton w-10 h-10 rounded-full shrink-0 bg-slate-700"></div>
        <div className="flex flex-col gap-1 ">
          <div className="skeleton h-3 w-40 bg-slate-700"></div>
        </div>
      </div>
      <div className="flex gap-3 items-center p-5">
        <div className="skeleton w-10 h-10 rounded-full shrink-0 bg-slate-700"></div>
        <div className="flex flex-col gap-1 ">
          <div className="skeleton h-3 w-40 bg-slate-700"></div>
        </div>
      </div>
    </>
  );
};
export default ConversationsSkeleton;
