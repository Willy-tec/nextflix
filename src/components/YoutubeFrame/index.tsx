import {YoutubeFrameProps} from "../../types/pageProps";

export default function YoutubeFrame({
  trailer_key,
  width,
  height,
}: YoutubeFrameProps) {
  const YOUTUBE_URL = "https://www.youtube.com/embed/";

  return (
    <>
      {/* <iframe
        width="560"
        height="315"
        src={YOUTUBE_URL + key}
        title="YouTube video player"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen></iframe> */}
      <object
        data={YOUTUBE_URL + trailer_key}
        width="560"
        height="315"></object>
    </>
  );
}
