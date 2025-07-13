
import { useContext } from "react"
import logo from "../assets/images/freshcart-logo.svg"
import { Link, NavLink } from "react-router-dom"
import { UserContext } from "../Context/UserContext.jsx"
import { CartContext } from "../Context/CartContext.jsx"
import { useNavigate } from "react-router-dom"
import cart from "../assets/images/shopping-cart.png"

export default function Navbar() {
  const { userLogin, setuserLogin } = useContext(UserContext)
  const navigate = useNavigate()
  const { numOfCartItems } = useContext(CartContext)

  console.log("numOfCartItems:", numOfCartItems)

  // Function to handle logout
  function logout() {
    setuserLogin(null)
    localStorage.removeItem("usertoken")
    navigate("/login")
  }

  return (
    <>
      <nav className="bg-[#F8F9FA]">
        <div className="w-[90%]  mx-auto">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img src={logo} width={150} alt="Fresh Cart" className="h-8" />
              </Link>
            </div>

            {/* Navigation Links - Center */}
            {userLogin !== null && (
              <div className="hidden md:flex items-center space-x-8">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "text-black font-bold transition-colors"
                      : "text-gray-700 font-medium transition-colors"
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="cart"
                  className={({ isActive }) =>
                    isActive
                      ? "text-black font-bold transition-colors"
                      : "text-gray-700 font-medium transition-colors"
                  }
                >
                  cart
                </NavLink>
                <NavLink
                  to="/wishlist"
                  className={({ isActive }) =>
                    isActive
                      ? "text-black font-bold transition-colors"
                      : "text-gray-700 font-medium transition-colors"
                  }
                >
                  wish list
                </NavLink>
                <NavLink
                  to="products"
                  className={({ isActive }) =>
                    isActive
                      ? "text-black font-bold transition-colors"
                      : "text-gray-700 font-medium transition-colors"
                  }
                >
                  Products
                </NavLink>
                <NavLink
                  to="categories"
                  className={({ isActive }) =>
                    isActive
                      ? "text-black font-bold transition-colors"
                      : "text-gray-700 font-medium transition-colors"
                  }
                >
                  catgories
                </NavLink>
                <NavLink
                  to="brands"
                  className={({ isActive }) =>
                    isActive
                      ? "text-black font-bold transition-colors"
                      : "text-gray-700 font-medium transition-colors"
                  }
                >
                  brands
                </NavLink>
              </div>
            )}

            {/* Right Section - Cart and Auth */}
            <div className="flex items-center space-x-4">
              {userLogin !== null ? (
                <>
                  {/* Cart Icon with Badge */}
                  <Link to="cart" className="relative p-2">
                    <img className="w-6 h-6" src={cart || "/placeholder.svg"} alt="cart" />
                    {numOfCartItems > 0 && (
                      <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-green-500 rounded-full">
                        {numOfCartItems}
                      </span>
                    )}
                  </Link>

                  {/* Logout */}
                  <button onClick={logout} className="text-gray-700 cursor-pointer ">
                    log out
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="register" className="text-gray-700 ">
                    Register
                  </Link>
                  <Link to="login" className="text-gray-700 ">
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          {userLogin !== null && (
            <div className="md:hidden pb-4">
              <div className="flex flex-wrap gap-4 justify-center">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "text-black font-bold transition-colors"
                      : "text-gray-700 font-medium transition-colors"
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="cart"
                  className={({ isActive }) =>
                    isActive
                      ? "text-black font-bold transition-colors"
                      : "text-gray-700 font-medium transition-colors"
                  }
                >
                  cart
                </NavLink>
                <NavLink
                  to="/wishlist"
                  className={({ isActive }) =>
                    isActive
                      ? "text-black font-bold transition-colors"
                      : "text-gray-700 font-medium transition-colors"
                  }
                >
                  wish list
                </NavLink>
                <NavLink
                  to="products"
                  className={({ isActive }) =>
                    isActive
                      ? "text-black font-bold transition-colors"
                      : "text-gray-700 font-medium transition-colors"
                  }
                >
                  Products
                </NavLink>
                <NavLink
                  to="categories"
                  className={({ isActive }) =>
                    isActive
                      ? "text-black font-bold transition-colors"
                      : "text-gray-700 font-medium transition-colors"
                  }
                >
                  catgories
                </NavLink>
                <NavLink
                  to="brands"
                  className={({ isActive }) =>
                    isActive
                      ? "text-black font-bold transition-colors"
                      : "text-gray-700 font-medium transition-colors"
                  }
                >
                  brands
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
