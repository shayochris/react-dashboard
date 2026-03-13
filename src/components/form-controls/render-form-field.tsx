import { DateField } from "#/components/form-controls/date-field";
import { SelectField } from "#/components/form-controls/select-field";
import TextField from "@/components/form-controls/text-field";
import type { FormField } from "@/components/form-controls/types";
import type { FieldValues } from "react-hook-form";

export const RenderFormField = <TFieldValues extends FieldValues = FieldValues>(
    props: FormField<TFieldValues>,
) => {
    switch (props.inputType) {
        case "text-field":
            return <TextField {...props} />;
        case "select-field":
            return <SelectField {...props} />;
        case "date-field":
            return <DateField {...props} />;
        default:
            return null;
    }
};

export const RenderFormFields = <TFieldValues extends FieldValues>({
    fields,
}: {
    fields: Array<FormField<TFieldValues>>;
}) => {
    return (
        <>
            {fields.map((field) => (
                <RenderFormField<TFieldValues> key={field.name} {...field} />
            ))}
        </>
    );
};
