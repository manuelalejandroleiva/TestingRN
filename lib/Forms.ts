import React, { useState, useRef } from "react";

export interface FieldControlType<S> {
  value: S;
  error: string;
  handleInputValue: (input: S) => void;
  resetField: () => void;
  valid: boolean;
  invalid: boolean;
}

export function useFieldControl<S>(
  initial: S,
  rules: FieldRule<S>[] = []
): FieldControlType<S> {
  const [value, setValue] = useState(initial);

  const _rules: FieldRule<S>[] = rules;

  const invalidRule = _rules.find((e) => !e.rule(value));

  const [error, setError] = useState("");

  const [valid, setValid] = useState(invalidRule == undefined);

  const invalid = !valid;

  const validate = async (input: S = value) => {
    let invalidRule: FieldRule<S> | undefined;
    for (const r of rules) {
      const ruleResult = await r.rule(input);
      if (!ruleResult) {
        invalidRule = r;
        break;
      }
    }
    setError(invalidRule?.errorMessage || "");
    setValid(invalidRule == undefined);
  };

  const handleInputValue = (input: S) => {
    validate(input);
    setValue(input);
  };

  const resetField = () => {
    setValue(initial);
    setError("");

    setValid(invalid == undefined);
  };

  return {
    value,
    error,
    handleInputValue,
    resetField,
    valid,
    invalid,
  };
}

export type FieldRule<T = any> = {
  errorMessage: string;

  rule: (input: T, ...options: any) => Boolean;
};