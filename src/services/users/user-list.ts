import { useQuery } from "@tanstack/react-query";
import { createServerFn, useServerFn } from "@tanstack/react-start";
import { useEffect } from "react";
import { toast } from "sonner";

export interface User {
    id: number;
    fullName: string;
    email: string;
    gender: string;
    age: number;
    address: string;
}

export const userListService = createServerFn({ method: "GET" }).handler(
    async (): Promise<{ data: User[] }> => {
        await new Promise((resolve) => setTimeout(resolve, 3000));

        return {
            data: [
                {
                    id: 1,
                    fullName: "John Doe",
                    email: "john.doe@example.com",
                    gender: "male",
                    age: 25,
                    address: "123 Main St, Anytown, USA",
                },
                {
                    id: 2,
                    fullName: "Jane Doe",
                    email: "jane.doe@example.com",
                    gender: "female",
                    age: 26,
                    address: "456 Main St, Anytown, USA",
                },
            ],
        };
    },
);

export const useUserListService = () => {
    const userListServiceFn = useServerFn(userListService);

    const { data, isFetching, error } = useQuery({
        queryKey: ["users"],
        queryFn: userListServiceFn,
    });

    useEffect(() => {
        if (error) {
            toast.error(error.message);
        }
    }, [error?.message]);

    return {
        users: data?.data,
        isLoadingUsers: isFetching,
    };
};
