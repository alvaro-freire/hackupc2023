import SectionButton from '@/components/buttons/MainButton'

const MainBody: React.FC = () => {
    return (
      <div className="flex flex-col justify-center my-8">
        <SectionButton navigatePath='/chat-roulette' name='ChatRoulette' description='Talk to strangers!'/>
        <SectionButton navigatePath='/quiz' name='Quiz' description='Show your knowledge to win!'/>
        <SectionButton navigatePath='/transport' name='Transport' description='Learn about your destination.'/>
        <SectionButton navigatePath='/places' name='Places' description='Share a ride to your final destination.'/>
      </div>
    )
  }
  
  export default MainBody;