import type { NextPage } from "next";
import * as React from "react";
import { QueryClient, QueryClientProvider, QueryCache } from "react-query";
import { ChakraProvider, Box, Heading } from "@chakra-ui/react";
import { Toaster, toast } from "react-hot-toast";
import theme from "../theme";
import { Provider as WagmiProvider } from "wagmi";
import { providers } from "ethers";
import Comments from "../components/Comments";
import Head from "next/head";

// Provider that will be used when no wallet is connected (aka no signer)
const provider = providers.getDefaultProvider(
  "https://rpc-mumbai.maticvigil.com"
);

// Create a react-query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: () => {
      toast.error(
        "Network Error: Ensure MetaMask is connected to the same network that your contract is deployed to."
      );
    },
  }),
});

const App: NextPage = () => {
  return (
    <WagmiProvider autoConnect provider={provider}>
      <Head>
        <title>Comments with polygon</title>
      </Head>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Box p={8} maxW="600px" minW="320px" m="0 auto">
            <strong style={{ marginBottom: "10px", fontSize: '48px' }}>TOPIC : my blog post</strong>
            <Comments topic="my-blog-post" />
            <Toaster position="bottom-right" />
          </Box>
        </QueryClientProvider>
      </ChakraProvider>
    </WagmiProvider>
  );
};

export default App;
