import { RenderFormFields } from "#/components/form-controls/render-form-field";
import { Button } from "#/components/ui/button";
import { Form } from "#/components/ui/form";
import {
    useManageLoginForm,
    type LoginFormType,
} from "#/routes/login/-manage-login-form";
import { createFileRoute } from "@tanstack/react-router";
import type { SubmitHandler } from "react-hook-form";

export const Route = createFileRoute("/login/")({
    component: RouteComponent,
});

function RouteComponent() {
    const { form, fields } = useManageLoginForm();

    const onSubmit: SubmitHandler<LoginFormType> = (values) => {
        console.log(values);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <RenderFormFields fields={fields} />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
