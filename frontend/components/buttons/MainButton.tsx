import styles from '@/styles/SectionButton.module.css';
import Link from 'next/link';

interface IProps{
    name: string;
    description: string;
    navigatePath: string;
}

const SectionButton: React.FC<IProps> = ({name, description, navigatePath}) => {
    return (
      <div className="w-full flex flex-col justify-center">
        <div className={styles.sectionButtonUp}/>
          <Link href={navigatePath}>
            <div className="flex flex-col py-3  bg-[#fd0]">
                <h1 className="text-3xl text-center text-[#4d4d4d]">{name}</h1>
                <h2 className="text-center text-m">{description}</h2>
            </div>
          </Link>
        <div className={styles.sectionButtonDown}/>
      </div>
    )
  }
  
  export default SectionButton;