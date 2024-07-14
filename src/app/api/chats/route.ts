export async function POST(request: Request) {
    try {
        const req = await request.json();
        const raw = JSON.stringify(req);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_FQDN}/chats`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: raw
        });
        const json = await res.json();
        return Response.json(json)
    } catch (e) {
        return Response.error();
    }
}