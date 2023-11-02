import { memo, useMemo, useRef, useState, useCallback, useEffect } from "react";
import { Uploader } from "../Helper/Uploader";
import styles from "../CSS/home.module.css";
import { getFileNameWithoutExtention } from "../Helper/helper";
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
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (files) {
      showImg();
    }
  }, [files]);

  useEffect(() => {
    if (Type) {
      convertTo();
    }
  }, [Type]);

  const handleResize = useCallback(() => {
    const canvas = document.querySelector("canvas");
    if (window.innerWidth <= 600 && canvas) {
      canvas.style.width = "300px";
    } else if (canvas) {
      canvas.style.width = "100%";
    }
  }, []);

  const getImage = async (file) => {
    setfiles(file);
    document.getElementById("showLoading").style.display = "flex";
  };
  const showImg = async () => {
    const canvasList = [];

    if (typeof files === "string") {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = files;

      await new Promise((resolve, reject) => {
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, img.width, img.height);
          if (document.documentElement.clientWidth <= 500) {
            canvas.style.width = "300px";
          } else {
            canvas.style.width = "400px";
          }
          canvasList.push(canvas);
          resolve();
        };

        img.onerror = reject;
      });
    } else {
      const promises = Array.from(files).map((file, i) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = URL.createObjectURL(file);

          img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, img.width, img.height);
            canvas.style.fontFamily = "image" + i;
            if (document.documentElement.clientWidth <= 500) {
              canvas.style.width = "300px";
            } else {
              canvas.style.width = "100%";
            }
            canvasList.push(canvas);
            resolve();
          };

          img.onerror = () => {
            URL.revokeObjectURL(img.src);
            console.log("Cannot load image");
            resolve();
          };
        });
      });

      await Promise.all(promises);
    }

    const canvasContainer = document.getElementById("canvasContainer");
    canvasContainer.style.minHeight = "360px";
    canvasContainer.innerHTML = "";
    document.querySelector("#headingText > h3").style.fontSize = "2rem";

    canvasList.forEach((canvas) => {
      const div = document.createElement("div");
      div.style.position = "relative";
      div.classList.add("canvasDiv");
      div.style.transition = "all 0.3s ease";
      div.style.display = "flex";
      div.style.maxHeight = "360px";
      div.style.justifyContent = "center";
      canvas.style.height = "auto";
      div.appendChild(canvas);

      const showDownload = document.createElement("p");
      showDownload.id = canvas.style.fontFamily;
      showDownload.classList.add(styles.downloadshow);
      const img = document.createElement("img");
      img.src = "./Images/downloader.svg";
      showDownload.appendChild(img);
      div.appendChild(showDownload);

      canvasContainer.appendChild(div);
    });

    document.getElementById("bg_image").style.display = "none";
    document.getElementById("options").style.display = "flex";
    document.getElementById("showSlider").style.display =
      files && files.length > 1 ? "block" : "none";
    document.getElementById("showLoading").style.display = "none";
  };

  const convertTo = () => {
    for (let i = 0; i < files.length; i++) {
      document.getElementById("image" + i).style.display = "flex";
      const file = files[i];
      const name = file.name;
      const mime_type = `image/${Type}`;
      const quality = qualityRate(file.size);

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const dataURL = canvas.toDataURL(mime_type, quality);
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = `${getFileNameWithoutExtention(name)}.${Type}`;
        link.click();
        document.getElementById("image" + i).style.display = "none";
        setType("");
      };
      img.onerror = function () {
        console.log("Cannot load image");
      };
      const blobURL = URL.createObjectURL(file);
      img.src = blobURL;
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

  const allowDrop = (ev) => {
    ev.preventDefault();
    document.getElementById("showdraging").style.display = "flex";
  };
  const drop = (ev) => {
    ev.preventDefault();
    var data = ev.dataTransfer.files;
    document.getElementById("showLoading").style.display = "flex";
    setfiles(data);
  };
  return (
    <>
      <div
        id='showdraging'
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
        <div className={styles.headingDiv} id='headingText'>
          <h3>Upload an image for Type conversion</h3>
        </div>
        <div
          className={`${styles.InnerDiv} myBackground`}
          style={{ position: "relative" }}
        >
          <p id='showLoading' className={styles.showLoading}>
            <img src='./Images/loader.svg' className='myBackground' />
          </p>
          <div className={styles.Mainaction}>
            <div className={styles.action}>
              <Uploader
                accept={"image/*"}
                multiple={true}
                dropper={true}
                text={"Upload Images"}
                getImage={getImage}
              />
              <div className={styles.dropText} id='dropperText'>
                or drop a file
              </div>
              <div className={styles.dropdownOptions} id='options'>
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
            <div className={styles.viewSlider} id='showSlider'>
              <Slider fileSize={files} />
            </div>
            <div style={{ position: "relative" }}>
              <div className={styles.bg_image} id='bg_image'>
                <img src='./Images/drop_bg.png' />
              </div>
              <div
                className={styles.canvasContainer}
                id='canvasContainer'
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const Slider = memo(({ fileSize }) => {
  const valueDisplay = useRef();
  const myRange = useRef();
  const rangeValue = fileSize ? fileSize.length : 20;
  const [defaultValue, setDefaultValue] = useState(null);

  const handleViewBy = (e) => {
    const value = e.target.value;
    const min = e.target.min;
    const max = e.target.max;
    valueDisplay.current.innerHTML = `view By: ${value}`;
    const newValue = Number(((value - min) * 80) / (max - min)),
      newPosition = 10 - newValue * 0.2;
    valueDisplay.current.style.left = `calc(${newValue}% + (${newPosition}px))`;
    const elements = document.querySelectorAll(".canvasDiv");
    if (elements.length) {
      elements.forEach((elem) => {
        const calval = `calc(100% / ${value} - 40px)`;
        elem.style.width = calval;
        elem.style.height = "auto";
        elem.style.margin = "0 20px";
        elem.style.flexBasis = calval;
      });
    }
    setDefaultValue(value);
  };

  const memoizedDefaultValue = useMemo(
    () => defaultValue ?? "auto",
    [defaultValue]
  );

  return (
    <div className={styles.sliderContainer}>
      <label
        className={`${styles.rangerLabel} myBackground mycolor`}
        ref={valueDisplay}
      >
        view By: {memoizedDefaultValue}
      </label>
      <input
        className={styles.ranger}
        type='range'
        min={1}
        max={rangeValue}
        ref={myRange}
        value={defaultValue ?? 0}
        onChange={handleViewBy}
      />
    </div>
  );
});
