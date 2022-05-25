import {shortMovie, movie} from "./TMDB";

export interface RowContainerProps {
  title: string;
  children: shortMovie[];
  render: render;
}
function render(child: JSX.Element): JSX.Element;

export interface MovieCardProps {
  movie: movie;
}
