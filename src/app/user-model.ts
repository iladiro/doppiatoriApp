export class UserModel {
  id: number;
  name: string;
  surname: string;
  photo: string;
  natianality: string;
  gender: string;
  age: number;

  constructor(id, name, surname) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.photo = "";
    this.natianality = "";
    this.gender = "";
    this.age = "";
  }
}
