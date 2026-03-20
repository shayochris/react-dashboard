import { RenderFormFields } from "#/components/form-controls/render-form-field";
import { Button } from "#/components/ui/button";
import { Form } from "#/components/ui/form";
import {
    useManageLoginForm,
    type LoginFormType,
} from "#/routes/login/-manage-login-form";
import { useLoginService } from "#/services/auth/login";
import { createFileRoute } from "@tanstack/react-router";
import type { SubmitHandler } from "react-hook-form";

export const Route = createFileRoute("/login/")({
    component: RouteComponent,
});

function RouteComponent() {
    const { loginUser, isLoggingIn } = useLoginService();
    const { form, fields } = useManageLoginForm();

    const onSubmit: SubmitHandler<LoginFormType> = async (values) => {
        loginUser({ data: values });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="max-w-96 mx-auto"
            >
                <RenderFormFields fields={fields} />
                <Button
                    type="submit"
                    loading={isLoggingIn}
                    loadingText="Logging in..."
                >
                    Submit
                </Button>
            </form>
        </Form>
    );
}
