import ReactPlayer from "react-player"

export default function VideoPlayer({ url }) {

  return (

    <div className="aspect-video">

      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls
      />

    </div>

  )
}