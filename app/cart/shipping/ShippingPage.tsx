"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {
  Order,
  Payment,
  Review,
  ShippingAddress,
  User_role,
} from "@prisma/client";
import ShippingAddressViewCart from "@/app/components/cart/shipping/ShippingAddressViewCart";
import ShippingAddressFormCart from "@/app/components/cart/shipping/ShippingAddressFormCart";
import UserProfileSettings from "@/app/components/user/profile/UserProfileSettings";
import { UserView } from "@/app/components/user/profile/UserProfileSettings";
import CartSteps from "@/app/components/cart/CartSteps";


interface userData {
  id: number;
  username: string;
  email: string;
  image: string | null;
  role: User_role;
  created_at: Date;
  Order: [Order];
  Payment: [Payment];
  Review: [Review];
  ShippingAddress: [ShippingAddress];
}

function ShippingPage() {
  const [userData, setUserData] = useState<userData | null>(null);
  const [loading, setLoading] = useState(true);
  const [userView, setUserView] = useState<UserView>();

  async function fetchData() {
    setLoading(true);
    try {
      // Make a GET request to the API
      const response = await fetch("/api/user/settings", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Include any necessary headers, like authorization headers if needed
        },
      });

      // Check if the response is successful (status code 200-299)
      if (response.ok) {
        // Parse the JSON data from the response
        const data = await response.json();
        console.log("API Response:", data);
        setUserData(data);
        {
          /**Construct the user data from the response */
        }
        setUserView({
          id: data.id,
          username: data.username,
          email: data.email,
          image: data.image,
          role: data.role,
          created_at: data.created_at,
        });
        console.log(userView);
      } else {
        // Handle error responses
        console.error("Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("An error occurred during the fetch:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div>
      <div>
        <CartSteps currentStep={2} />
      </div>
      <div id="address" className="divider">
        Szállítási adatok
      </div>

      <div className="sm:w-1/2 mx-auto mb-4">
        <ShippingAddressFormCart
          reload={fetchData}
        />
      </div>

      <div>
        <div className="mx-auto text-lg font-medium text-center justify-center items-center">
          Mentett adatok:
        </div>
        <div className="sm:w-1/2 mx-auto">
          {userData && userData.ShippingAddress.length > 0 ? (
            userData.ShippingAddress.map((address) => (
              <ShippingAddressViewCart
                key={address.id}
                address={address}
                reload={fetchData}
              />
            ))
          ) : loading ? (
            <div className="mx-auto loading loading-dots"></div>
          ) : (
            <p className="text-center truncate">
              Még nincsenek szállítási címeid
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
export default ShippingPage;
