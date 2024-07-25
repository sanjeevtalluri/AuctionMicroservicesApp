'use client'

import { Auction, PagedResult } from "@/types";
import React, { useEffect, useState } from "react";
import { getData } from "../actions/auctionActions";
import AppPagination from "../components/AppPagination";
import AuctionCard from "./AuctionCard";

const Listings =  () => {
  const [auctions,setAuctions] = useState<Auction[]>([]);
  const [pageCount,setPageCount] = useState<number>(0);
  const [pageNumber,setPageNumber] = useState<number>(1);

  useEffect(() => {
    getData(pageNumber).then(data=>{
        setAuctions(data.results);
        setPageCount(data.pageCount);
    })
  }, [pageNumber]);
  return (
    <>
      <div className="grid grid-cols-4 gap-6">
        {auctions.length &&
          auctions.map((auction) => {
            return <AuctionCard key={auction.id} auction={auction} />;
          })}
      </div>
      <div className='flex justify-center mt-4'>
        <AppPagination  currentPage={pageNumber} pageCount = {pageCount} setPageNumber = {setPageNumber} />
      </div>
    </>
  );
};

export default Listings;
