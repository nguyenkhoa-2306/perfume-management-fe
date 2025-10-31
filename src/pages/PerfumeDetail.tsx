import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPerfumeById, addComment } from "../services/perfumeService";
import type { Perfume } from "../types";
import { useAuth } from "../contexts/AuthContext";
import Comment from "../components/ui/Comment";
import {
  Card,
  Rate,
  Input,
  Button,
  Divider,
  Skeleton,
  message,
  Empty,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const PerfumeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [perfume, setPerfume] = useState<Perfume | null>(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const { member, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!id) return;
    getPerfumeById(id)
      .then((d) => setPerfume(d))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const userAlreadyCommented =
    isAuthenticated &&
    perfume?.comments?.some((c) => {
      const author = c.author as any;
      return (
        author &&
        (author._id ? author._id === member?._id : author === member?._id)
      );
    });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return;
    try {
      const data = await addComment(id, rating, content);
      setPerfume(data);
      setContent("");
      message.success("Đã thêm bình luận!");
    } catch (err: any) {
      message.error(err?.response?.data?.message || "Đã xảy ra lỗi");
    }
  }

  if (loading)
    return (
      <div className="max-w-5xl mx-auto p-8">
        <Skeleton active paragraph={{ rows: 10 }} />
      </div>
    );

  if (!perfume)
    return (
      <div className="max-w-4xl mx-auto py-16 text-center">
        <Empty description="Không tìm thấy sản phẩm" />
      </div>
    );

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="bg-gray-50 flex flex-col items-center w-screen ">
      <div
        onClick={handleBack}
        className="cursor-pointer lg:mt-20 -translate-x-200 border border-gray-100 rounded-full p-2 bg-white shadow-sm hover:shadow-md transition-all "
      >
        <ArrowLeftOutlined />
      </div>

      <div className="w-6xl mx-auto mt-3">
        {/* Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Image */}
          <Card
            hoverable
            className=" rounded-2xl shadow-md border border-gray-100 flex items-center justify-center"
          >
            {perfume.uri ? (
              <img
                src={perfume.uri}
                alt={perfume.perfumeName}
                className="h-[400px] w-auto"
              />
            ) : (
              <div className="h-[400px] flex items-center justify-center bg-gray-100 text-gray-400">
                No Image
              </div>
            )}
          </Card>

          {/* Info */}
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold text-gray-800">
              {perfume.perfumeName}
            </h1>
            <p className="text-gray-600 leading-relaxed">
              {perfume.description}
            </p>

            <Divider />

            <div className="flex flex-col space-y-2">
              <p className="text-lg">
                <span className="font-medium text-gray-700">Price: </span>
                <span className="text-indigo-600 font-semibold text-xl">
                  ${perfume.price}
                </span>
              </p>
              <p className="text-lg">
                <span className="font-medium text-gray-700">Brand: </span>
                {typeof perfume.brand === "object"
                  ? (perfume.brand as any).brandName
                  : perfume.brand}
              </p>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <Divider className="my-10">Comments</Divider>

        <div className="space-y-6">
          {perfume.comments && perfume.comments.length === 0 ? (
            <p className="text-gray-500 text-center">Chưa có bình luận nào.</p>
          ) : (
            perfume.comments?.map((c) => <Comment key={c._id} comment={c} />)
          )}
        </div>

        {/* Add Comment Section */}
        <div className="mt-12 bg-white shadow-sm border border-gray-100 rounded-xl p-6">
          {isAuthenticated ? (
            userAlreadyCommented ? (
              <div className="bg-blue-50 border border-blue-100 text-blue-700 p-4 rounded-lg text-center font-medium">
                Bạn đã bình luận sản phẩm này rồi.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating
                  </label>
                  <Rate value={rating} onChange={setRating} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bình luận của bạn
                  </label>
                  <TextArea
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Chia sẻ cảm nhận của bạn..."
                    required
                  />
                </div>

                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  Gửi bình luận
                </Button>
              </form>
            )
          ) : (
            <div className="bg-yellow-50 border border-yellow-100 text-yellow-700 p-4 rounded-lg text-center font-medium">
              Bạn cần{" "}
              <Link to="/login" className="underline text-yellow-800">
                đăng nhập
              </Link>{" "}
              để bình luận.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerfumeDetail;
