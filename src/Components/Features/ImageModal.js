import ImageCropper from "./ImageCropper";

const ImageModal = ({ updateImage, closeModal }) => {
  return (
    <div
      className="relative z-10"
      aria-labelledby="crop-image-dialog"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-200 bg-opacity-50 transition-all backdrop-blur-sm"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center px-2 py-12 text-center ">
          <div className="relative w-[95%] sm:w-[70vh] min-h-[60vh] rounded-2xl bg-gray-400 text-slate-100 text-left shadow-xl transition-all">
            <div className="px-5 py-4">
              <button
                type="button"
                className="rounded-md p-1 inline-flex items-center justify-center text-gray-700  focus:outline-none absolute top-2 right-2"
                onClick={closeModal}
              >
                close
              </button>
              <ImageCropper updateImage={updateImage} closeModal={closeModal} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ImageModal;
