import { LoginFormSchema } from "#/routes/login/-manage-login-form";
import { lsKeys, lStorage } from "#/utils/local-storage";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { createServerFn, useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";

export const loginService = createServerFn({ method: "POST" })
    .inputValidator(LoginFormSchema)
    .handler(async ({ data }) => {
        await new Promise((resolve) => setTimeout(resolve, 3000));

        if (data.username !== "admin" || data.password !== "admin") {
            throw new Error("Invalid credentials");
        }

        return {
            accesssToken: "access-token",
            refreshToken: "refreshToken",
        };
    });

export const useLoginService = () => {
    const navigate = useNavigate();
    const loginServiceFn = useServerFn(loginService);

    const { mutate: loginUser, isPending: isLoggingIn } = useMutation({
        mutationFn: loginServiceFn,
        onSuccess: (data) => {
            lStorage.setMany({
                [lsKeys.TOKENS.ACCESS]: data.accesssToken,
                [lsKeys.TOKENS.REFRESH]: data.refreshToken,
            });
            return navigate({ to: "/" });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return {
        loginUser,
        isLoggingIn,
    };
};
