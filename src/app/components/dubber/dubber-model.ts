export class DubberModel {
  id: number;
  avatar: string;
  name: string;
  surname: string;
  nationality: string;
  gender: string;
  age: number;

  constructor(id, name, surname, age:number) {
    this.id = id;
    this.avatar = "";
    this.name = name;
    this.surname = surname;
    this.nationality = "";
    this.gender = "";
    this.age = age;
  }
}
