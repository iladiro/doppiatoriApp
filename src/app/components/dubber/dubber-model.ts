export class DubberModel {
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

  constructor(id, name, surname, phone: number, birthdate: number) {
    this.id = id;
    this.avatar = "";
    this.personalDate = {
      name: name,
      surname: surname,
      fiscalCode: "",
      birthdate: birthdate,
      birthplace: "",
      birthcounty: ""
    };
    this.contacts = {
      email: "",
      phone: phone
    }
  }
}
