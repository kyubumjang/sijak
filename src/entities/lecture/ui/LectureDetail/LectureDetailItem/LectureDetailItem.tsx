export interface LectureDetailItemProps {
  title: string;
  content?: string;
}

const LectureDetailItem = ({ title, content }: LectureDetailItemProps) => {
  return (
    <div className="flex flex-row gap-9">
      <div className="flex desktop:min-w-[72px] tablet:min-w-[62px] mobile:min-w-[60px] desktop:max-w-[72px] tablet:max-w-[62px] mobile:max-w-[60px] desktop:text-xl tablet:text-base text-custom-textTitleGrayColor break-keep">
        {title}
      </div>
      {content && (
        <div className="flex desktop:text-xl tablet:text-base">{content}</div>
      )}
    </div>
  );
};

export default LectureDetailItem;
