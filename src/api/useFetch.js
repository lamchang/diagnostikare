import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
  
  useEffect(() => {
		fetch(url)
			.then(res => {
				if(!res.ok) {
					throw Error("No fue posible obtener la información.");
				}
				return res.json()
			})
			.then(data => {
				setData(data);
				setError(null);
				setIsLoading(false);
			})
			.catch(err => {
				setError(err.message);
				setIsLoading(false);
			});
	}, [url]);

  return { data, isLoading, error };
}

export default useFetch;

