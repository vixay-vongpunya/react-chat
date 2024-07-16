import {
  Placeholder,
  PlaceholderHeader,
  PlaceholderImage,
  PlaceholderLine,
} from "semantic-ui-react";

function AddFriendPlaceholder() {
  return (
    <div className="w-full flex border ">
      <div className="w-full h-full relative flex flex-col  items-center">
        <div className="w-full relative p-3"></div>
        <div className="h-full flex flex-col justify-end items-center">
          <div className="w-44 h-44 relative p-1 ">
            <Placeholder
              style={{ height: 150, width: 150, borderRadius: "50%" }}
            >
              <PlaceholderImage />
            </Placeholder>
          </div>
          <Placeholder>
            <PlaceholderLine length="short" />
          </Placeholder>
        </div>
        <div>
          <div className="pt-3">
            <Placeholder>
              <PlaceholderLine length="short" />
            </Placeholder>
            <div className="w-1/2 h-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddFriendPlaceholder;
