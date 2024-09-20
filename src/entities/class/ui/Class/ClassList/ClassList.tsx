import { Class } from "@/entities/class/model/class";
import { ClassCard } from "../ClassCard";

interface ClassListProps {
  classListData: Class[];
}

const ClassList = (props: ClassListProps) => {
  const { classListData } = props;

  return (
    <div className="grid grid-cols-3 gap-4">
      {classListData &&
        classListData.map((classData) => {
          return <ClassCard key={classData.id} classData={classData} />;
        })}
    </div>
  );
};

export default ClassList;
