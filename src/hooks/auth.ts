import { useAuth } from "@clerk/nextjs";
import { Divide } from "lucide-react";
import { useEffect, useState } from "react";

export const useAuthRequest = (path: string) => {
  const { getToken } = useAuth();

  const [data, setData] = useState([]);

  async function getFetchData() {
    const token = await getToken();
  }

  const onPost = async (postPath: string, body: any) => {
    const token = await getToken();
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${path}`, {
      method: "POST",
      headers: {
        authentication: token,
      } as HeadersInit,
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  };

  useEffect(() => {
    getFetchData();
  }, []);

  return data;
};
