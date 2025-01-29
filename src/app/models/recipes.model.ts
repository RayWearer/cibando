export interface Recipe {
  _id: string;  //Con l'underscore perché utilizzeremo un DB non-relazionale MangoDB, che per convenzione indica così gli id
  title: string;
  description: string;
  image: string;
  published?: boolean;
  difficulty: number;
  createdAt?: string;
  updatedAt?: string;
  //note? string; Esempio di campo opzionale
}
