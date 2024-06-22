import axios from "axios";
import { toast } from "react-toastify";

export const removeItemToWatchlist = async (e, id, setIsCoinAdded) => {
  e.preventDefault();
  if (window.confirm("Are you sure you want to remove this coin?")) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        "http://localhost:8080/watchlist/remove",
        { coinId: id },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setIsCoinAdded(false);
        toast.success(
          `${
            id.substring(0, 1).toUpperCase() + id.substring(1)
          } - has been removed!`
        );
        window.location.reload();
      } else {
        throw new Error("Could not remove coin");
      }
    } catch (error) {
      toast.error(
        `${
          id.substring(0, 1).toUpperCase() + id.substring(1)
        } - could not be removed!`
      );
      setIsCoinAdded(true);
    }
  } else {
    toast.error(
      `${
        id.substring(0, 1).toUpperCase() + id.substring(1)
      } - could not be removed!`
    );
    setIsCoinAdded(true);
  }
};
