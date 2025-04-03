//main.jsx
import * as ReactDOM from "react-dom/client";
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { RouterProvider } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes'; // Import your router

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <RouterProvider router={AppRoutes} />
    </Provider>
);


