import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube
} from "react-icons/fa"

export default function Footer(){

  return(

    <footer className="bg-gray-900 text-gray-300 mt-20">

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        <div>

          <h2 className="text-xl font-bold text-white">
            TV Reporter
          </h2>

          <p className="mt-3 text-sm">
            Latest Bollywood, Hollywood and TV entertainment news.
          </p>

        </div>


        <div>

          <h3 className="font-semibold text-white">
            Categories
          </h3>

          <ul className="mt-3 space-y-2 text-sm">

            <li>Bollywood</li>
            <li>Hollywood</li>
            <li>TV Shows</li>
            <li>Web Series</li>

          </ul>

        </div>


        {/* SOCIAL ICONS */}

        <div>

          <h3 className="font-semibold text-white">
            Follow Us
          </h3>

          <div className="flex gap-4 mt-4 text-2xl">

            <a href="#">
              <FaFacebook/>
            </a>

            <a href="#">
              <FaTwitter/>
            </a>

            <a href="#">
              <FaInstagram/>
            </a>

            <a href="#">
              <FaYoutube/>
            </a>

          </div>

        </div>

      </div>


      <div className="text-center border-t border-gray-700 py-4 text-sm">

        © {new Date().getFullYear()} TV Reporter

      </div>

    </footer>

  )

}