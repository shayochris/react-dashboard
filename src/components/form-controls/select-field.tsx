import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form.tsx";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Label } from "@/components/ui/label.tsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.tsx";
import { useEffect } from "react";
import z from "zod";
import { XIcon } from "lucide-react";

export const SelectOptionSchema = z.object({
    label: z.string(),
    value: z.string().or(z.number()),
});

export type SelectOption = z.infer<typeof SelectOptionSchema>;

export type SelectFieldProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
    control: Control<TFieldValues>;
    name: TName;
    label?: string;
    options: SelectOption[];
    placeholder?: string;
    defaultValue?: string | number;
    disabled?: boolean;
    clearable?: boolean;
    hidden?: boolean;
};

export const SelectField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    control,
    name,
    label,
    options,
    placeholder,
    defaultValue,
    disabled,
    clearable = true,
    hidden = false,
}: SelectFieldProps<TFieldValues, TName>) => {
    if (hidden) {
        return null;
    }

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                useEffect(() => {
                    if (defaultValue !== undefined && !field.value) {
                        const matchingOption = options.find(
                            (option) =>
                                option.value === defaultValue ||
                                option.value.toString() ===
                                    defaultValue.toString(),
                        );

                        if (matchingOption) {
                            field.onChange(matchingOption.value);
                        }
                    }
                }, [defaultValue, field.value, field.onChange, options]);

                return (
                    <FormItem>
                        <Label>{label}</Label>
                        <Select
                            key={field.value ?? "empty"}
                            onValueChange={field.onChange}
                            value={
                                field.value != null
                                    ? String(field.value)
                                    : undefined
                            }
                        >
                            <FormControl>
                                <div className="relative">
                                    <FormControl>
                                        <SelectTrigger
                                            className="w-full"
                                            disabled={disabled}
                                        >
                                            <SelectValue
                                                placeholder={placeholder}
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    {clearable && field.value && !disabled && (
                                        <button
                                            type="button"
                                            className="absolute right-8 top-1/2 -translate-y-1/2 rounded-sm p-0.5 text-muted-foreground hover:text-foreground"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                field.onChange(undefined);
                                            }}
                                        >
                                            <XIcon className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            </FormControl>
                            <SelectContent
                                position="popper"
                                className="max-h-80 overflow-auto"
                            >
                                {options?.map(({ label, value }, index) => (
                                    <SelectItem
                                        key={index}
                                        value={value.toString()}
                                    >
                                        {label}
                                    </SelectItem>
                                ))}
                                {(options?.length === 0 || !options) && (
                                    <div className="p-4 text-sm flex items-center justify-center text-gray-500">
                                        No options Available
                                    </div>
                                )}
                            </SelectContent>
                        </Select>
                        <FormMessage className={"text-xs relative bottom-1"} />
                    </FormItem>
                );
            }}
        />
    );
};
