import axios from 'axios';
import qs from 'qs';
// import reverseGeocode from 'latlng-to-zip';

import {
  FETCH_JOBS,
  LIKE_JOB,
  CLEAR_LIKED_JOBS
} from './types';

const JOB_ROOT_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json?';
const JOB_QUERY_PARAMS = {
  key: 'AIzaSyAxCK-tDju93DCVhazar1lZz2LSsV0uTnM', // google api key
  radius: 1000,
  query: 'jobs'
};

// We are not using indeed API, we gnna user Googple place API with query params of jobs.
// We dont need to reverseGeocde with google place we can provide
//lat lon arond wich we want to fetch locations
// export const fetchJobs = region => async dispatch => {
//   try {
//     const zipCode = await reverseGeocode(region);
//   } catch (e) {
//     console.error(e);
//   }
// };

const buildJobsUrl = ({ latitude, longitude }) => {
  const query = qs.stringify({ ...JOB_QUERY_PARAMS, location: `${latitude},${longitude}` });
  return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = (region, navigationCallback) => async dispatch => {
  try {
    const url = buildJobsUrl(region);
    const { data } = await axios.get(url);
    dispatch({ type: FETCH_JOBS, payload: data });
    navigationCallback();
  } catch (e) {
    console.error(e);
  }
};

export const likeJob = (job) => ({ payload: job, type: LIKE_JOB });

export const clearLikedJobs = () => ({ type: CLEAR_LIKED_JOBS });
