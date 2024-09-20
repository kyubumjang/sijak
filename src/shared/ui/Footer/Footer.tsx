import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full h-96 bg-gray-50 px-20 py-5 text-gray-600 border-t pb-24">
      <div>
        <div className="flex mb-10 gap-2">
          {/* TODO: URL ENV 처리 필요한지 확인: 공유 페이지라 괜찮을 것 같지만 확인 필요 */}
          <Link
            href="https://ebony-specialist-cf1.notion.site/59f05d08d90346ad989223480f372c84?pvs=4"
            target="_blank"
          >
            개인정보처리방침 |
          </Link>
          <Link
            href="https://ebony-specialist-cf1.notion.site/a46bfe06464b4101927da295479d4576?pvs=4"
            target="_blank"
          >
            이용약관 |
          </Link>
          {/* TODO: 카카오톡 오픈채팅 연결 */}
          <Link href="" target="_blank">
            위치기반시스템이용약관 |
          </Link>
          <Link
            href="https://ebony-specialist-cf1.notion.site/15d15238629640f8a3ed6e1fc289eb86?pvs=4"
            target="_blank"
          >
            서비스가이드
          </Link>
        </div>
        <div>
          <h1 className="font-bold text-3xl mb-4">시ː작</h1>
        </div>
        <div className="flex flex-col gap-1 px-2">
          <div>팀 시작</div>
          <div>
            PM: 오수경, 이금희 | Designer: 송유정, 이지희 | Developer: 김용범,
            신유빈, 장규범
          </div>
          <div>제휴 이용문의 lawrence.jang.tree@gmail.com</div>
          <div>
            시작 팀은 통신판매중개자로서 통신판매의 당사자가 아닙니다. 이에
            상품이나 서비스 관련 거래의 의무와 책임은 각 판매자에 있습니다.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
