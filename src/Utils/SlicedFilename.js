function SlicedFilename(filename) {
  const index = filename.lastIndexOf(".");
  const name = filename.substr(0, index);
  const extension = filename.substr(index);
  return (
    <>
      {name.slice(0, 6)}
      {name.length > 6 && (
        <>
          <span>...</span>
        </>
      )}
      {extension}
    </>
  );
}
export default SlicedFilename;
