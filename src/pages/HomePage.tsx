import React, { useEffect, useState } from "react";
import { getAllPerfumes } from "../services/perfumeService";
import PerfumeCard from "../components/ui/PerfumeCard";
import type { Perfume } from "../types";
import { Spin, Typography, Divider, Empty } from "antd";

const { Title } = Typography;

const HomePage: React.FC = () => {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPerfumes()
      .then((data) => setPerfumes(data))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className=" bg-gray-50 flex flex-col items-center">
      <div
        className="h-screen w-screen inset-0 bg-cover bg-center text-white text-8xl font-bold flex items-center justify-center text-center px-10 text-shadow-lg"
        style={{ backgroundImage: "url('/images/home-bg.jpg')" }}
      >
        Explore the world of Fragrances
      </div>
      {/* Header */}
      <div className="text-center m-6">
        <Title level={2} className="!text-3xl !font-bold !text-gray-800">
          Sản phẩm nổi bật
        </Title>
        <Divider className="border-t-2! border-[#bfae9f]! w-16 mx-auto" />
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center h-[60vh]">
          <Spin size="large" tip="Đang tải sản phẩm..." />
        </div>
      ) : perfumes.length === 0 ? (
        <Empty
          description="Không có sản phẩm nào"
          className="mt-20"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 px-4 md:px-10 lg:px-20 w-full max-w-[1300px]">
          {perfumes.map((p) => (
            <PerfumeCard key={p._id} perfume={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
