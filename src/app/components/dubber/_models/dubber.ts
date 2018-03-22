export class Dubber {
  id: number;
  avatar: string;
  name: string;
  surname: string;
  gender: string;
  fiscal_code: string;
  birth_date: number;
  birth_place: string;
  birth_county: string;
  email: string;
  phone: number;
  residence_place: string;
  residence_address: string;
  residence_country: string;
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
