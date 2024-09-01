import { NextRequest, NextResponse } from 'next/server';

let clients: ReadableStreamDefaultController<Uint8Array>[] = [];

export async function GET(req: NextRequest) {
  const headers = new Headers();
  headers.set('Content-Type', 'text/event-stream');
  headers.set('Cache-Control', 'no-cache');
  headers.set('Connection', 'keep-alive');

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      // Keep the client connection alive
      clients.push(controller);

      req.signal.addEventListener('abort', () => {
        clients = clients.filter(client => client !== controller);
        controller.close();
      });
    },
  });

  return new NextResponse(stream, { headers });
}

// Function to send SSE updates to all connected clients
export function sendSSEUpdate(data: any) {
  const textEncoder = new TextEncoder();
  const encodedData = textEncoder.encode(`data: ${JSON.stringify(data)}\n\n`);

  clients.forEach(controller => {
    controller.enqueue(encodedData);
  });
}
