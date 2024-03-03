
export interface BaseUser {
  firstName: string,
  lastName: string,
  email: string,
}

export interface RegisterValues extends BaseUser {
  password: string,
  confirmPassword: string,
}

export interface User extends BaseUser {
  role: string,
}