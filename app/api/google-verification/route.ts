import { NextResponse } from 'next/server';

export async function GET() {
  return new NextResponse('google-site-verification: google7e64177092e9a42d.html', {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}
