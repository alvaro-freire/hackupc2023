import styles from '@/styles/SectionButton.module.css';

interface IProps{
    name: string;
}

const SectionButton: React.FC<IProps> = ({name}) => {
    return (
      <div className="w-full flex flex-col justify-center my-2">
        <div className={styles.sectionButtonUp}/>
        <div className="py-3  bg-[#fd0]">
            <h1 className="text-4xl text-center">{name}</h1>
        </div>
        <div className={styles.sectionButtonDown}/>
      </div>
    )
  }
  
  export default SectionButton;