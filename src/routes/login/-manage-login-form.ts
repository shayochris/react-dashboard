import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import type { FormField } from "#/components/form-controls/types";

const LoginFormSchema = z.object({
    username: z.string().min(1, { message: "Username is required" }),
    branch: z.string({ message: "Branch is required" }),
    birthday: z.string({ message: "birthday is required" }),
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
            type: "text",
            inputType: "text-field",
            control,
        },
        {
            control,
            name: "branch",
            label: "Branch",
            placeholder: "Enter your branch",
            inputType: "select-field",
            options: [
                {
                    label: "Branch 1",
                    value: "branch1",
                },
                {
                    label: "Branch 2",
                    value: "branch2",
                },
            ],
        },
        {
            control,
            label: "Birth Day",
            name: "birthday",
            placeholder: "Enter your birthday",
            inputType: "date-field",
        },
    ];

    return {
        fields,
        form,
    };
};
