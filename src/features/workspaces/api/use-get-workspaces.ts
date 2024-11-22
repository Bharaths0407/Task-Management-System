import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const useGetWorkspaces = () => {
    const query = useQuery({
        queryKey: ["workspaces"],
        queryFn: async () => { 
            const response = await client.api.workspaces.$get();
            // we are not using axios library so we are not using try and catch method and also this fetching the data so it will not through error in catch method.
            if (!response.ok) {
                throw new Error("Failed to get workspaces")
            }

            const { data } = await response.json();

            return data;
        },
    });

    return query;
};