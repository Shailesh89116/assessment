import Head from "next/head";
import { getSession, signOut, useSession } from "next-auth/react";
import { NextPageContext } from "next";
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Products in Stock",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Product",
      data: [2, 4, 65, 6],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="contentful cms" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Navbar />
      </header>
      <main
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "60%", height: "60%" }}>
          <Bar options={options} data={data} />
        </div>
      </main>
    </>
  );
}
