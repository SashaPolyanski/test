import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

function setCorsHeaders(res: NextResponse) {
    res.headers.set('Access-Control-Allow-Origin', 'https://test2-ihah.vercel.app'); // фронтенд
    res.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    return res;
}

export async function POST(req: NextRequest) {
    try {
        revalidatePath('/');

        const res = NextResponse.json({ revalidated: true });
        return setCorsHeaders(res);
    } catch (err: any) {
        const res = NextResponse.json(
            { message: 'Error revalidating', error: err.message || String(err) },
            { status: 500 }
        );
        return setCorsHeaders(res);
    }
}

export async function OPTIONS() {
    const res = new NextResponse(null, { status: 204 }); // пустой ответ для preflight
    return setCorsHeaders(res);
}
