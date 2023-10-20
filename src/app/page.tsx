"use client";
import AvailableService from "@/components/homepage/AvailableService";
import Banner from "@/components/homepage/Banner";
import Blogs from "@/components/homepage/Blogs";
import CategorySection from "@/components/homepage/CategorySection";
import ClientReview from "@/components/homepage/ClientReview";
import FAQ from "@/components/homepage/FAQ";
import LatestNews from "@/components/homepage/LatestNews";
import Overview from "@/components/homepage/Overview";
import UpcomingService from "@/components/homepage/UpcomingService";
import { useGetContentsQuery } from "@/redux/api/contentApi";

export default function Home() {
  const { data } = useGetContentsQuery({});
  const isFAQVisible =
    data?.data?.find((content: any) => content.title == "FAQ")?.status ==
    "visible";

  const isBlogVisible =
    data?.data?.find((content: any) => content.title == "Blog")?.status ==
    "visible";

  const isNewsVisible =
    data?.data?.find((content: any) => content.title == "News")?.status ==
    "visible";

  return (
    <main>
      <Banner />
      <CategorySection />
      <AvailableService />
      <UpcomingService />
      <ClientReview />
      {isNewsVisible && <LatestNews />}
      {isBlogVisible && <Blogs />}
      {isFAQVisible && <FAQ />}
    </main>
  );
}