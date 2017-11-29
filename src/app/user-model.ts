export class UserModel {
  id: number;
  name: string;
  surname: string;

  constructor(id, name, surname) {
    this.id = id;
    this.name = name;
    this.surname = surname;
  }
}
