import React, { useMemo } from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import { HomeContent } from "./HomeContent";
import { ParcelContainer } from "./ParcelContainer";
import { useLayoutType } from "./useLayoutType";

export default function App({ name }) {
  return <Home />;
}

function Home() {
  const pageWidth = useLayoutType();
  const parcelInfo = useMemo(
    () => ({
      load: () =>
        Promise.resolve(
          singleSpaReact({ React, ReactDOM, rootComponent: HomeContent })
        ),
      name: "Home",
      props: { text: "foo bar baz" },
    }),
    []
  );
  return (
    <div>
      Current pageWidth value from the hook: {pageWidth}
      <ParcelContainer parcelInfo={parcelInfo} />
    </div>
  );
}
