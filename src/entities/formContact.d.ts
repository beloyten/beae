
import { FormItem } from "./formItem";
import { Button } from "./button";

export interface FormContact {
  items: Array<FormItem>;
  buttons: Array<Button>;
  type: string;
  index: number;
}
