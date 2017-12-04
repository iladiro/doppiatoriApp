export class UserModel {
  id: number;
  name: string;
  surname: string;
  photo: string;
  nationality: string;
  gender: string;
  age: number;

  constructor(id, name, surname, age:number) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.photo = "";
    this.nationality = "";
    this.gender = "";
    this.age = age;
  }
}
