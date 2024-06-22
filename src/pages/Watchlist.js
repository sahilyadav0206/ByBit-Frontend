import React, { useEffect, useState } from "react";
import Button from "../components/Common/Button";
import Header from "../components/Common/Header";
import TabsComponent from "../components/Dashboard/Tabs";
import { get100Coins } from "../functions/get100Coins";
import axios from "axios";

function Watchlist() {
  // const watchlist = JSON.parse(localStorage.getItem("watchlist"));
  const [coins, setCoins] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    // if (watchlist) {
    getWatchlistData();
    // }
  }, []);

  const getWatchlistData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/watchlist", {
        withCredentials: true, // Send cookies along with the request
      });
      console.log("watchlist", response.data);
      setWatchlist(response.data);
    } catch (error) {
      console.error("Error fetching watchlist:", error);
      // Handle error appropriately, e.g., show a toast message or log it
    }
  };

  useEffect(() => {
    if (watchlist) {
      getData();
    }
  }, [watchlist]);

  const getData = async () => {
    const allCoins = await get100Coins();
    if (allCoins) {
      console.log("allCoins", allCoins);
      setCoins(allCoins.filter((coin) => watchlist.includes(coin.id)));
    }
  };

  return (
    <div>
      <Header />
      {watchlist?.length > 0 ? (
        <TabsComponent coins={coins} watchlist={watchlist} />
      ) : (
        <div>
          <h1 style={{ textAlign: "center" }}>
            Sorry, No Items In The Watchlist.
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "2rem",
            }}
          >
            <a href="/dashboard">
              <Button text="Dashboard" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Watchlist;
