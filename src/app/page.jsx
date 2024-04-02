"use client";

import { useEffect, useMemo, useState } from "react";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";

export default function DisplayData() {
  const [noOfData, setNoOfData] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api.thingspeak.com/channels/2380629/feeds.json?api_key=UUYUJTQF1ALW8SMM&results=5`;
      const res = await fetch(url).then((res) => res.json());
      setData(
        res.feeds?.map((feed) => ({ lat: feed.field7, long: feed.field8 }))
      );
    };
    fetchData();
  }, []);

  const Map = useMemo(
    () =>
      dynamic(() => import("./_components/MyMap"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  return (
    <div className="w-full h-screen">
      <h1>Number of Data: {noOfData}</h1>
      <Map positions={data} />
    </div>
  );
}
