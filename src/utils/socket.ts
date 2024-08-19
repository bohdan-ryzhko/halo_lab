type SocketParams<T> = {
  endpoint: string;
  message?: string;
  onmessage: (event: MessageEvent<T>) => void;
  onerror: (error: Event) => void;
  onclose: (event: CloseEvent) => void;
};

export const socket = <T>(params: SocketParams<T>) => {
  const ws = new WebSocket(
    `wss://cave-drone-server.shtoa.xyz/${params.endpoint}`
  );

  ws.onopen = () => {
    params.message && ws.send(params.message);
  };

  ws.onmessage = params.onmessage;

  ws.onerror = params.onerror;

  ws.onclose = params.onclose;

  return ws;
};
