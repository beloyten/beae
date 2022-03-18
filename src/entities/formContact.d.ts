import { Option } from "./option";
import { Field } from "./field";

export interface FormContact {
  children?: Array<Field>;
  options: {
    label: string;
    placeholder?: string;
    description: string;
    required: boolean;
    width: number;
    value?: string;
    options?: Array<Option>;
    listSelected?: Array<string>;
  };
  type: string;
  index: number;
}
