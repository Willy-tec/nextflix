import {shortMovie, movie} from "./TMDB";

export interface RowContainerProps {
  title: string;
  children: shortMovie[];
  render: render;
  width: number;
}
function render(child: JSX.Element): JSX.Element;

export interface MovieCardProps {
  movie: movie;
}

export interface YoutubeFrameProps {
  trailer_key: string;
  width: number;
  height: number;
}
