import { AxiosInstance } from "axios";
import Image from "next/image";
import React, { ReactElement, useEffect } from "react";
import { Agent, response } from "src/@types";
import AgentNavbar from "src/componets/Agent/AgentNavbar";
import { useAppContext } from "src/Context/AppContext";
import DashBoardLayout from "src/Layout/DasboardsLayout";
import { useFetch } from "src/lib/hooks/useFetch";
import { useAxios } from "src/utills/axios";

const Card = ({ name, Value }: { name: string; Value: number | string }) => {
  return (
    <div className="bg-white w-full rounded-lg flex space-x-3 items-center px-[15px] py-5 max-w-[140px]">
      <div>
        <p className="text-TitleColor text-xl font-bold">{Value}</p>
        <p className="text-[#A3AED0] text-xs font-medium">{name}</p>
      </div>
    </div>
  );
};

const SuggestionCard = () => {
  return (
    <div className="flex flex-col items-center space-y-3  p-5   relative">
      <div className=" p-1 border-2 border-primaryBlue rounded-full w-max  flex justify-center  ">
        <div className="h-[86px] w-[86px]  relative rounded-full">
          <Image
            src={"/home.png"}
            fill
            className="object-fill rounded-full"
            alt="villa4"
          />
        </div>
        <div className="bg-[#2E5CA0] flex justify-center items-center absolute p-1 px-2  z-50 top-2  ">
          <p className="text-white text-xs">9</p>
        </div>
      </div>
      <div className="text-TitleColor ">
        <h1 className="text-sm  font-normal">SLV Central Park</h1>
        <p className="text-[11px] opacity-60 text-[#8993A4]">
          Whitefield, Banglore
        </p>
      </div>
    </div>
  );
};

export const PostingByDeveloper = () => {
  return (
    <>
      {" "}
      <div className="">
        <div className="bg-white rounded-sm mb-9 p-6 relative ">
          <div className="flex justify-between">
            <div>
              <h1 className="text-sm md:text-[19px] font-bold text-TitleColor ">
                My Postings by Developers
              </h1>
              <p className="text-xs md:text-sm text-[#888888] font-normal ">
                Inspired by your search preferences
              </p>
            </div>
            <button className="text-primaryBlue text-xs md:text-lg font-normal">
              view All
            </button>
          </div>
          <div className="flex mt-8 space-x-5 overflow-scroll">
            <SuggestionCard />
            <SuggestionCard />
            <SuggestionCard />
            <SuggestionCard />
            <SuggestionCard />
            <SuggestionCard />
          </div>
        </div>
      </div>
    </>
  );
};

export const addProperty = async (
  instance: AxiosInstance,
  name: string,
  cost: string,
  desccription: string,
  size: string,
  availableFor: string,
  BHKconfig: string,
  amenities: string,
  location: string,
  area: string,
  areaId: string,
  adress: string
) => {
  const res = await instance.post("/agent/property/addProperty", {
    name: name,
    cost: cost,
    description: desccription,
    size: 200,
    availableFor: "Rent",
    BHKconfig: BHKconfig,
    amenities: ["Lift"],
    location: "Banglore",
    locationId: "62f28a1c0df5e0b03e8b3c01",
    area: "Electronics City",
    areaId: "62f2968ebf14be30bd0a16ac",
    address: "alfdfsnl",
  });
  console.log("hi", res);
  return res;
};

const AgentDashBoard = () => {
  const instance = useAxios();
  const { data } = useFetch<response<Agent>>("/agent/property");
  const { setAgentId } = useAppContext();

  useEffect(() => {
    if (data) {
      console.log("hi");
      setAgentId(data?.result?._id);
    }
  }, [data]);
  return (
    <>
      <div className="flex justify-between w-full items-center font-manrope">
        <div>
          <h1 className="text-[#707EAE] text-[10.94px]">broker</h1>
          <h2 className="text-TitleColor font-bold text-[26px]">
            Hello {data?.result?.name}
          </h2>
        </div>
      </div>
      <div className="flex space-x-[17px] mt-6 mb-8">
        <Card name="Properties" Value={18} />
        <Card name="On Discussion" Value={8} />
        <Card name="Views" Value={"130k"} />
      </div>
      <div className="mb-8">
        <h1 className="text-black text-lg">Leads</h1>
        <div className="flex space-x-[17px] mt-5">
          <Card name="Properties" Value={18} />
          <Card name="On Discussion" Value={8} />
          <Card name="Views" Value={"130k"} />
        </div>
      </div>
      <PostingByDeveloper />
    </>
  );
};

AgentDashBoard.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout Navbar={AgentNavbar}>{page}</DashBoardLayout>;
};

export default AgentDashBoard;
