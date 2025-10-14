function SlicedFilename(filename) {
  const index = filename.lastIndexOf(".");
  const name = filename.substr(0, index);
  const extension = filename.substr(index);
  return {name, extension};
}
export default SlicedFilename;
