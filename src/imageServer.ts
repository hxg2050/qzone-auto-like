export const imageServer = (url: string) => {
    const server = Bun.serve({
        port: '8080',
        fetch(req) {
            return new Response(`<img src="${url}" />`, {
                headers: {
                    "Content-Type": "text/html",
                }
            });
        },
    });

    console.log('http://127.0.0.1:8080');
    return () => {
        console.log('close imageServer');
        server.stop();
    }
}