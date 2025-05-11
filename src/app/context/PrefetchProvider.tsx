import { QueryClient, dehydrate } from "@tanstack/react-query";
import { AxiosRepository } from "@/api/axios/AxiosRepository";
import Hydration from "./Hydration";

const api = new AxiosRepository();

export default async function PrefetchProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["get-pokemons", "?limit=20&offset=0"],
    queryFn: async () => {
      const response = await api.Get("/pokemon", { limit: "20", offset: "0" });
      return response;
    },
  });

  const dehydratedState = dehydrate(queryClient);

  return <Hydration dehydratedState={dehydratedState}>{children}</Hydration>;
}
