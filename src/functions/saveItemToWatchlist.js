import axios from "axios";
import { toast } from "react-toastify";

export const saveItemToWatchlist = async (e, id) => {
  e.preventDefault();
  let watchlist = JSON.parse(localStorage.getItem("watchlist"));

  if (watchlist && watchlist.includes(id)) {
    toast.error(
      `${
        id.substring(0, 1).toUpperCase() + id.substring(1)
      } - is already added to the watchlist!`
    );
    return;
  }

  try {
    const token = localStorage.getItem("authToken");
    await axios.put(
      "http://localhost:8080/watchlist/add",
      { coinId: id },
      {
        withCredentials: true,
      }
    );

    if (watchlist) {
      watchlist.push(id);
    } else {
      watchlist = [id];
    }

    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    toast.success(
      `${
        id.substring(0, 1).toUpperCase() + id.substring(1)
      } - added to the watchlist`
    );
  } catch (error) {
    toast.error("Error adding coin to watchlist: " + error.message);
  }
};
