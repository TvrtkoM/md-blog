"use client";
import useMeQuery from "@/queries/useMeQuery";

export default function Home() {
  const { data: me } = useMeQuery();
  console.log(me);
  return <main className=""></main>;
}
