type ratingType = 1 | 2 | 3 | 4 | 5;

export interface IPointOfInterest {
  id: string;
  name: string;
  rating: ratingType;
  description: string;
  landingImage: string;
}

export interface IDestination {
  name: string;
  airportcode: string;
  pointsOfInterest: Array<IPointOfInterest>;
}
