import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import type { FormField } from "#/components/form-controls/types";

export const LoginFormSchema = z.object({
    username: z.string().min(1, { message: "Username is required" }),
    password: z.string().min(1, { message: "Password is required" }),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;

export const useManageLoginForm = () => {
    const form = useForm<LoginFormType>({
        resolver: zodResolver(LoginFormSchema),
    });

    const { control } = form;

    const fields: FormField<LoginFormType>[] = [
        {
            name: "username",
            label: "Username",
            placeholder: "Enter your username",
            inputType: "text-field",
            control,
        },
        {
            control,
            name: "password",
            label: "Password",
            placeholder: "Enter your password",
            inputType: "text-field",
            type: "password",
        },
    ];

    return {
        fields,
        form,
    };
};
