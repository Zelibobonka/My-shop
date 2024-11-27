import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import GlobalStyles from "./styles/GlobalStyles";
import PageHome from "./pages/PageHome";
import PageCategories from "./pages/PageCategories";
import PageCreateCategory from "./pages/PageCreateCategory";
import PageCreateProduct from "./pages/PageCreateProduct";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import PageProduct from "./pages/PageProduct";
import PageCategory from "./pages/PageCategory";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      <GlobalStyles />

      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="home" />} />
            <Route path="/home" element={<PageHome />} />
            <Route path="/categories" element={<PageCategories />} />
            <Route path="/create-category" element={<PageCreateCategory />} />
            <Route path="/create-product" element={<PageCreateProduct />} />
            <Route path="product/:id" element={<PageProduct />} />
            <Route path="categories/:category" element={<PageCategory />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
