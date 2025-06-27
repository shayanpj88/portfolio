"use client";
import { useCallback, useState } from "react";
import axios from "axios";
import ImageUploadModal from "../ui/ImageUploadModal";
import { FormStatus, FormErrors } from "@/types/forms";
import { ProjectForm } from "@/types/project";
import createSlug from "@/util/createSlug";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

interface Props {
  project: ProjectForm;
  mode: "new" | "edit";
}

export default function EditProjectForm({ project, mode }: Props) {
  const [formData, setFormData] = useState<ProjectForm>(project);
  const [errors, setErrors] = useState<FormErrors<ProjectForm>>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [showModal, setShowModal] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const isCreated = searchParams.get("created") === "true";

  const handleImageUploaded = (url: string) => {
    setFormData((prev) => ({ ...prev, featureImage: url }));
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  function validate(): boolean {
    const newErrors: FormErrors<ProjectForm> = {};
    if (!formData.title?.trim()) newErrors.title = "Title is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    const url = "/api/project";
    const method = mode === "edit" ? "put" : "post";

    try {
      await axios({ method, url, data: formData });

      if (mode === "new") {
        window.location.href = `${createSlug(
          formData.title
        )}/edit?created=true`;
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
            rows={3}
            className="mt-1 w-full rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-800"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block font-medium mb-1">Role</label>
          <input
            name="role"
            type="text"
            value={formData.role ?? ""}
            onChange={handleChange}
            className="mt-1 w-full rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-800"
          />
          {errors.role && (
            <p className="text-sm text-red-500 mt-1">{errors.role}</p>
          )}
        </div>

        {/* StartedAt */}
        <div>
          <label className="block font-medium mb-1">Started date</label>
          <input
            name="startedAt"
            type="date"
            value={
              formData.startedAt
                ? new Date(formData.startedAt).toISOString().split("T")[0]
                : ""
            }
            onChange={handleChange}
            className="mt-1 w-full rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-800"
          />
          {errors.startedAt && (
            <p className="text-sm text-red-500 mt-1">{errors.startedAt}</p>
          )}
        </div>

        {/* EndedAt */}
        <div>
          <label className="block font-medium mb-1">Ended date</label>
          <input
            name="endedAt"
            type="date"
            value={
              formData.endedAt
                ? new Date(formData.endedAt).toISOString().split("T")[0]
                : ""
            }
            onChange={handleChange}
            className="mt-1 w-full rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-800"
          />
          {errors.endedAt && (
            <p className="text-sm text-red-500 mt-1">{errors.endedAt}</p>
          )}
        </div>

        {/* Project Url */}
        <div>
          <label className="block font-medium mb-1">Project Url</label>
          <input
            name="projectUrl"
            type="text"
            value={formData.projectUrl ?? ""}
            onChange={handleChange}
            className="mt-1 w-full rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-800"
          />
          {errors.projectUrl && (
            <p className="text-sm text-red-500 mt-1">{errors.projectUrl}</p>
          )}
        </div>

        {/* Content */}
        <div>
          <label className="block font-medium mb-1">Content</label>
          <textarea
            name="htmlContent"
            value={formData.htmlContent ?? ""}
            onChange={handleChange}
            rows={4}
            className="mt-1 w-full rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-800"
          />
        </div>

        {/* Feature Image */}
        <div className="flex flex-col items-start">
          <label className="block font-medium mb-2">Feature Image</label>
          {formData.featureImage && (
            <div className="mb-3 h-34 w-34 relative ">
              <Image
                src={formData.featureImage}
                alt="featureImage"
                fill
                className="object-cover rounded"
              />
            </div>
          )}
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="px-4 py-2 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:ring-2 hover:ring-fuchsia-800 transition"
          >
            Upload Image
          </button>
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="rounded w-full md:w-1/3 px-6 py-2 mt-6 mb-6 bg-fuchsia-800 text-white disabled:opacity-50 transition hover:bg-fuchsia-900"
          >
            {status === "submitting" ? "Saving..." : "Save"}
          </button>
          {(status === "success" || isCreated) && (
            <p className="mt-2 text-green-500">Project saved successfully!</p>
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
