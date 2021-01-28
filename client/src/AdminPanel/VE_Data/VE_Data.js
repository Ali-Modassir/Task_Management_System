import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../customHooks/http-hook";

export const VE_Data = () => {
  const { sendRequest, isLoading } = useHttpClient();
  const [data, setData] = useState([]);

  useEffect(() => {
    sendRequest(process.env.REACT_APP_BASE_URL + "/dashboard/workspace/VE/data")
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, [data]);

  console.log(data);

  return data;
};

// export default VE_Data

// export const VE_Data = [
//   { name: "Modassir Ali", email: "alimodassir@gmail.com" },
//   { name: "Xyzabc", email: "alimodassir223@gmail.com" },
//   { name: "Abcxyz", email: "2019ugpi042@nitjsr.ac.in" },
//   { name: "LoremIpsum", email: "alimodassir223@gmail.com" },
// ];
