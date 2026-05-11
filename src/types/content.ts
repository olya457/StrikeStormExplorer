import type {ImageSourcePropType} from 'react-native';

export type LocationCategory = 'Historic rods' | 'Storm zones' | 'Mega structures';

export type LocationItem = {
  id: string;
  title: string;
  city: string;
  rating: number;
  height: string;
  yearLabel: string;
  year: string;
  strikes: string;
  description: string;
  facts: string[];
  image: ImageSourcePropType;
  category: LocationCategory;
  coordinate: {
    latitude: number;
    longitude: number;
  };
};

export type FactSection = {
  title: string;
  accent: string;
  facts: string[];
};

export type BlogCategory = 'Travel' | 'History' | 'Engineering' | 'Science';

export type BlogPost = {
  id: string;
  category: BlogCategory;
  title: string;
  story: string;
  readingTime: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
};
