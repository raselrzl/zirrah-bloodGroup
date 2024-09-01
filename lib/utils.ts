export const BASE_API_URL=process.env.NEXT_PUBLIC_BASE_API_URL

// sseUtils.ts
import { TextEncoder } from 'util';

let clients: ReadableStreamDefaultController<Uint8Array>[] = [];

export function addClient(controller: ReadableStreamDefaultController<Uint8Array>) {
  clients.push(controller);
}

export function removeClient(controller: ReadableStreamDefaultController<Uint8Array>) {
  clients = clients.filter(client => client !== controller);
  controller.close();
}

// Function to send SSE updates to all connected clients
export function sendSSEUpdate(data: any) {
  const textEncoder = new TextEncoder();
  const encodedData = textEncoder.encode(`data: ${JSON.stringify(data)}\n\n`);

  clients.forEach(controller => {
    controller.enqueue(encodedData);
  });
}
