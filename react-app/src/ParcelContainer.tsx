import React, { useContext, useEffect, useState } from "react";
import Parcel from "single-spa-react/parcel";
import { SingleSpaContext } from "single-spa-react";
import { useLayoutType } from "./useLayoutType";

export function ParcelContainer({ parcelInfo }) {
  const [lifecycle, setLifecycle] = useState();
  const pageWidth = useLayoutType();
  const { mountParcel } = useContext(SingleSpaContext);

  useEffect(() => {
    let active = true;
    parcelInfo.load().then(({ default: result, ...lifecycle }) => {
      if (active) {
        console.log("loaded workspace lifecycle");
        setLifecycle(result ?? lifecycle);
      }
    });
    return () => {
      active = false;
      console.log("unloading!");
    };
  }, [parcelInfo]);

  const props = React.useMemo(
    () =>
      parcelInfo && {
        pageWidth,
        ...parcelInfo.props,
      },
    [parcelInfo, pageWidth]
  );
  if (!lifecycle) {
    console.log("lifecycle is ", lifecycle);
  }
  return (
    <div>
      {lifecycle ? (
        <Parcel
          key={parcelInfo.name}
          config={lifecycle}
          mountParcel={mountParcel}
          {...props}
        />
      ) : (
        "loading!"
      )}
    </div>
  );
}
