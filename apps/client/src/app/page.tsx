import CategoryList from "@/components/category-list";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  return (
    <div className="flex">
      <CategoryList />
      <h3 className="text-center text-slate-400 font-light text-2xl mt-40 italic grow flex items-start justify-center">
        <span className="flex items-center">
          <FontAwesomeIcon className="mr-5" height={20} icon={faArrowLeftLong} />
          Select a list to get started.
        </span>
      </h3>
    </div>
  );
}
