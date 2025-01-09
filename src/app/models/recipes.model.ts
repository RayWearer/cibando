export interface Recipe {
  _id: number;  //Con l'underscore perché utilizzeremo un DB non-relazionale MondoDB, che per convenzione indica così gli id
  title: string;
  description: string;
  image: string;
  difficulty: number;
  date: string;
  published: boolean;
  //note? string;        Esempio di campo opzionale
}