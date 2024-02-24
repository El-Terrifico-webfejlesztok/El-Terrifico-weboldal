import React, { useState } from "react";
import { ShippingAddress } from "@prisma/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ShippingAddressViewCart = ({
  address,
  reload,
}: {
  address: ShippingAddress;
  reload: Function;
}) => {
  const router = useRouter();


  const data =
    address.recipient_name +
    "_" +
    address.postal_code +
    "_" +
    address.city +
    "_" +
    address.street_address;

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
        <Link
          href={{
            pathname: "/cart/summary",
            query: { data },
          }}
        >
          <div className="space-x-2 mt-2">
            <button className="btn btn-sm btn-info">
              Kiválasztás és tovább
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ShippingAddressViewCart;
