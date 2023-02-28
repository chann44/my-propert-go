import { useRouter } from "next/router";
import {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { VscListFilter } from "react-icons/vsc";
import { Propery, ProperyResArr } from "src/@types";
import SearchResult from "src/componets/search/searchResults";
import SearchSideOptions from "src/componets/search/serachSideoptions";
import { useAppContext } from "src/Context/AppContext";
import Layout from "src/Layout/main";
import { useFetch } from "src/lib/hooks/useFetch";
interface FilterContextInterface {
  selected: string[] | [];
  setSelected: Dispatch<SetStateAction<string[] | []>>;
}
interface IContextProps {
  children: ReactNode;
}
export const FilterContext = createContext<FilterContextInterface>(
  {} as FilterContextInterface
);
export const useFilterContext = () => {
  return useContext(FilterContext);
};

export const FilterContextProvder = ({ children }: IContextProps) => {
  const [selected, setSelected] = useState<string[]>([]);
  const shared = {
    selected,
    setSelected,
  };
  return (
    <>
      <FilterContext.Provider value={shared}>{children}</FilterContext.Provider>
    </>
  );
};

const Search = () => {
  const { resCount } = useAppContext();
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const locName = router.query.query;
  const { data } = useFetch<ProperyResArr>(
    `/property/getPropertiesByLocation/${locName}`
  );
  console.log(data);
  const { selected } = useFilterContext();
  const [PropertyResult, setPropertyResult] =
    useState<Propery[] | undefined | null>(null);

  useEffect(() => {
    setPropertyResult(data?.result);
  }, [data]);

  return (
    <>
      <FilterContextProvder>
        <div className="lg:p-10 md:p-8 mx-auto font-manrope overflow-hidden">
          {/* top part */}
          <div className="p-4 md:pb-10 md:block flex items-center justify-between">
            <h1 className="text-lg md:text-2xl text-TitleColor font-bold">
              {resCount} Results in {data?.result[0].location.name}
            </h1>
            <div
              className="lg:hidden block p-3 cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <VscListFilter className="text-2xl" />
            </div>
          </div>
          {/* main part */}
          <div className="flex w-full overflow-hidden ">
            <div className="hidden lg:block  border  min-h-screen h-max  bg-white w-full shrink  max-w-[290px]  rounded-lg p-4">
              <SearchSideOptions
                data={PropertyResult}
                setData={setPropertyResult}
              />
            </div>
            <div
              className={`absolute z-40 top-0 transition-all duration-150 ease-in-out  ${
                open ? "-translate-x-0" : "-translate-x-full"
              }  border  min-h-screen h-max  bg-white w-full shrink  max-w-[290px]  rounded-lg p-4`}
            >
              <SearchSideOptions
                data={PropertyResult}
                setData={setPropertyResult}
              />
            </div>
            <div className="lg:ml-10 w-full overflow-hidden ">
              <SearchResult data={PropertyResult} />
            </div>
          </div>
        </div>
      </FilterContextProvder>
    </>
  );
};

export default Search;

Search.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
