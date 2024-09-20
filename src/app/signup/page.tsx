import { Button, Input } from "@/shared/ui";

const SignUpPage = () => {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center p-4">
      <div className="flex flex-col gap-20">
        <div className="flex w-full flex-col justify-center items-center gap-2">
          <div className="text-gray-900 font-bold text-3xl">
            닉네임을 적어주세요!
          </div>
          <div className="text-gray-700 text-2xl">
            시ː작에서 사용할 닉네임을 적어주세요.
          </div>
          <div className="text-gray-700 text-2xl">
            닉네임은 나중에 수정할 수 있어요.
          </div>
        </div>
        <div className="w-[504px] h-[88px]">
          <Input
            placeholder="예) 도라지꽃"
            className="bg-[#E5E5E5] text-2xl text-center h-[88px]"
          />
        </div>
        <Button className="flex justify-center items-center h-[66px]">
          <div className="text-2xl text-center">시ː작 하기</div>
        </Button>
      </div>
    </div>
  );
};

export default SignUpPage;
