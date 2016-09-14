import {Navigation} from 'react-native-navigation';

import MoviesPage from './movies/MoviesPage';
import CinemasPage from './cinemas/CinemasPage';
import MovieDetailPage from './movies/MovieDetailPage';
// import WishlistPage from './wishlist/WishlistPage';
import SchedulePage from './schedules/SchedulePage';
import MovieSearchPage from './movies/MovieSearchPage';
import CinemaSearchPage from './cinemas/CinemaSearchPage';
import SeatsPage from './schedules/SeatsPage';
import AboutPage from './app/AboutPage';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent('mobile21.MoviesPage', () => MoviesPage, store, Provider);
  Navigation.registerComponent('mobile21.CinemasPage', () => CinemasPage, store, Provider);
  Navigation.registerComponent('mobile21.SchedulePage', () => SchedulePage, store, Provider);
  // Navigation.registerComponent('mobile21.WishlistPage', () => WishlistPage, store, Provider);

  Navigation.registerComponent('mobile21.MovieDetailPage', () => MovieDetailPage, store, Provider);
  Navigation.registerComponent('mobile21.MovieSearchPage', () => MovieSearchPage, store, Provider);
  Navigation.registerComponent('mobile21.CinemaSearchPage', () => CinemaSearchPage, store, Provider);
  Navigation.registerComponent('mobile21.SeatsPage', () => SeatsPage, store, Provider);
  Navigation.registerComponent('mobile21.AboutPage', () => AboutPage, store, Provider);
}
