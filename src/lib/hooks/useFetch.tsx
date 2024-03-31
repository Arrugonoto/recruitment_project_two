interface FetchTypes {
   url: Parameters<typeof fetch>[0];
   options?: Parameters<typeof fetch>[1];
}

export const useFetch = () => {
   const handleFetch = async ({ url, options }: FetchTypes) => {
      const response = await fetch(url, options);
      const result = await response.json();

      if (!response.ok) {
         console.error('bad request');
         throw new Error(`Could not fetch source.`);
      }

      return result;
   };

   return { handleFetch };
};
