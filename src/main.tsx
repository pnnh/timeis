import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {createBrowserRouter} from "react-router";
import {RouterProvider} from "react-router/dom";
import {NotFoundPage} from "@/pages/notFound.tsx"; 
import DatetimePage from './pages/datetime/page';

let router = createBrowserRouter([
    {
        path: "/",
        Component: DatetimePage,
    },
    {
        path: '/:lang',
        Component: DatetimePage,
    }, 
    {
        path: '*',
        Component: NotFoundPage,
    }
]);

const root = document.getElementById('root')

createRoot(root!).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>
)
