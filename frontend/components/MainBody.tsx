import SectionButton from '@/components/buttons/MainButton'

const MainBody: React.FC = () => {
  return (
    <div className="flex flex-col justify-center my-8">
      {/*<SectionButton navigatePath='/chat' name='ChatRoulette' description='Talk to strangers!' />*/}
      <SectionButton navigatePath='/chat/10' name='ChatRoulette' description='Talk to strangers!' />
      <SectionButton navigatePath='/quiz' name='Quiz' description='Show your knowledge to win!' />
      <SectionButton navigatePath='/transport' name='Transport' description='Share a ride to your final destination.' />
      <SectionButton navigatePath='/destinations/bcl' name='Places' description='Learn about your destination.' />
    </div>
  )
}

export default MainBody;
