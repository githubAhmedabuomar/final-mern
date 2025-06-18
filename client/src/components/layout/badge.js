import React from "react";

const Badge = ({ value }) => {
  return (
    <>
      {value ? (
        <div
          style={{
            border: "1.5px solid green",
            borderRadius: "50%",
            fontWeight: "bold",
            color: "red",
            background: "white",
          }}
          className="d-flex justify-content-center align-items-center py-1 px-1"
        >
          {value}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Badge;
