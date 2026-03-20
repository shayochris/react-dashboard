import type { DateFieldProps } from "#/components/form-controls/date-field";
import type { SelectFieldProps } from "#/components/form-controls/select-field";
import type { TextFieldProps } from "@/components/form-controls/text-field";
import type { FieldValues } from "react-hook-form";

/***
 * All fields supported in form fields generator
 */
export type FieldType = "text-field" | "select-field";

interface TextInputFieldProps<
    TFieldValues extends FieldValues = FieldValues,
> extends TextFieldProps<TFieldValues> {
    inputType: "text-field";
}

interface SelectInputFieldProps<
    TFieldValues extends FieldValues = FieldValues,
> extends SelectFieldProps<TFieldValues> {
    /** Discriminant that identifies this as a select field */
    inputType: "select-field";
}

interface DateInputFieldProps<
    TFieldValues extends FieldValues = FieldValues,
> extends DateFieldProps<TFieldValues> {
    /** Discriminant that identifies this as a date field */
    inputType: "date-field";
}

type FormFieldPropsMapping = {
    "text-field": TextInputFieldProps;
    "select-field": SelectInputFieldProps;
    "date-field": DateFieldProps;
};

export type FormFieldProps<T extends FieldType> = FormFieldPropsMapping[T];

export type FormField<TfieldValues extends FieldValues = FieldValues> =
    | TextInputFieldProps<TfieldValues>
    | SelectInputFieldProps<TfieldValues>
    | DateInputFieldProps<TfieldValues>;

export type BasicFormFieldProps = {
    disabled?: boolean;
    hidden?: boolean;
    label?: string;
    placeholder?: string;
};
