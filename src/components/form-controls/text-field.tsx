import { type ComponentProps, type ElementType } from "react";

import type { Control, FieldPath, FieldValues } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { cn } from "@/lib/utils";

export type TextFieldProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
    control: Control<TFieldValues>;
    name: TName;
    label?: string;
    placeholder?: string;
    description?: string;
    requiredDecorator?: boolean;
    className?: string;
    type?: string;
    hidden?: boolean;
    startIcon?: ElementType;
    endIcon?: ElementType;
    containerClassName?: string;
} & Omit<ComponentProps<"input">, "name">;

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const TextField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    control,
    name,
    label,
    placeholder,
    description,
    requiredDecorator = false,
    className,
    type = "text",
    hidden = false,
    startIcon,
    endIcon,
    containerClassName,
    ...inputProps
}: TextFieldProps<TFieldValues, TName>) => {
    const [showPassword, setShowPassword] = useState(false);

    if (hidden) return null;

    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    const StartIcon = startIcon;
    const EndIcon = endIcon;

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={containerClassName}>
                    {label && (
                        <Label>
                            {label}
                            {requiredDecorator && (
                                <span className="text-destructive ml-1">*</span>
                            )}
                        </Label>
                    )}
                    <div className={"relative"}>
                        {StartIcon && (
                            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                <StartIcon className="h-4 w-4" />
                            </span>
                        )}
                        <FormControl>
                            <Input
                                type={inputType}
                                placeholder={placeholder}
                                className={cn(
                                    className,
                                    StartIcon && "pl-9",
                                    (EndIcon || isPassword) && "pr-9",
                                )}
                                {...field}
                                {...inputProps}
                            />
                        </FormControl>
                        {isPassword && !EndIcon ? (
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                onClick={() => setShowPassword((prev) => !prev)}
                                tabIndex={-1}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        ) : EndIcon ? (
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                <EndIcon className="h-4 w-4" />
                            </span>
                        ) : null}
                    </div>
                    <FormMessage className="text-xs relative bottom-1" />
                </FormItem>
            )}
        />
    );
};

export default TextField;
