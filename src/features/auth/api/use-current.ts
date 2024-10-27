import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const useCurrent = () => {
    const query = useQuery({
        queryKey: ["current"],
        queryFn: async () => { 
            const response = await client.api.auth.current.$get();
            // we are not using axios library so we are not using try and catch method and also this fetching the data so it will not through error in catch method.
            if (!response.ok) {
                return null;
            }

            const { data } = await response.json();

            return data;
        },
    });

    return query;
};