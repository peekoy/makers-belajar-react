import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { CartProvider } from './contexts/cartContext.jsx';
import ErrorBoundary from './components/Fragments/ErrorBoundary.jsx';

const LoginPage = lazy(() => import('./pages/login.jsx'));
const RegisterPage = lazy(() => import('./pages/register.jsx'));
const ProductsPage = lazy(() => import('./pages/products.jsx'));
const ErrorPage = lazy(() => import('./pages/404.jsx'));
const DetailProductPage = lazy(() => import('./pages/detailProduct.jsx'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/login' replace />,
    errorElement: <Navigate to='/404' replace />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/products',
    element: (
      <ErrorBoundary>
        <ProductsPage />
      </ErrorBoundary>
    ),
  },
  {
    path: '/404',
    element: <ErrorPage />,
  },
  {
    path: '/product/:id',
    element: <DetailProductPage />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <Suspense
          fallback={
            <div className='flex justify-center items-center h-dvh '>
              <p className='text-xl text-center'>
                Loading page... <br /> Please wait a moment.
              </p>
            </div>
          }
        >
          <RouterProvider router={router} />
        </Suspense>
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
