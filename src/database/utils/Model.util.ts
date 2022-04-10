import { CustomRequiredFields } from '../services/document.service';

export type Model<D> = Omit<D, keyof CustomRequiredFields>;
