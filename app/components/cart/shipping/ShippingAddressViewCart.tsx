import React, { useState } from "react";
import { ShippingAddress } from "@prisma/client";
import { useRouter } from "next/navigation";


const ShippingAddressViewCart = (
  { address, reload }: { address: ShippingAddress; reload: Function },
) => {
  const router = useRouter();

  const handleNext = () => {
    router.push("/cart/summary"); // Change '/another-page' to the desired page URL
  };

  return (
    <div className="collapse transition-color bg-base-200 my-1">
      <input type="checkbox" />
      <div className="collapse-title text-lg font-medium truncate">
        Cím:{" "}
        <strong>
          {address.postal_code}, {address.city}, {address.street_address}
        </strong>{" "}
        {address.is_default_address ? (
          <span className="badge badge-lg badge-primary ml-4">
            Alapértelmezett
          </span>
        ) : (
          <></>
        )}
      </div>
      <div className="collapse-content">
        <p>
          <strong>Átvevő Neve:</strong> {address.recipient_name}
        </p>
        <p>
          <strong>Irányítószám:</strong> {address.postal_code}
        </p>
        <p>
          <strong>Város:</strong> {address.city}
        </p>
        <p>
          <strong>Szállítási cím:</strong> {address.street_address}
        </p>
        <div className="space-x-2 mt-2">
          <button className="btn btn-sm btn-info" onClick={handleNext}>
            Kiválasztás és Tovább
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddressViewCart;
