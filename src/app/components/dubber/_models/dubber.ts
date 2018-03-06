export class Dubber {
  id: number;
  avatar: string;
  name: string;
  surname: string;
  fiscalCode: string;
  birthdate: number;
  birthplace: string;
  birthcounty: string;
  email: string;
  phone: number;
  residenceplace: string;
  residenceaddress: string;
  residencecountry: string;
  film: [
    {
      id:number;
      title:string;
    }
  ];
  invoices: [
    {
      id:number;
      movie:string;
    }
  ];
}

// export class Dubber {
//   id: number;
//   avatar: string;
//   personalData: {
//     name: string;
//     surname: string;
//     fiscalCode: string;
//     birthdate: number;
//     birthplace: string;
//     birthcounty: string;
//   };
//   contacts: {
//     email: string;
//     phone: number;
//   };
//   taxInfo: {
//     residenceplace: string;
//     residenceaddress: string;
//     residencecountry: string;
//   }
//   film: [
//     {
//       id:number;
//       title:string;
//     }
//   ];
//   invoices: [
//     {
//       id:number;
//       movie:string;
//     }
//   ];
//}
