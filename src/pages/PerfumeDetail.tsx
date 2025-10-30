import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPerfumeById, addComment } from "../services/perfumeService";
import type { Perfume } from "../types";
import { useAuth } from "../contexts/AuthContext";
import Comment from "../components/ui/Comment";

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

  if (loading) return <div className="py-12 text-center">Loading...</div>;
  if (!perfume) return <div className="py-12 text-center">Not found</div>;

  const userAlreadyCommented =
    isAuthenticated &&
    perfume.comments?.some((c) => {
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
    } catch (err: any) {
      alert(err?.response?.data?.message || err.message || "Error");
    }
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold p-6">{perfume.perfumeName}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {perfume.uri ? (
            <img
              src={perfume.uri}
              alt={perfume.perfumeName}
              className="w-full rounded shadow"
            />
          ) : (
            <div className="w-full h-64 bg-gray-100 rounded flex items-center justify-center text-gray-400">
              No image
            </div>
          )}
        </div>

        <div>
          <p className="text-gray-700 mb-4">{perfume.description}</p>
          <p className="mb-2">
            <strong>Price:</strong>{" "}
            <span className="text-indigo-700">{perfume.price}</span>
          </p>
          <p className="mb-2">
            <strong>Brand:</strong>{" "}
            {typeof perfume.brand === "object"
              ? (perfume.brand as any).brandName
              : perfume.brand}
          </p>
        </div>
      </div>

      <section className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Comments</h3>

        <div className="space-y-3">
          {perfume.comments && perfume.comments.length === 0 && (
            <p className="text-gray-500">No comments yet.</p>
          )}
          {perfume.comments?.map((c) => (
            <Comment key={c._id} comment={c} />
          ))}
        </div>
      </section>

      <section className="mt-8">
        {isAuthenticated ? (
          userAlreadyCommented ? (
            <div className="bg-blue-50 border border-blue-100 text-blue-700 p-3 rounded">
              Bạn đã bình luận sản phẩm này rồi.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rating
                </label>
                <select
                  className="mt-1 block w-32 rounded border-gray-300 shadow-sm"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                >
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Comment
                </label>
                <textarea
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>

              <div>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                  Submit
                </button>
              </div>
            </form>
          )
        ) : (
          <div className="bg-yellow-50 border border-yellow-100 text-yellow-700 p-3 rounded">
            Bạn cần{" "}
            <Link to="/login" className="underline">
              đăng nhập
            </Link>{" "}
            để bình luận.
          </div>
        )}
      </section>
    </main>
  );
};

export default PerfumeDetail;
