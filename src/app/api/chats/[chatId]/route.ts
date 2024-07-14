export async function PUT(request: Request,
    { params }: { params: { chatId: string } }
) {
    try {
        const req = await request.json();
        const raw = JSON.stringify(req);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_FQDN}/chats/${params.chatId}`, {
            method: "PUT",
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