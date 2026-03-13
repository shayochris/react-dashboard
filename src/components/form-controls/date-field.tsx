import { Button } from "@/components/ui/button";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

export interface DateFieldProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
    control: Control<TFieldValues>;
    name: TName;
    label?: string;
    placeholder?: string;
    description?: string;
    hidden?: boolean;
    containerClassName?: string;
    disabled?: boolean;
    minDate?: Date;
    maxDate?: Date;
}

export const DateField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    control,
    name,
    label,
    placeholder,
    description,
    hidden = false,
    containerClassName,
    disabled = false,
    minDate,
    maxDate,
}: DateFieldProps<TFieldValues, TName>) => {
    if (hidden) return null;

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn("relative", containerClassName)}>
                    {label && <Label>{label}</Label>}

                    <div className="relative">
                        <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "pl-3 text-left font-normal w-full",
                                            !field.value &&
                                                "text-muted-foreground",
                                        )}
                                        disabled={disabled}
                                    >
                                        {field.value ? (
                                            format(field.value, "PPP")
                                        ) : (
                                            <span>
                                                {placeholder ?? "Pick a date"}
                                            </span>
                                        )}
                                        <CalendarIcon className="ml-auto opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto p-0 "
                                align="start"
                            >
                                <Calendar
                                    captionLayout="dropdown"
                                    mode="single"
                                    selected={field.value}
                                    onSelect={(date) => {
                                        field.onChange(
                                            date
                                                ? format(date, "yyyy-MM-dd")
                                                : undefined,
                                        );
                                    }}
                                    defaultMonth={new Date()}
                                    styles={{
                                        dropdown: {
                                            maxHeight: "20rem",
                                            overflowY: "auto",
                                        },
                                    }}
                                    disabled={[
                                        ...(minDate
                                            ? [{ before: minDate }]
                                            : []),
                                        ...(maxDate
                                            ? [{ after: maxDate }]
                                            : []),
                                    ]}
                                    startMonth={minDate}
                                    endMonth={maxDate ?? new Date(2100, 11)}
                                />
                            </PopoverContent>
                        </Popover>
                        <FormDescription>{description}</FormDescription>
                        <FormMessage className="text-xs top-1" />
                    </div>
                </FormItem>
            )}
        ></FormField>
    );
};
