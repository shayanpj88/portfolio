"use client";
import { useCallback, useState } from "react";
import axios from "axios";
import ImageUploadModal from "../ui/ImageUploadModal";
import { FormStatus, FormErrors } from "@/types/forms";
import { ArticleForm } from "@/types/article";
import createSlug from "@/util/createSlug";
import { useSearchParams } from "next/navigation";

interface Props {
  article: ArticleForm;
  mode: "new" | "edit";
}

export default function EditArticleForm({ article, mode }: Props) {
  const [formData, setFormData] = useState<ArticleForm>(article);
  const [errors, setErrors] = useState<FormErrors<ArticleForm>>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [showModal, setShowModal] = useState(false);
  const searchParams = useSearchParams();
  const isCreated = searchParams.get("created") === "true";

  const handleImageUploaded = (url: string) => {
    setFormData((prev) => ({ ...prev, featureImage: url }));
  };

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  // useCallback to prevent creating new handleChange function on every component render
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const validate = (): boolean => {
    const newErrors: FormErrors<ArticleForm> = {};

    if (!formData.title?.trim()) newErrors.title = "Title is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    const url = "/api/article";
    const method = mode === "edit" ? "put" : "post";

    try {
      await axios({ method, url, data: formData });

      if (mode === "new") {
        window.location.href = `${createSlug(formData.title)}/edit`;
      }

      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block font-medium">Title</label>
          <input
            name="title"
            type="text"
            value={formData.title ?? ""}
            onChange={handleChange}
            className="mt-1 w-full rounded border px-3 py-2"
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        {/* description */}    
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description ?? ""}
            onChange={handleChange}
            className="mt-1 w-full rounded border px-3 py-2"
            rows={3}
          />
        </div>

        {/* htmlContent */}
        <div>
          <label className="block font-medium">Content</label>
          <textarea
            name="htmlContent"
            value={formData.htmlContent ?? ""}
            onChange={handleChange}
            className="mt-1 w-full rounded border px-3 py-2"
            rows={4}
          />
        </div>

        {/* Image */}
        <div>
          <label className="block font-medium">Feature Image</label>

          {formData.featureImage && (
            <div className="mb-2">
              <img
                src={formData.featureImage}
                alt="featureImage"
                className="h-32 w-32 object-cover rounded-full"
              />
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="bg-blue-500 px-4 py-2 rounded text-white"
          >
            Upload Image
          </button>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="rounded bg-blue-600 px-6 py-2 text-white disabled:opacity-50"
          >
            {status === "submitting" ? "Saving..." : "Save"}
          </button>
          {(status === "success" || isCreated === true) && (
            <p className="mt-2 text-green-500">Article saved successfully!</p>
          )}
          {status === "error" && (
            <p className="mt-2 text-red-500">
              Something went wrong. Try again.
            </p>
          )}
        </div>
      </form>

      {showModal && (
        <ImageUploadModal
          onClose={() => setShowModal(false)}
          onUploadComplete={handleImageUploaded}
        />
      )}
    </>
  );
}
