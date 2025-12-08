export type registerUserType = {
  email: string | null,
  name: string | null,
  password: string | null,
  password2: string | null,
}

export type registerType = {
  email: string,
  user: string,
  password: string,
}

export type loginType = {
  email: string,
  password: string,
}

export type userPublicData = {
    JWT: string,
    user: string,
    email: string | undefined
}