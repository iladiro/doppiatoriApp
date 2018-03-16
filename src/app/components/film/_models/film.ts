export class Film {
  id: number;
  title: string;
  description: string;
  cover: string;
  dubbers: [
    {
      id:number;
      name:string;
    }
  ];
}
