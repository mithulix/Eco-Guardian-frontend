"use client";
import ServiceCard from "@/components/mulitUse/ServiceCard";
import { useGetServicesQuery } from "@/redux/api/serviceApi";

export default function ServicesByCategory({ params }: any) {
  const { data } = useGetServicesQuery({ category: params.id });

  return (
    <div className="min-h-screen my-8">
      <h3 className="text-3xl text-center font-bold">Services by Category</h3>
      {data?.data?.length ? (
        <div className="section-padding">
          <div className="card_div">
            {data?.data?.map((service: any) => (
              <ServiceCard key={service._id} data={service} />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center ">
          No services isn&apos;t created yet with this category.
        </p>
      )}
    </div>
  );
}