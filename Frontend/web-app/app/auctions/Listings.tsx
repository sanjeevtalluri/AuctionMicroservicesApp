"use client";

import { useParamsStore } from "@/hooks/useParamsStore";
import { Auction, PagedResult } from "@/types";
import React, { useEffect, useState } from "react";
import { getData } from "../actions/auctionActions";
import AppPagination from "../components/AppPagination";
import AuctionCard from "./AuctionCard";
import Filters from "./Filters";
import { shallow } from "zustand/shallow";
import qs from "query-string";
import EmptyFilter from "../components/EmptyFilter";

const Listings = () => {
  const [data, setData] = useState<PagedResult<Auction>>();
  const params = useParamsStore(
    (state) => ({
      pageNumber: state.pageNumber,
      pageSize: state.pageSize,
      searchTerm: state.searchTerm,
      orderBy: state.orderBy,
      filterBy: state.filterBy,
    }),
    shallow
  );
  const setParams = useParamsStore((state) => state.setParams);
  const url = qs.stringifyUrl({ url: "", query: params });

  function setPageNumber(pageNumber: number) {
    setParams({ pageNumber });
  }

  useEffect(() => {
    getData(url).then((data) => {
      setData(data);
    });
  }, [url]);

  if (!data) return <h3>Loading...</h3>;

  return (
    <>
      <Filters />
      {data.totalCount === 0 ? (
        <EmptyFilter showReset />
      ) : (
        <>
          <div className="grid grid-cols-4 gap-6">
            {data.results.length &&
              data.results.map((auction) => {
                return <AuctionCard key={auction.id} auction={auction} />;
              })}
          </div>
          <div className="flex justify-center mt-4">
            <AppPagination
              currentPage={params.pageNumber}
              pageCount={data.pageCount}
              setPageNumber={setPageNumber}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Listings;
