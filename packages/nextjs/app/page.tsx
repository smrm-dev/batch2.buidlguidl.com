"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { address } = useAccount();

  const { data: checkInCount } = useScaffoldContractRead({
    contractName: "BatchRegistry",
    functionName: "checkedInCounter",
  });

  const { data: allowed } = useScaffoldContractRead({
    contractName: "BatchRegistry",
    functionName: "allowList",
    args: [address],
  });

  const { data: contract } = useScaffoldContractRead({
    contractName: "BatchRegistry",
    functionName: "yourContractAddress",
    args: [address],
  });

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Batch 2</span>
          </h1>
          <p className="text-center text-lg">Get started by taking a look at your batch GitHub repository.</p>
          <p className="text-lg flex gap-2 mt-8 justify-center">
            <span className="font-bold">
              Checked in builders count:{" "}
              {checkInCount?.toString() ?? <span className="loading loading-spinner loading-sm"></span>}
            </span>
          </p>
          <p className="text-lg flex gap-2 justify-center">
            {allowed === undefined || contract === undefined ? (
              <></>
            ) : !allowed ? (
              <span>You are not registered in this batch.</span>
            ) : parseInt(contract, 16) === 0 ? (
              <span>You have not checked in yet. Check in and get your reward!</span>
            ) : (
              <span>
                Your contract address:{" "}
                <Link href={`https://optimistic.etherscan.io/address/${contract}`} passHref className="link">
                  {contract}
                </Link>
              </span>
            )}
          </p>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Tinker with your smart contract using the{" "}
                <Link href="/debug" passHref className="link">
                  Debug Contract
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
