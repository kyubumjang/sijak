import { Class } from "@/entities/class/model/class";
import { Divider } from "@/shared/ui";
import { HeartIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

interface ClassCardProps {
  classData: Class;
}

const ClassCard = (props: ClassCardProps) => {
  const { classData } = props;
  const {
    id,
    thumbnail,
    name,
    description,
    price,
    day_of_week,
    time,
    capacity,
    link,
    location,
    target,
    status,
    like,
    location_detail,
    hosted_by,
  } = classData;

  return (
    <div className="flex flex-col">
      <Link href={`/class/${id}`}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-3">
            <div className="rounded-lg overflow-hidden">
              <Image
                src={thumbnail}
                alt="thumbnail"
                width={384}
                height={179}
                className="w-auto h-auto"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="text-gray-950 text-md">{location}</div>
              <div className="flex justify-between items-center">
                <div className="font-bold text-gray-950 text-lg">
                  [{hosted_by}]
                </div>
                <HeartIcon
                  className="text-gray-600 text-sm"
                  width={32}
                  height={32}
                />
              </div>
            </div>
          </div>
          <Divider />
          <div className="flex justify-start  h-12 break-words  text-ellipsis overflow-hidden line-clamp-2">
            {target}
          </div>
        </div>
        <div className="flex justify-end">
          {time.split(" ")[0].replaceAll("-", ".")}
        </div>
      </Link>
    </div>
  );
};

export default ClassCard;
