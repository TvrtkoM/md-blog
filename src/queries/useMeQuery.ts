import { UserResponseSchema } from "@/zod-schemas/user";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

export default function useMeQuery() {
  const query = useQuery<z.infer<typeof UserResponseSchema>>({
    retry: false,
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axios.get("/api/user");
      return res.data;
    }
  });
  return query;
}
