import { useQuery } from "@tanstack/react-query"
import api from "../api/axios"
import VideoPlayer from "../components/video/VideoPlayer"
import BackButton from "../components/ui/BackButton"

export default function VideoPage(){

  const { data } = useQuery({

    queryKey:["videos"],

    queryFn: async()=>{

      const res = await api.get("/articles")

      return res.data.filter(a=>a.videoUrl)

    }

  })

  if(!data) return <p>Loading...</p>

  return(

    <div className="max-w-6xl mx-auto p-6">
      <BackButton/>

      <h1 className="text-3xl font-bold mb-6">
        Video Highlights
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        {data.map(video=>(
          <div key={video._id}>

            <VideoPlayer url={video.videoUrl}/>

            <h2 className="mt-2 font-bold">
              {video.title}
            </h2>

          </div>
        ))}

      </div>

    </div>

  )

}