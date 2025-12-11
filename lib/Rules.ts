import { FieldRule } from "./Forms";




export const required: FieldRule<any> = {
    errorMessage: "Este campo es requerido",
    rule: (input) => Boolean(input),
  };