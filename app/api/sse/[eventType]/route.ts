// app/api/sse/[eventType]/route.ts
import { addClient, removeClient, sendSSEUpdate } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { eventType: string } }) {
  const { eventType } = params;

  const headers = new Headers();
  headers.set('Content-Type', 'text/event-stream');
  headers.set('Cache-Control', 'no-cache');
  headers.set('Connection', 'keep-alive');

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      addClient(controller);

      req.signal.addEventListener('abort', () => {
        removeClient(controller);
        controller.close();
      });

      // Send updates based on event type
      const intervalId = setInterval(() => {
        let message;
        switch (eventType) {
          case 'updates':
            message = { message: `Update at ${new Date().toISOString()}` };
            break;
          case 'notifications':
            message = { message: `Notification at ${new Date().toISOString()}` };
            break;
          default:
            message = { message: `Unknown event type: ${eventType}` };
        }
        sendSSEUpdate(message);
      }, 1000); // Adjust the interval as needed

      req.signal.addEventListener('abort', () => {
        clearInterval(intervalId);
        removeClient(controller);
        controller.close();
      });
    },
  });

  return new NextResponse(stream, { headers });
}
