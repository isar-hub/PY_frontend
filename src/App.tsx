  import { lazy, Suspense, useEffect } from "react";
  import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

  import HomeLayout from "./layout/HomeLayout";
  import Header from "./pages/Header";
  import Navbar2 from "./pages/Navbar2";
  import Loader, { LoaderLayout } from "./components/Loader";
  import { ForgotPassword } from "./pages/ForgotPassword";

  import { SignInSide, SignUp } from "./pages/Login";
  import { Toaster } from "react-hot-toast";
  import { auth } from "./firebase";
  import { useDispatch, useSelector } from "react-redux";
  import { userExist, userNotExist } from "./redux/reducers/userReducer";
  import { getUser } from "./redux/api/userAPI";
  import { Cart2 } from "./pages/Cart2";
  import { onAuthStateChanged } from "firebase/auth";
  import { RootState } from "./redux/store";
  import ProtectedRoute from "./components/ProtectedRoute";
  import Shipping from "./pages/shipping";
  import Orders from "./pages/orders";
  import Checkout from "./pages/checkout";
  // import OrderDetails from "./pages/order-details";
  import NotFound from "./pages/not-found";
  import AgeVerification from "./components/AgeVerfication";

  const ProductListing = lazy(() => import("./pages/ProductListing"));
  const BlogListing = lazy(() => import("./pages/BlogListing"));
  const ContactSection = lazy(() => import("./pages/ContactSection"));
  const ProductDetails = lazy(() => import("./pages/product-details"));

  const Post1 = lazy(() => import("./pages/Post1"));
  const Post2 = lazy(() => import("./pages/Post2"));
  const Post3 = lazy(() => import("./pages/Post3"));
  const Post4 = lazy(() => import("./pages/Post4"));
  const Post11 = lazy(() => import("./pages/Post11"));
  const Post22 = lazy(() => import("./pages/Post22"));
  const Post33 = lazy(() => import("./pages/Post33"));
  const Post44 = lazy(() => import("./pages/Post44"));
  const Post55 = lazy(() => import("./pages/Post55"));

  const FaqSection = lazy(() => import("./pages/FaqSection"));
  const ShippingPolicy = lazy(() => import("./pages/ShippingPolicy"));
  const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
  const TermsCondition = lazy(() => import("./pages/Terms&Condition"));

  // Admin Routes Importing
  const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
  const Products = lazy(() => import("./pages/admin/products"));
  const Customers = lazy(() => import("./pages/admin/customers"));
  const Transaction = lazy(() => import("./pages/admin/transaction"));
  const Discount = lazy(() => import("./pages/admin/Discount"));
  const Barcharts = lazy(() => import("./pages/admin/charts/barCharts"));
  const Piecharts = lazy(() => import("./pages/admin/charts/pieCharts"));
  const Linecharts = lazy(() => import("./pages/admin/charts/lineCharts"));
  const Coupon = lazy(() => import("./pages/admin/apps/coupon"));
  const Stopwatch = lazy(() => import("./pages/admin/apps/stopwatch"));
  const Toss = lazy(() => import("./pages/admin/apps/toss"));
  const NewProduct = lazy(() => import("./pages/admin/management/newproduct"));
  const ProductManagement = lazy(
    () => import("./pages/admin/management/productmanagement")
  );
  const TransactionManagement = lazy(
    () => import("./pages/admin/management/transactionmanagemnet")
  );
  const DiscountManagement = lazy(
    () => import("./pages/admin/management/discountmanagement")
  );

  const NewDiscount = lazy(() => import("./pages/admin/management/newdiscount"));

  function App() {
    const { user, loading } = useSelector(
      (state: RootState) => state.userReducer
    );

    const dispatch = useDispatch();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const data = await getUser(user.uid);
            dispatch(userExist(data.user));
          } catch (error) {
            console.error("Error fetching user data: ", error);
            dispatch(userNotExist());
          }
        } else {
          dispatch(userNotExist());
        }
      });

      return () => unsubscribe();
    }, [dispatch]);

    if (loading) {
      return <Loader />;
    }

    return (
      <>
        <Router>
          <AgeVerification />
          <Header />
          <Navbar2 user={user} />
          <Suspense fallback={<LoaderLayout />}>
            <Routes>
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/product-listing" element={<ProductListing />} />
              <Route path="/blog-listing" element={<BlogListing />} />
              <Route path="/contact-listing" element={<ContactSection />} />
              <Route path="/faq-section" element={<FaqSection />} />
              <Route path="/terms-section" element={<TermsCondition />} />
              <Route path="/privacy-section" element={<PrivacyPolicy />} />
              <Route path="/shipping-section" element={<ShippingPolicy />} />

              <Route path="/cart" element={<Cart2 />} />
              <Route path="/post1" element={<Post1 />} />
              <Route path="/post2" element={<Post2 />} />
              <Route path="/post3" element={<Post3 />} />
              <Route path="/post4" element={<Post4 />} />
              <Route path="/post11" element={<Post11 />} />
              <Route path="/post22" element={<Post22 />} />
              <Route path="/post33" element={<Post33 />} />
              <Route path="/post44" element={<Post44 />} />
              <Route path="/post55" element={<Post55 />} />

              <Route
                path="/login"
                element={
                  <ProtectedRoute isAuthenticated={!user}>
                    <SignInSide />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sign-up"
                element={
                  <ProtectedRoute isAuthenticated={!user}>
                    <SignUp />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/forgot-password"
                element={
                  <ProtectedRoute isAuthenticated={!user}>
                    <ForgotPassword />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<HomeLayout />} />
              <Route element={<ProtectedRoute isAuthenticated={!!user} />}>
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/orders" element={<Orders/>} />
                {/* <Route path="/order/:id" element={<OrderDetails />} /> */}
                <Route path="/pay" element={<Checkout />} />
              </Route>
              <Route
                element={
                  <ProtectedRoute
                    isAuthenticated={!!user}
                    adminOnly={true}
                    admin={user?.role === "admin"}
                  />
                }
              >
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/product" element={<Products />} />
                <Route path="/admin/customer" element={<Customers />} />
                <Route path="/admin/transaction" element={<Transaction />} />
                <Route path="/admin/discount" element={<Discount />} />

                {/* Charts */}
                <Route path="/admin/chart/bar" element={<Barcharts />} />
                <Route path="/admin/chart/pie" element={<Piecharts />} />
                <Route path="/admin/chart/line" element={<Linecharts />} />
                {/* Apps */}
                <Route path="/admin/app/coupon" element={<Coupon />} />
                <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
                <Route path="/admin/app/toss" element={<Toss />} />

                {/* Management */}
                <Route path="/admin/product/new" element={<NewProduct />} />
                <Route
                  path="/admin/product/:id"
                  element={<ProductManagement />}
                />
                <Route
                  path="/admin/transaction/:id"
                  element={<TransactionManagement />}
                />
                <Route path="/admin/discount/new" element={<NewDiscount />} />
                <Route
                  path="/admin/discount/:id"
                  element={<DiscountManagement />}
                />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Toaster position="bottom-right" />
        </Router>
      </>
    );
  }

  export default App;
