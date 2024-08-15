import { MaestroProvider } from "@meshsdk/core";

export const blockchainProvider = new MaestroProvider({
    network: 'Preview', // Mainnet / Preprod / Preview
    apiKey: process.env.NEXT_PUBLIC_MAESTRO_API_KEY as string, // Get key at https://docs.gomaestro.org/
    turboSubmit: false // Read about paid turbo transaction submission feature at https://docs.gomaestro.org
});

