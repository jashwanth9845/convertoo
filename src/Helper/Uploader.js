export const Uploader = (req) => {
  const { accept, dropper, color, bgColor, multiple, getImage, text } = req;
  const uploaderLabel = {
    display: "flex",
    flexDirection: "column",
    width: "fit-content",
    height: "fit-content",
    // boxShadow: "rgb(0 0 0 / 15%) 0px 5px 15px 0px",
    borderRadius: "4px",
  };
  const uploaderButton = {
    height: "fit-content",
    width: "fit-content",
    color: color ? color : "#7187f5",
    padding: "15px 10px",
    fontSize: "1.2em",
    borderRadius: "4px",
    cursor: "Pointer",
  };
  const uploaderButtonImg = {
    height: "40px",
    width: "40px",
    margin: "auto",
    cursor: "pointer",
    padding: "0px 5px",
    display: dropper ? "block" : "none",
  };
  const dropperList = {
    display: "none",
    width: "100%",
    padding: "15px 0px",
    color: color ? color : "#3a5fc7",
    justifyContent: "center",
    cursor: "pointer",
    userSelect: "none",
  };
  const uploaderInputImg = {
    border: "none",
    borderTopLeftRadius: "5px",
    borderBottomLeftRadius: "5px",
    padding: "0px",
    transition: "0.3s",
    width: "0px",
    height: "45px",
  };
  const handleUrl = (e) => {
    let tempText = text ? text : "Upload file";
    if (e.target.innerHTML === "upload From URL") {
      e.target.innerHTML = tempText;
      document.getElementById("imageUrl").style.width = "415px";
      document.getElementById("imageUrl").style.padding = "0px 5px";
      document.getElementById("imageUrl").style.border = `2px solid ${
        bgColor ? bgColor : "#3a5fc7"
      }`;
      document.getElementById("imageInput").style.display = "none";
    } else if (e.target.innerHTML === tempText) {
      e.target.innerHTML = "upload From URL";
      document.getElementById("imageUrl").style.width = "0px";
      document.getElementById("imageUrl").style.padding = "0px";
      document.getElementById("imageUrl").style.border = "none";
      document.getElementById("imageInput").style.display = "block";
    }
    handleClick();
  };
  const handleClick = () => {
    let openDIv = document.getElementById("openDropper");
    if (openDIv) {
      if (openDIv.style.width === "0px") {
        openDIv.style.width = "160px";
        document.getElementById("mainDIv").style.borderBottomRightRadius =
          "0px";
        document.getElementById("arrowDiv").style.transform = "rotate(180deg)";
        [...openDIv.children].forEach((e, i) => {
          if (openDIv.children.length - 1 !== i) {
            document.getElementById(e.id).style.borderBottom = `1px solid ${
              color ? color : "#3a5fc7"
            }`;
          }
          document.getElementById(e.id).style.display = "flex";
        });
      } else {
        openDIv.style.width = "0px";
        document.getElementById("mainDIv").style.borderBottomRightRadius =
          "5px";
        document.getElementById("arrowDiv").style.transform = "rotate(0deg)";

        [...openDIv.children].forEach((e) => {
          document.getElementById(e.id).style.display = "none";
        });
      }
    }
  };
  return (
    <div style={uploaderLabel}>
      <div
        id="mainDIv"
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: bgColor ? bgColor : "#3a5fc7",
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
          borderBottomLeftRadius: "5px",
          borderBottomRightRadius: "5px",
        }}
      >
        <label
          htmlFor="convertInput"
          id="imageInput"
          onMouseEnter={(e) => {
            e.target.style.boxShadow = `${
              color ? color + "40" : "rgba(50, 50, 93, 0.25)"
            } 0px 30px 60px -12px inset,
            ${
              color ? color + "40" : "rgba(0, 0, 0, 0.3)"
            } 0px 18px 36px -18px inset`;
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = `none`;
          }}
        >
          <input
            id="convertInput"
            type="file"
            style={{ display: "none" }}
            multiple={multiple}
            accept={accept ? accept : "image/*"}
            onChange={(e) => getImage(e.target.files)}
          />
          <div style={uploaderButton}>{text ? text : "Upload file"}</div>
        </label>
        <input
          type={"text"}
          placeholder="Past image url"
          id="imageUrl"
          style={uploaderInputImg}
          onChange={(e) => {
            let val = e.target.value;
            if (val && val.includes("http")) {
              getImage(e.target.value);
            } else {
              console.log("not a valid url");
            }
          }}
        />
        <span
          style={{
            display: dropper ? "block" : "none",
            width: "1px",
            backgroundColor: color ? color : "rgb(113, 135, 245)",
          }}
        ></span>
        <div
          id="arrowDiv"
          style={uploaderButtonImg}
          onClick={() => {
            handleClick();
          }}
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 172 172"
          >
            <g
              fill="none"
              fillRule="nonzero"
              stroke="none"
              strokeWidth="1"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeDasharray=""
              strokeDashoffset="0"
              fontFamily="none"
              fontWeight="none"
              fontSize="none"
              textAnchor="none"
              style={{ mixBblendMode: "normal" }}
            >
              <path d="M0,172v-172h172v172z" fill="none"></path>
              <g fill={color ? color : "#7187f5"}>
                <path d="M86,100.84217l-27.38383,-27.38383c-2.967,-2.967 -7.783,-2.967 -10.75,0v0c-2.967,2.967 -2.967,7.783 0,10.75l33.067,33.067c2.80217,2.80217 7.33867,2.80217 10.13367,0l33.067,-33.067c2.967,-2.967 2.967,-7.783 0,-10.75v0c-2.967,-2.967 -7.783,-2.967 -10.75,0z"></path>
              </g>
            </g>
          </svg>
        </div>
      </div>
      <div
        id="openDropper"
        style={{
          width: "0px",
          flexDirection: "column",
          marginLeft: "auto",
          backgroundColor: bgColor ? bgColor + "8f" : "#3a5fc78f",
          borderBottomLeftRadius: " 5px",
          borderBottomRightRadius: "5px",
          boxShadow: `${
            bgColor ? bgColor + "8f" : "#3a5fc78f"
          } 0px 5px 10px 0px`,
        }}
      >
        <div
          id="openDropper1"
          style={dropperList}
          onClick={(e) => {
            handleUrl(e);
          }}
        >
          upload From URL
        </div>
      </div>
    </div>
  );
};
