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
      <form
        onSubmit={handleSubmit}
        className="space-y-6 text-zinc-600 dark:text-zinc-400"
      >
        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            name="title"
            type="text"
            value={formData.title ?? ""}
            onChange={handleChange}
            className="mt-1 w-full rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-800"
          />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description ?? ""}
            onChange={handleChange}
            className="mt-1 w-full rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-800"
            rows={4}
          />
        </div>

        {/* Content */}
        <div>
          <label className="block font-medium mb-1">Content</label>
          <textarea
            name="htmlContent"
            value={formData.htmlContent ?? ""}
            onChange={handleChange}
            className="mt-1 w-full rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-800"
            rows={6}
          />
        </div>

        {/* Image */}
        <div className="flex flex-col items-start">
          <label className="block font-medium mb-2">Feature Image</label>
          {formData.featureImage && (
            <div className="mb-3">
              <img
                src={formData.featureImage}
                alt="featureImage"
                className="h-32 w-32 object-cover rounded"
              />
            </div>
          )} 
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className=" px-2 py-2 rounded border-1"
          >
            Upload Image
          </button>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="rounded w-full md:w-1/3 px-6 py-2 mt-6 mb-6 bg-fuchsia-800 text-white disabled:opacity-50 transition hover:bg-fuchsia-900"
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
