import { useNavigate } from "react-router-dom"

export default function BackButton(){

  const navigate = useNavigate()

  return(

    <div className="flex gap-3 mb-6">

      <button
        onClick={()=>navigate(-1)}
        className="bg-gray-200 px-4 py-2 rounded"
      >
        ← Back
      </button>

      <button
        onClick={()=>navigate("/")}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Home
      </button>

    </div>

  )

}