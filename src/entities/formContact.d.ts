import { Option } from "./option";

export interface FormContact {
  label: string;
  placeholder?: string;
  description: string;
  required: boolean;
  width: number;
  type: string;
  value?: string;
  options?: Array<Option>;
  listSelected?: Array<string>;
}
