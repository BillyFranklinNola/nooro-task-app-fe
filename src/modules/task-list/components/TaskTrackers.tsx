const TasksSummary = ({
  total,
  completed,
}: {
  total: number;
  completed: number;
}) => {
  return (
    <div className="flex items-center justify-between text-[14px] w-full max-w-[736px]">
      <h3 className=" flex gap-2 text-[#4EA8DE] font-bold">
        Tasks:{" "}
        <span className="text-[#D9D9D9] text-[12px] bg-[#333333] py-[2px] px-2 rounded-full">
          {total}
        </span>
      </h3>
      <h3 className="flex gap-2 text-[#8284FA] font-bold">
        Completed:{" "}
        <span className="text-[#D9D9D9] text-[12px] bg-[#333333] py-[2px] px-2 rounded-full">
          {completed}
        </span>
      </h3>
    </div>
  );
};

export default TasksSummary;
