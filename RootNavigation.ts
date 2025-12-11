import { createRef } from "react";

export const navigationRef = createRef<any>();


export function navigates(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}