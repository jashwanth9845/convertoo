import React, { useState, useEffect } from "react";
import { colourNameToHex } from "../Helper/colorConversion";
import { Uploader } from "../Helper/Uploader";
import styles from "../CSS/home.module.css";
const options = [
  { text: "GIF" },
  { text: "PNG" },
  { text: "JPG" },
  { text: "WEBP" },
];
export default function HomeComponent() {
  const [files, setfiles] = useState();
  const [Type, setType] = useState();

  useEffect(() => {
    window.addEventListener("resize", handleresize);
    return () => window.removeEventListener("resize", handleresize);
  }, []);

  useEffect(() => {
    if (files) {
      showImg();
    }
  }, [files]);

  useEffect(() => {
    if (Type) {
      convertTo();
      document.getElementById("showdownload").style.display = "flex";
    }
  }, [Type]);

  const handleresize = () => {
    if (window.innerWidth <= 600) {
      if (
        document.getElementById("canvas") &&
        document.getElementById("canvas").style.width
      )
        document.getElementById("canvas").style.width = "300px";
    } else {
      if (
        document.getElementById("canvas") &&
        document.getElementById("canvas").style.width
      )
        document.getElementById("canvas").style.width = "500px";
    }
  };
  const getImage = async (file) => {
    setfiles(file);
  };
  const showImg = () => {
    if (typeof files === "string") {
      let img = document.createElement("img");
      img.crossOrigin = "anonymous";
      img.src = files;
      img.onload = function () {
        const canvas = document.getElementById("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        if (document.documentElement.clientWidth <= 500) {
          canvas.style.width = "300px";
        } else {
          canvas.style.width = "500px";
        }
        document.getElementById("bg_image").style.display = "none";
        document.getElementById("options").style.display = "flex";
        canvas.style.height = "auto";
      };
    } else {
      const blobURL = URL.createObjectURL(files[0]);
      const img = new Image();
      img.src = blobURL;

      img.onerror = function () {
        URL.revokeObjectURL(this.src);
        console.log("Cannot load image");
      };

      img.onload = function () {
        const canvas = document.getElementById("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        if (document.documentElement.clientWidth <= 500) {
          canvas.style.width = "300px";
        } else {
          canvas.style.width = "500px";
        }
        document.getElementById("bg_image").style.display = "none";
        document.getElementById("options").style.display = "flex";
        canvas.style.height = "auto";
      };
    }
  };
  const convertTo = () => {
    if (typeof files == "string") {
      let img = document.createElement("img");
      img.crossOrigin = "anonymous";
      img.src = files;
      img.onload = function () {
        URL.revokeObjectURL(this.src);
        const mime_type = `image/${Type}`;
        const quality = qualityRate(files.size);
        const canvas = document.getElementById("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        canvas.toBlob(
          (blob) => {
            let localfile = new File(
              [blob],
              `ConvertedImage.${Type}`,
              { type: `image/${Type}`, lastModified: new Date().getTime() },
              "utf-8"
            );
            let container = new DataTransfer();
            container.items.add(localfile);
            [...container.files].forEach((e) => {
              download(URL.createObjectURL(e), e.name);
            });
          },
          mime_type,
          quality
        );
      };
    } else {
      const blobURL = URL.createObjectURL(files[0]);
      const img = new Image();
      img.src = blobURL;

      img.onerror = function () {
        URL.revokeObjectURL(this.src);
        console.log("Cannot load image");
      };

      img.onload = function () {
        URL.revokeObjectURL(this.src);
        const mime_type = `image/${Type}`;
        const quality = qualityRate(files[0].size);
        const canvas = document.getElementById("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        // canvas.style.width = "500px";
        document.getElementById("bg_image").style.display = "none";
        document.getElementById("options").style.display = "flex";
        canvas.style.height = "auto";
        canvas.toBlob(
          (blob) => {
            let localfile = new File(
              [blob],
              files[0].name.split(
                "." +
                  files[0].name.split(".")[files[0].name.split(".").length - 1]
              )[0] +
                "." +
                Type,
              { type: `image/${Type}`, lastModified: new Date().getTime() },
              "utf-8"
            );
            let container = new DataTransfer();
            container.items.add(localfile);
            [...container.files].forEach((e) => {
              download(URL.createObjectURL(e), e.name);
            });
          },
          mime_type,
          quality
        );
      };
    }
  };
  const qualityRate = (fileSize) => {
    let QUALITY = 0.5;

    if (1000000 > fileSize) {
      QUALITY = 0.5;
    } else if (3000000 > fileSize) {
      QUALITY = 0.7;
    } else if (5000000 > fileSize) {
      QUALITY = 0.5;
    } else if (10000000 > fileSize) {
      QUALITY = 0.9;
    } else {
      QUALITY = 0.1;
    }
    return QUALITY;
  };

  const download = (url, name) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    document.getElementById("showdownload").style.display = "none";
    setType("");
  };
  const allowDrop = (ev) => {
    ev.preventDefault();
    document.getElementById("showdraging").style.display = "flex";
  };
  const drop = (ev) => {
    ev.preventDefault();
    var data = ev.dataTransfer.files;
    setfiles(data);
  };
  return (
    <>
      <div
        id="showdraging"
        onDrop={(e) => {
          drop(e);
          document.getElementById("showdraging").style.display = "none";
        }}
        onDragOver={(e) => {
          allowDrop(e);
        }}
        onDragLeave={() => {
          document.getElementById("showdraging").style.display = "none";
        }}
        style={{
          display: "none",
          position: "absolute",
          height: "-webkit-fill-available",
          width: " -webkit-fill-available",
          backgroundColor: " #4d4d508a",
          borderRadius: "5px",
          fontSize: "6em",
          color: "#0b2043",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
        }}
      >
        {`{ drop here }`}
      </div>
      <div
        className={styles.mainContainer}
        onDragOver={(e) => {
          allowDrop(e);
        }}
      >
        <div className={styles.headingDiv}>
          <h3>Upload an image for Type conversion</h3>
        </div>
        <div className={styles.InnerDiv}>
          <div className={styles.Mainaction}>
            <div className={styles.action}>
              <Uploader
                accept={"image/*"}
                multiple={true}
                dropper={true}
                text={"Upload Image"}
                getImage={getImage}
                // color={colourNameToHex("red")}
                // bgColor={colourNameToHex("orange")}
              />
              <div className={styles.dropText}>or drop a file</div>
              <div className={styles.dropdownOptions} id="options">
                <p style={{ margin: "0px" }}>Convertion Types</p>
                <div>
                  {options.map((e, i) => {
                    return (
                      <p
                        key={i}
                        id={e.text}
                        onClick={() => {
                          setType(e.text.toLowerCase());
                        }}
                      >
                        {e.text}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className={styles.bg_image} id="bg_image">
              <img src="./Images/drop_bg.png" />
            </div>
            <div style={{ position: "relative" }}>
              <p id="showdownload" className={styles.downloadshow}>
                <img src="./Images/downloader.svg" />
              </p>
              <canvas id="canvas"></canvas>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
