import { useRef, useEffect } from 'react';

/**
 * Helper to deal with prevention of updating state on an unmounted component
 */
export function useMountedRef() {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;

    return () => {mounted.current = false;};
  },[]);

  return mounted;
}

/**
 * Gets data from API
 * @param {String} route 
 * @param {Fetch Options} options 
 * @returns Object with response from fetcha and json response
 */
export async function api(route, options) {
  //TODO: Use AbortController
  const url = `${window.location.href}api/${route}`;

  const response = await fetch(url, { headers: { 'Content-Type': 'application/json' }, ...options});
  const responseData = await response.json();
  console.log(responseData);
  return {response, responseData};
};




