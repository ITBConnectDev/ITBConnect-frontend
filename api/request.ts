export default async function request<T = any>(
  url: string,
  method?: string,
  body?: any,
  headers?: any
): Promise<T> {
  return await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + url, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  }).then(async (res) => {
    const data = await res.json();
    if (res.ok) return data?.data;
    throw new APIError(res.status, data?.error);
  });
}

export class APIError<T> {
  constructor(public status: number, public data: T) {}
}
