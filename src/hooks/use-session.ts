import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export const useSession = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const response = await axios.get("/api/auth/session");
      if (!response) return null;
      return response.data;
    },
  });
  return { data, isLoading };
};
