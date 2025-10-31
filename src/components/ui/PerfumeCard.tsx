import React from "react";
import { useNavigate } from "react-router-dom";
import type { Perfume } from "../../types";
import { Card, Button, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";

type Props = {
  perfume: Perfume;
  onSelectDetail?: (id: string) => void;
};

const PerfumeCard: React.FC<Props> = ({ perfume, onSelectDetail }) => {
  const nav = useNavigate();

  const handleView = () => {
    if (onSelectDetail) onSelectDetail(perfume._id);
    else nav(`/perfume/${perfume._id}`);
  };

  return (
    <Card
      hoverable
      bordered={false}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden"
      cover={
        perfume.uri ? (
          <img
            alt={perfume.perfumeName}
            src={perfume.uri}
            className="h-full w-full object-cover rounded-t-xl hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="h-56 flex items-center justify-center bg-gray-100 text-gray-400">
            No image
          </div>
        )
      }
    >
      <div className="flex flex-col flex-1">
        {/* Name */}
        <h3 className="text-base font-semibold text-gray-800 line-clamp-1 mb-1">
          {perfume.perfumeName}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-500 line-clamp-2 mb-3">
          {perfume.description || "No description available."}
        </p>

        {/* Price + Actions */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-lg font-bold text-[#bfae9f] text-shadow-2xs">
            {perfume.price ? `${perfume.price.toLocaleString()} $` : ""}
          </span>

          <div className="flex items-center gap-2">
            <Tooltip title="View details">
              <Button
                shape="circle"
                icon={<EyeOutlined />}
                onClick={handleView}
                className="text-gray-600 hover:text-orange-500 border-none shadow-sm hover:shadow-md transition-all"
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PerfumeCard;
