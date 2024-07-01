import React from "react";
import { useEffect, useState } from "react";
import Card from "./Card";

function Container() {
  const [array, setArray] = useState([]);
  const [trigger, setTrigger] = useState(true);
  const [isactive, setIsactive] = useState(false);
  useEffect(() => {
    if (trigger) {
      try {
        const url =
          "https://raw.githubusercontent.com/devchallenges-io/web-project-ideas/main/front-end-projects/data/simple-coffee-listing-data.json";
        fetch(url)
          .then((response) => response.json())
          .then((data) => setArray(data));
        setIsactive(false);
      } catch (error) {
        console.log("error fetching data");
      }
    }
  }, [trigger]);
  const checkavailable = () => {
    setTrigger(false);
    setIsactive(true);
    setArray((prev) => prev.filter((item) => item.available));
  };
  return (
    <div className="bg-[#111315] w-screen h-screen min-h-screen relative overflow-scroll">
      <div className="  w-screen h-[30%] bg-[url('bg-cafe.jpg')] bg-contain bg-no-repeat sm:bg-cover  "></div>

      <div className="absolute h-auto w-[70%] bg-[#1B1D1F] mx-auto top-[10%] mb-4 left-0 right-0 px-[9rem] py-[4rem] flex flex-wrap flex-col items-center justify-center rounded-2xl gap-9 ">
        <div className="bg-[url('vector.svg')] bg-contain sm:w-[40%] w-auto h-auto bg-no-repeat bg-top  flex items-center justify-center gap-3 flex-col ">
          <h1 className="text-[2rem] text-[#FEF7EE] font-semibold mt-5 text-center ">
            Our Collection
          </h1>
          <p className="text-[#6F757C] sm:text-[1rem] text-[0.875rem] font-medium text-center">
            Introducing our Coffee Collection, a selection of unique coffees
            from different roast types and origins, expertly roasted in small
            batches and shipped fresh weekly.
          </p>
          <div className=" flex items-center justify-center gap-3 p-2 ">
            <button
              className={`text-[#FEF7EE] sm:text-[1rem] text-[0.875rem] hover:bg-[#6F757C] font-medium px-[1rem] py-[0.5rem] rounded-lg transition-all duration-100 ${
                trigger ? "bg-[#6F757C]" : ""
              }`}
              onClick={() => setTrigger(true)}
            >
              All Products
            </button>
            <button
              className={`text-[#FEF7EE] sm:text-[1rem] text-[0.875rem] hover:bg-[#6F757C] font-medium px-[1rem] py-[0.5rem] rounded-lg transition-all duration-100 ${
                isactive ? " bg-[#6F757C]" : ""
              }`}
              onClick={checkavailable}
            >
              Available Now
            </button>
          </div>
        </div>
        {/* card components here */}
        <div className=" flex flex-wrap gap-[2.25rem] gap-y-[5rem] justify-center items-center w-full   ">
          {array && array.map((elem) => <Card key={elem.id} {...elem} />)}
        </div>
      </div>
    </div>
  );
}

export default Container;
