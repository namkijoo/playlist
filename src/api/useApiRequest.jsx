import axios from "axios";

const useApiRequest = () => {
  const apiRequest = async ({ method, url, params, headers }) => {
    try {
      const response = await axios({
        method,
        url: url,
        params,
        headers,
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  return { apiRequest };
};

export default useApiRequest;
