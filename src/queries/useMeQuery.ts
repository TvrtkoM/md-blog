import { UserResponseData } from "@/zod-schemas/user";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useMeQuery() {
  const query = useQuery<UserResponseData>({
    retry: false,
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axios.get("/api/user");
      return res.data;
    }
  });
  return query;
}
