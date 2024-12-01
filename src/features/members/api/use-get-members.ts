import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

interface useGetMembersProps {
    workspaceId: string;
}

export const useGetMembers = ({ workspaceId, }: useGetMembersProps) => {
    const query = useQuery({
        queryKey: ["members", workspaceId],
        queryFn: async () => { 
            const response = await client.api.members.$get({ query: { workspaceId }});
            // we are not using axios library so we are not using try and catch method and also this fetching the data so it will not through error in catch method.
            if (!response.ok) {
                throw new Error("Failed to get members");
            }

            const { data } = await response.json();

            return data;
        },
    });

    return query;
};