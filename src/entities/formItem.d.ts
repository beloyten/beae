import { Option } from "./option";

export interface FormItem {
  liquidData: {
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
