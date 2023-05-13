import { IDestination } from '@/types/destination.types';

export const mockSingleDestination: IDestination = {
  name: 'Barcelona',
  airportcode: 'bcn',
  pointsOfInterest: [
    {
      id: '1',
      name: 'La sagrada familia',
      rating: 4,
      description: 'The Basílica i Temple Expiatori de la Sagrada Família, shortened as the Sagrada Família, is an unfinished church in the Eixample district of Barcelona, Catalonia, Spain.',
      landingImage: '/destinationImages/bcn/SagradaFamilia1.jpg'
    },
    {
      id: '2',
      name: 'Something something',
      rating: 4,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis saepe obcaecati deserunt sunt, voluptatibus voluptate debitis eos iusto quos praesentium rerum mollitia impedit provident possimus.',
      landingImage: '/destinationImages/bcn/barrioGotico1.jpg'
    }
  ]
}
export const mockDestinations: Array<IDestination> = [mockSingleDestination];
