export const BASE_URL = 'https://api.agent.zpoken.dev/api/v1';

export enum ApiRoutes {
  CHAT_SELECTED = '/chats/selected',
  STAT_MESSAGE = '/statistics/messages',
  STAT_SHILLING = '/statistics/shilling',
  // local API
  API_TWEET = '/api/tweet',
}

class ApiError extends Error {
  constructor(public response: Response) {
    super(`ApiError: ${response.status}`);
  }
}

export const jsonApiInstance = async <T>(
  url: string,
  init?: RequestInit & { json?: unknown },
  baseUrl?: string,
) => {
  let headers: RequestInit['headers'] = init?.headers ?? {};

  if (init?.json) {
    headers = {
      ['Content-Type']: 'application/json',
      // eslint-disable-next-line @typescript-eslint/no-misused-spread -- // TODO fix it
      ...headers,
    };

    init.body = JSON.stringify(init.json);
  }

  const result = await fetch(`${baseUrl ?? BASE_URL}${url}`, {
    ...init,
    headers,
  });

  if (!result.ok) {
    throw new ApiError(result);
  }

  const data = (await result.json()) as Promise<T>;

  return data;
};
