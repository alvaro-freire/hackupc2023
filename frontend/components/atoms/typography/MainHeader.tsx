import Image from 'next/image';
import Link from 'next/link';

const MainHeader: React.FC = () => {
  return (
    <Link href="/">
      <div className="flex flex-col justify-center my-8">
        <div className="flex justify-center">
          <Image src="/Logo_Vueling.svg" height={50} width={200} alt="logo_vueling" />
        </div>
        <h2 className="text-center text-xl"> in flight entertainment </h2>
      </div>
    </Link>
  )
}

export default MainHeader;
