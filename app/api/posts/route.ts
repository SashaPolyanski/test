import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
    try {
        revalidatePath('/');
        return NextResponse.json({ revalidated: true });
    } catch (err: any) {
        return NextResponse.json(
            { message: 'Error revalidating', error: err.message || String(err) },
            { status: 500 }
        );
    }
}

export async function OPTIONS() {
    return new NextResponse(null, { status: 204 });
}
