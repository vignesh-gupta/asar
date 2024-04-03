"use client";

import { useEffect, useMemo, useState } from "react";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";

export default function DisplayData() {
  const [noOfData, setNoOfData] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api.thingspeak.com/channels/2380629/feeds.json?api_key=UUYUJTQF1ALW8SMM&results=${
        noOfData || 5
      }`;
      const res = await fetch(url).then((res) => res.json());
      setData(
        res.feeds?.map((feed) => ({ lat: feed.field7, long: feed.field8 }))
      );
    };
    fetchData();
  }, [noOfData]);

  const Map = dynamic(() => import("./_components/MyMap"), {
    loading: () => <p>A map is loading</p>,
    ssr: false,
  });

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-5">
      <div>
        <p>
          Number of Data:
          <input
            className="p-3 ml-1 border border-black rounded-lg"
            value={noOfData}
            onChange={(e) => setNoOfData(e.target.value)}
          />{" "}
        </p>
      </div>
      <Map positions={data} />
    </div>
  );
}
