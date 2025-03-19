import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useNotificationCount = () => {
  const userProfile = useSelector((state) => state.Profile.userDetails);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(userProfile?.Email_Address_Is_Verified ? 0 : 1);
  }, [userProfile?.Email_Address_Is_Verified]);

  return count;
};

export default useNotificationCount;
