export class DubberModel {
  id: number;
  avatar: string;
  name: string;
  surname: string;
  nationality: string;
  gender: string;
  age: number;
  contacts: {
    email: string;
    phone: number;
  };

  constructor(id, name, surname, age:number, phone: number) {
    this.id = id;
    this.avatar = "";
    this.name = name;
    this.surname = surname;
    this.nationality = "";
    this.gender = "";
    this.age = age;
    this.contacts = {
      email: "",
      phone: phone  
    }
  }
}
