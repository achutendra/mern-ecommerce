import {Routes, Route} from 'react-router-dom';
import HomePage from "./routes/HomePage";
import About from "./routes/About";
import Contact from "./routes/Contact";
import Policy from "./routes/Policy";
import PageNotFound from "./routes/PageNotFound";
import Register from './routes/Auth/Register';
import Login from './routes/Auth/Login';
import Dashboard from './routes/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './routes/Auth/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './routes/Admin/AdminDashboard';
import CreateCategory from './routes/Admin/CreateCategory';
import CreateProduct from './routes/Admin/CreateProduct';
import Users from './routes/Admin/Users';
import Profile from './routes/user/Profile';
import Orders from './routes/user/Orders';
import Products from './routes/Admin/Products';
import UpdateProduct from './routes/Admin/UpdateProduct';
import Search from './routes/Search';
import ProductDetails from './routes/ProductDetails';
import Categories from './routes/Categories';
import CategoryProduct from './routes/CategoryProduct';
import CartPage from './routes/CartPage';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element= {<HomePage />}/>
        <Route path='/product/:slug' element= {<ProductDetails />}/>
        <Route path='/categories' element= {<Categories />}/>
        <Route path='/cart' element= {<CartPage />}/>
        <Route path='/category/:slug' element= {<CategoryProduct />}/>
        <Route path='/search' element= {<Search />}/>
        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='user' element= {<Dashboard />}/>
          <Route path='user/profile' element= {<Profile />}/>
          <Route path='user/orders' element= {<Orders />}/>
        </Route>
        <Route path='/dashboard' element={<AdminRoute />}>
          <Route path='admin' element= {<AdminDashboard />}/>
          <Route path='admin/create-category' element= {<CreateCategory />}/>
          <Route path='admin/create-product' element= {<CreateProduct />}/>
          <Route path='admin/product/:slug' element= {<UpdateProduct />}/>
          <Route path='admin/products' element= {<Products />}/>
          <Route path='admin/users' element= {<Users />}/>
        </Route>
        <Route path='/register' element= {<Register />}/>
        <Route path='/login' element= {<Login />}/>
        <Route path='/forgot-password' element= {<ForgotPassword />}/>
        <Route path='/about' element= {<About />}/>
        <Route path='/contact' element= {<Contact />}/>
        <Route path='/policy' element= {<Policy />}/>
        <Route path='/*' element= {<PageNotFound />}/>
      </Routes>
    </>
  );
}

export default App;
