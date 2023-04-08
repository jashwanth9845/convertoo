import React, { useEffect, useMemo, useState } from "react";
import styles from "../CSS/help_new.module.css";
export default function Help_New() {
  const [style, setStyle] = useState(-350);
  const [notificationLen, setNotificationsLen] = useState(0);

  return (
    <div className={styles.help_newDiv}>
      <div
        className={styles.help_newInnerDiv}
        onClick={() => {
          setStyle(style === -350 ? 0 : -350);
        }}
      >
        ?
        <span
          className={`${styles.dot} ${notificationLen === 0 && styles.hideDot}`}
        ></span>
      </div>
      <DropDiv
        style={style}
        setStyle={setStyle}
        setNotificationsLen={setNotificationsLen}
      />
    </div>
  );
}

const DropDiv = ({ style, setStyle, setNotificationsLen }) => {
  const ManualNotifications = [
    {
      id: "notification1",
      data: "Now, you can drag and drop multiple images at once.",
      time: "08 APR 2023",
    },
  ];
  const [notifications, setNotifications] = useState(ManualNotifications);

  useEffect(() => {
    const closedNotification = localStorage.getItem("closedNotification");
    if (closedNotification) {
      setNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification) => notification.id !== closedNotification
        )
      );
    }
  }, []);

  useEffect(() => {
    setNotificationsLen(notifications.length);
  }, [notifications.length]);

  const handleClose = (id) => {
    localStorage.setItem("closedNotification", id);
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <>
      <div
        className={styles.bg_div}
        style={{ display: style === -350 ? "none" : "block" }}
        onClick={() => setStyle(style === -350 ? 0 : -350)}
      ></div>
      <div
        className={`${styles.dropNewDiv} myBackground`}
        style={{ right: style }}
      >
        <p className={`${styles.notificationHead} mycolor`}>Notifications</p>
        {notifications.length >= 1 ? (
          notifications.map((notification, i) => (
            <div className={styles.items} key={notification.id}>
              <div
                className={styles.closeBadge}
                onClick={() => handleClose(notification.id)}
              >
                &#x2715;
              </div>
              {notification.data}
              <p className="mycolor">
                updated on <span></span>
                {notification.time}
              </p>
            </div>
          ))
        ) : (
          <>
            <p className={styles.noNotificats}>
              There are no new notifications.
            </p>
            <p
              className={`${styles.oldNotificats} mycolor`}
              onClick={() => setNotifications(ManualNotifications)}
            >
              View notification history
            </p>
          </>
        )}
        {/* <hr style={{ width: "100%", margin: "5px 0" }} />
        <p className="mycolor">Would you like to share some thoughts here?</p>
        <FeedBack close={style} /> */}
      </div>
    </>
  );
};

// const FeedBack = ({ close }) => {
//   const [placeholder, setPlaceholder] = useState("who need name for feedback");
//   const [enterData, setEnterData] = useState("");
//   const [buttonText, setButtonText] = useState("Yea, true");
//   const [buttonText0, setButtonText0] = useState("I do");
//   const [formData, setFormData] = useState({});
//   useEffect(() => {
//     if (close === -350) {
//       setEnterData("");
//       setFormData({});
//     }
//   }, []);

//   useEffect(() => {
//     if (enterData === "feedback") {
//       setButtonText("Share my thought");
//       setButtonText0("Previous");
//     } else if (enterData === "name") {
//       setButtonText("Next");
//       setButtonText0("I do");
//     } else {
//       setPlaceholder("who need name for feedback");
//       setButtonText("Next");
//       setButtonText0("I do");
//     }
//   }, [enterData]);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = () => {};

//   return (
//     <>
//       {!enterData || enterData !== "feedback" ? (
//         <input
//           className={styles.feedback}
//           style={{ border: enterData && "1px solid #3a5fc7" }}
//           type={"text"}
//           name="userName"
//           defaultValue={formData?.userName}
//           onChange={(e) => handleChange(e)}
//           readOnly={enterData ? false : true}
//           placeholder={placeholder}
//         ></input>
//       ) : (
//         <textarea
//           className={styles.feedback}
//           name="feedback"
//           onChange={(e) => handleChange(e)}
//           style={{
//             height: "100px",
//             lineHeight: "20px",
//           }}
//           placeholder={placeholder}
//         />
//       )}
//       <div className={styles.feedbackButtons}>
//         <button
//           style={{
//             display:
//               enterData == "name" &&
//               formData?.userName &&
//               formData?.userName.length >= 5
//                 ? "none"
//                 : "block",
//           }}
//           onClick={() => {
//             if (enterData === "feedback") {
//               if (formData?.userName && formData?.userName.length >= 5) {
//                 setEnterData("name");
//               } else {
//                 setPlaceholder("who need name for feedback");
//                 setEnterData("");
//               }
//             } else {
//               setEnterData("name");
//             }
//             setPlaceholder("Enter your name");
//           }}
//         >
//           {buttonText0}
//         </button>
//         <button
//           disabled={
//             enterData === "feedback" &&
//             (!formData?.feedback || formData?.feedback.length <= 10)
//               ? true
//               : enterData === "name" &&
//                 (!formData?.userName || formData?.userName.length <= 5)
//               ? true
//               : false
//           }
//           onClick={() => {
//             if (buttonText !== "Share my thought") {
//               setEnterData("feedback");
//               setPlaceholder("Enter the thought you want to share");
//             } else if (buttonText === "Share my thought") {
//               handleSubmit();
//             }
//           }}
//         >
//           {buttonText}
//         </button>
//       </div>
//     </>
//   );
// };
