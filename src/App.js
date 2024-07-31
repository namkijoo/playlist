import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Playlist from "./components/Main/Playlist";
import Layout from "./style/Layout";
import Login from "./pages/Login";
import Album from "./pages/Album";

const theme = {
  colors: {
    primary: "#0070f3",
    secondary: "#1a1a1a",
  },
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Playlist />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/album",
        element: <Album />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <GoogleOAuthProvider clientId="545549962599-oul3hgvjdbqq1edtbiqp5ho4uohtad93.apps.googleusercontent.com">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
