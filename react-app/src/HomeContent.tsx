import React from "react";

export function HomeContent(props) {
  return (
    <div style={{ backgroundColor: "lightGreen" }}>
      <div>Hello! I'm the parcel! With text: {props.text}.</div>
      <div>pageWidth value received as prop by parcel: {props.pageWidth}.</div>
    </div>
  );
}
