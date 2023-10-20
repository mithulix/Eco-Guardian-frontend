import React from 'react'
import ServiceCard from '../mulitUse/ServiceCard';
import { useGetServicesQuery } from "@/redux/api/serviceApi";

export default function AvailableService() {
  const { data } = useGetServicesQuery({ page: 1, limit: 100,status: "upcoming",});

  return (
    <div className="section-padding">
      <h2 className="section-heading">Available Services</h2>
      <div className="card_div">
        {data?.data?.map((service: any) => (
          <ServiceCard key={service._id} data={service} />
        ))}
    </div>
  </div>
);
}