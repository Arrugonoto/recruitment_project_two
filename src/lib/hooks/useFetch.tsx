import { keepPreviousData, useQuery } from '@tanstack/react-query';
interface FetchTypes {
   url: Parameters<typeof fetch>[0];
   options?: Parameters<typeof fetch>[1];
}

interface FetchProps<T> {
   url: string;
   queryKey: T[];
}

export const useFetch = <T,>({ url, queryKey }: FetchProps<T>) => {
   const handleFetch = async ({ url, options }: FetchTypes) => {
      const response = await fetch(url, options);
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
         queryFn: () => handleFetch({ url: url }),
         placeholderData: keepPreviousData,
         refetchOnWindowFocus: false,
      });

   return { isPending, isError, error, data, isFetching, isPlaceholderData };
};
