import { ImCross } from "react-icons/im";
import { PiGhostFill } from "react-icons/pi";
import { Link } from "react-router-dom";

type EditTagsParams = {
  availableTags: string[];
  handleDeleteTag: (tag: string) => void;
};

function EditTags({ handleDeleteTag, availableTags }: EditTagsParams) {
  return (
    <div className="w-screen h-screen relative bg-gray-200 flex flex-col items-center justify-center gap-5">
      <Link to={".."}>
        <button className="font-belanosima font-light capitalize rounded-lg bg-gray-500 text-white px-4 py-2 absolute top-[5vh] right-[5vh]">
          back
        </button>
      </Link>
      {availableTags.length > 0 ? (
        availableTags.map((tag) => (
          <div className="w-[60vw] flex justify-between items-center py-3 px-3 border-solid border-2 border-red-500 rounded-xl">
            <div className="text-[30px]">{tag}</div>
            <div
              className="cursor-pointer"
              onClick={() => {
                handleDeleteTag(tag);
              }}
            >
              <ImCross size={30} />
            </div>
          </div>
        ))
      ) : (
        <EmptyTagList />
      )}
    </div>
  );
}

export default EditTags;

function EmptyTagList() {
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <PiGhostFill size={90} className="opacity-70 animatedGhost" />
      <span className="text-[25px] capitalize">there is no tags</span>
    </div>
  );
}
