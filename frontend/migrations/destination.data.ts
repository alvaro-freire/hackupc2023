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
      name: 'Barrio Gótico',
      rating: 4,
      description: 'The Gothic Quarter is the centre of the old city of Barcelona. It stretches from La Rambla to Via Laietana, and from the Mediterranean seafront to Ronda de Sant Pere. It is a part of Ciutat Vella district.',
      landingImage: '/destinationImages/bcn/barrioGotico1.jpg'
    }
  ]
}
export const mockDestinations: Array<IDestination> = [mockSingleDestination];
