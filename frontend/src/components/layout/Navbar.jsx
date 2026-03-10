import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import logo from "../logo.png"

export default function Navbar(){

  const navigate = useNavigate()

  const [search,setSearch] = useState("")
  const [menuOpen,setMenuOpen] = useState(false)

  const token = localStorage.getItem("token")

  const logout = ()=>{
    localStorage.removeItem("token")
    setMenuOpen(false)
    navigate("/")
  }

  const handleSearch=(e)=>{
    e.preventDefault()

    if(!search.trim()) return

    navigate(`/category/${search.toLowerCase()}`)
    setMenuOpen(false)
  }

  return(

    <header className="bg-white dark:bg-gray-900 shadow sticky top-0 z-50">

      {/* BREAKING NEWS */}

      <div className="bg-red-600 text-white text-sm py-1 text-center">
        🔥 Breaking: Latest Bollywood & Hollywood updates
      </div>

      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

        <Link
  to="/"
  className="flex items-center gap-2 md:gap-3"
>

  <img
    src={logo}
    alt="TV Reporter Logo"
    className="h-8 md:h-10 transition-transform hover:scale-105"
  />

  <span className="text-xl md:text-2xl font-bold text-red-600 whitespace-nowrap">
    TV Reporter
  </span>

</Link>

        {/* DESKTOP NAV */}

        <nav className="hidden md:flex gap-6 font-medium">

          <Link to="/category/bollywood">Bollywood</Link>
          <Link to="/category/hollywood">Hollywood</Link>
          <Link to="/category/tv">TV</Link>
          <Link to="/videos">Videos</Link>

        </nav>


        {/* DESKTOP SEARCH */}

        <form onSubmit={handleSearch} className="hidden md:flex">

          <input
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            placeholder="Search..."
            className="border px-3 py-1 rounded-l"
          />

          <button className="bg-red-600 text-white px-3 rounded-r">
            Search
          </button>

        </form>


        {/* DESKTOP AUTH */}

        <div className="hidden md:flex gap-3">

          {token ? (

            <>
              <Link
                to="/admin/dashboard"
                className="bg-gray-800 text-white px-4 py-2 rounded"
              >
                Dashboard
              </Link>

              <button
                onClick={logout}
                className="bg-black text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </>

          ) : (

            <Link
              to="/admin"
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Admin Login
            </Link>

          )}

        </div>


        {/* MOBILE MENU BUTTON */}

        <button
          onClick={()=>setMenuOpen(!menuOpen)}
          className="md:hidden"
        >
          {menuOpen ? (
            <XMarkIcon className="h-6 w-6"/>
          ) : (
            <Bars3Icon className="h-6 w-6"/>
          )}
        </button>

      </div>


      {/* MOBILE MENU */}

      {menuOpen && (

        <div className="md:hidden border-t bg-white dark:bg-gray-900">

          <div className="flex flex-col p-4 space-y-4 font-medium">

            <Link
              to="/category/bollywood"
              onClick={()=>setMenuOpen(false)}
            >
              Bollywood
            </Link>

            <Link
              to="/category/hollywood"
              onClick={()=>setMenuOpen(false)}
            >
              Hollywood
            </Link>

            <Link
              to="/category/tv"
              onClick={()=>setMenuOpen(false)}
            >
              TV
            </Link>

            <Link
              to="/videos"
              onClick={()=>setMenuOpen(false)}
            >
              Videos
            </Link>


            {/* SEARCH */}

            <form onSubmit={handleSearch} className="flex">

              <input
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                placeholder="Search..."
                className="border px-3 py-2 rounded-l w-full"
              />

              <button className="bg-red-600 text-white px-3 rounded-r">
                Go
              </button>

            </form>


            <div className="border-t pt-4 flex flex-col gap-3">

              {token ? (

                <>
                  <Link
                    to="/admin/dashboard"
                    onClick={()=>setMenuOpen(false)}
                    className="bg-gray-800 text-white text-center py-2 rounded"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={logout}
                    className="bg-black text-white py-2 rounded"
                  >
                    Logout
                  </button>
                </>

              ) : (

                <Link
                  to="/admin"
                  onClick={()=>setMenuOpen(false)}
                  className="bg-red-600 text-white text-center py-2 rounded"
                >
                  Admin Login
                </Link>

              )}

            </div>

          </div>

        </div>

      )}

    </header>

  )

}