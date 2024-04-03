import { keepPreviousData, useQuery } from '@tanstack/react-query';
interface FetchTypes {
   url: Parameters<typeof fetch>[0];
   options?: Parameters<typeof fetch>[1];
   signal: AbortSignal;
}

interface FetchProps<T> {
   url: string;
   queryKey: T[];
}

export const useFetch = <T,>({ url, queryKey }: FetchProps<T>) => {
   const controller = new AbortController();
   const signal = controller.signal;

   const handleFetch = async ({ url, options, signal }: FetchTypes) => {
      const response = await fetch(url, { ...options, signal });
      const result = await response.json();

      if (!response.ok) {
         console.error('bad request');
         throw new Error(`Could not fetch source.`);
      }

      return result;
   };

   const { isPending, isError, error, data, isFetching, isPlaceholderData } =
      useQuery({
         queryKey: queryKey,
         queryFn: () => handleFetch({ url: url, signal }),
         placeholderData: keepPreviousData,
         refetchOnWindowFocus: false,
      });

   if (isError) console.error(error);
   return { isPending, isError, error, data, isFetching, isPlaceholderData };
};
