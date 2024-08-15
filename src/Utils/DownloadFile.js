import { server } from "./../Actions/Index";
function DownloadFile(message) {
  const Download = async () => {
    console.log(message);
    try {
      const fileName = message.file.split("/").pop();
      const response = await server.get(`/message/download/${fileName}`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", message.content);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  Download();
}
export default DownloadFile;
