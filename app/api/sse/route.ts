// app/api/sse/route.ts
import { addClient, removeClient } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const headers = new Headers();
  headers.set('Content-Type', 'text/event-stream');
  headers.set('Cache-Control', 'no-cache');
  headers.set('Connection', 'keep-alive');

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      // Keep the client connection alive
      addClient(controller);

      req.signal.addEventListener('abort', () => {
        removeClient(controller);
      });
    },
  });

  return new NextResponse(stream, { headers });
}
