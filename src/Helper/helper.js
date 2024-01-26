export const getFileNameWithoutExtention = (e) => {
  if (e && (e instanceof File || typeof e === "string")) {
    return e instanceof File
      ? FileHasExtention(e)
        ? e.name?.split(
            "." + e.name.split(".")[e.name.split(".").length - 1]
          )[0]
        : e.name
      : typeof e == "string"
      ? FileHasExtention(e)
        ? e?.split("." + e.split(".")[e.split(".").length - 1])[0]
        : e
      : console.error(e + " arguement string or file");
  }
};

export const getFileExtension = (e) => {
  e = typeof e == "string" ? (e.indexOf("?") > -1 ? e.split("?")[0] : e) : e;
  return e instanceof File
    ? "." + e.name?.split(".")[e.name?.split(".").length - 1]
    : typeof e == "string"
    ? "." + e?.split(".")[e?.split(".").length - 1]
    : console.error(e + "arguement string or file");
};

export const FileHasExtention = (input) => {
  return input instanceof File
    ? input.name.match(/\.(jpg|jpeg|png|glb|webp)$/i)
    : typeof input == "string"
    ? input.match(/\.(jpg|jpeg|png|glb|webp)$/i)
    : console.error("arguement string or file");
};
