import React, { useState, useEffect } from "react";
import logo from "/image/Cloudy.png";
import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useUserStore } from '../stores/useUserStore';
import { useCartStore } from '../stores/useCartStore';


const navigation = [
  { title: "Home", path: "/" },
  { title: "Cart", path: "/cart" }, 
];

const Navbar = () => {

	const { user, logout } = useUserStore();
   const isAdmin = user?.role === "admin";
	  const { cart } = useCartStore();
 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(window.innerWidth >= 667);

  useEffect(() => {
    const ResponsiveMenu = () => {
      setShowMenu(window.innerWidth >= 667);
    };

    window.addEventListener("resize", ResponsiveMenu);
    return () => window.removeEventListener("resize", ResponsiveMenu);
  }, []);

  return (
    <header className="absolute inset-x-0 top-0  z-50">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6  lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img alt="" src={logo} className="h-24 w-auto" />
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>

        <div
          className={`hidden lg:flex lg:gap-x-12 lg:mr-9 ${
            showMenu ? "flex" : "hidden"
          }`}
        >
          {navigation.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              className="text-sm/6 font-semibold text-gray-900"
            >
              {item.title}
            </Link>
          ))}
        </div>

		{user && (
            <Link to="/cart" className="relative group mr-3">
              <ShoppingCart
                className="inline-block mr-1  text-black group-hover:text-emerald-400"
                size={20}
              />
              <span className="hidden text-black sm:inline">Cart</span>
              <span
                className="absolute -top-2 -left-2 bg-emerald-500 text-black rounded-full px-2 py-0.5 
									text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out"
              >
                {cart.length}
              </span>
            </Link>
          )}

          {isAdmin && (
            <Link
              className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-2 mr-3 rounded-md font-medium
								 transition duration-300 ease-in-out flex items-center"
              to={"/secret-dashboard"}
            >
              <Lock className="inline-block mr-1" size={18} />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          )}

          {user ? (
            <button
              className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
						rounded-md flex items-center transition duration-300 ease-in-out"
              onClick={logout}
            >
              <LogOut size={18} />
              <span className="hidden sm:inline ml-2">Log Out</span>
            </button>
          ) : (
            <>
              <Link
                to="/signup"
                className="bg-emerald-600 hover:bg-emerald-700 mr-3 text-white py-2 px-4 
								rounded-md flex items-center transition duration-300 ease-in-out"
              >
                <UserPlus className="mr-1" size={18} />
                Sign Up
              </Link>
              <Link
                to="/login"
                className="bg-red-700 hover:bg-gray-600 text-white py-2 px-4 
								rounded-md flex items-center transition duration-300 ease-in-out"
              >
                <LogIn className="mr-2" size={18} />
                Login
              </Link>
            </>
          )}
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img alt="" src={logo} className="h-16 w-auto" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.title}
                    to={item.path}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
			  {user && (
            <Link to="/cart" className="relative group mr-3">
              <ShoppingCart
                className="inline-block mr-1  text-black group-hover:text-emerald-400"
                size={20}
              />
              <span className="hidden text-black sm:inline">Cart</span>
              <span
                className="absolute -top-2 -left-2 bg-emerald-500 text-black rounded-full px-2 py-0.5 
									text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out"
              >
                {cart.length}
              </span>
            </Link>
          )}

          {isAdmin && (
            <Link
              className="bg-emerald-700 mt-20 hover:bg-emerald-600 text-white px-3 py-2 mr-3 rounded-md font-medium
								 transition duration-300 ease-in-out flex items-center"
              to={"/secret-dashboard"}
            >
              <Lock className="inline-block mr-1" size={18} />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          )}

          {user ? (
            <button
              className="bg-gray-700 mt-20 hover:bg-gray-600 text-white py-2 px-4 
						rounded-md flex items-center transition duration-300 ease-in-out"
              onClick={logout}
            >
              <LogOut size={18} />
              <span className="hidden sm:inline ml-2">Log Out</span>
            </button>
          ) : (
            <>
              <Link
                to="/signup"
                className="bg-emerald-600 mt-20 hover:bg-emerald-700 mr-3 text-white py-2 px-4 
								rounded-md flex items-center transition duration-300 ease-in-out"
              >
                <UserPlus className="mr-1" size={18} />
                Sign Up
              </Link>
              <Link
                to="/login"
                className="bg-gray-700 mt-20 hover:bg-gray-600 text-white py-2 px-4 
								rounded-md flex items-center transition duration-300 ease-in-out"
              >
                <LogIn className="mr-2" size={18} />
                Login
              </Link>
            </>
          )}
              <div className="py-6">
              <Link to="/cart">
        </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Navbar;