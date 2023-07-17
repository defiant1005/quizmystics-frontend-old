export interface ICategories {
  id: number;
  title: string;
}

export interface ISetCategoryData {
  title: string;
}

export interface IUser {
  email: string;
  id: number;
}

export interface ISetUsersData {
  email: string;
  password: string;
  roleId: number;
}

export interface IEditUsersData {
  email: string;
  roleId: number;
}

export interface IRoles {
  role: string;
  id: number;
}

export interface ISetRoles {
  role: string;
}

export interface ISetQuestion {
  categoryId: number;
  title: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  correct_answer: string;
}
