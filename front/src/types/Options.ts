import { FormRule } from "antd";

interface Option {
    name: string;
    placeholder: string;
    label: string;
    rules?: FormRule[];
}

export type Options<T> = Record<keyof T, Option>;
