import { NytList } from './NytList.interface';

export interface NytOverview {
  status: string;
  copyright: string;
  num_results: number;
  results: {
    bestsellers_date: string;
    previous_published_date: string;
    published_date: string;
    next_published_date: string;
    lists: NytList[];
  };
}
