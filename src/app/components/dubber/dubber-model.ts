export class DubberModel {
  id: number;
  name: string;
  surname: string;
  photo: string;
  nationality: string;
  gender: string;
  age: number;

  constructor(id, name, surname, photo, nationality, gender, age:number) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.photo = photo;
    this.nationality = nationality;
    this.gender = gender;
    this.age = age;
  }
}
