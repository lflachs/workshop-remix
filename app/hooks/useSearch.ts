import { useState } from "react";

export const useSearch = () =>{
    const [search, setSearch] = useStates("");
    const onSearch = (string: string) => {
      setSearch(string);
    };
    return {search, onSearch};
}