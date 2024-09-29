import { Class } from "@/entities/class/model/class";
import { ClassCard } from "../ClassCard";

interface ClassListProps {
  classListData: Class[];
  type: "row" | "col";
}

const ClassList = (props: ClassListProps) => {
  const { classListData, type } = props;

  return type === "col" ? (
    <div className="w-full grid grid-cols-3 gap-6 mobile:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3">
      {classListData &&
        classListData.map((classData) => {
          return (
            <ClassCard key={classData.id} classData={classData} type={type} />
          );
        })}
    </div>
  ) : (
    <div className="w-full grid grid-cols-2 gap-6 mobile:grid-cols-1 tablet:grid-cols-1 desktop:grid-cols-2 pb-[265px]">
      {classListData &&
        classListData.map((classData) => {
          return (
            <ClassCard key={classData.id} classData={classData} type={type} />
          );
        })}
    </div>
  );
};

export default ClassList;
