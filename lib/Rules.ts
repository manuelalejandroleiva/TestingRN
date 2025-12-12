import { FieldRule } from "./Forms";

export const required: FieldRule<any> = {
    errorMessage: "Este campo es requerido",
    rule: (input) => String(input).trim() !== "",
  };


  export const isPositive: FieldRule<string> = {
    errorMessage: "El número debe ser positivo",
    rule: (input) => {
      const n = Number(input);
      return !isNaN(n) && n > 0;
    },
  };