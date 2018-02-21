export class Dubber {
  id: number;
  avatar: string;
  personalDate: {
    name: string;
    surname: string;
    fiscalCode: string;
    birthdate: number;
    birthplace: string;
    birthcounty: string;
  };
  contacts: {
    email: string;
    phone: number;
  };
}
