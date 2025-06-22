"use client";
import { useCallback, useState } from "react";
import axios from "axios";
import ImageUploadModal from "../ui/ImageUploadModal";
import { FormStatus, FormErrors } from "@/types/forms";
import { ProjectForm } from "@/types/project";
import createSlug from "@/util/createSlug";
import { useSearchParams } from "next/navigation";

interface Props {
  project: ProjectForm;
  mode: "new" | "edit";
}

export default function EditProjectForm({ project, mode }: Props) {
  const [formData, setFormData] = useState<ProjectForm>(project);
  const [errors, setErrors] = useState<FormErrors<ProjectForm>>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [showModal, setShowModal] = useState<Boolean>(false);
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

  function validate(): Boolean {
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

        {/* Role */}
        <div>
          <label className="block font-medium">Role</label>
          <input
            name="role"
            type="text"
            value={formData.role ?? ""}
            onChange={handleChange}
            className="mt-1 w-full rounded border px-3 py-2"
          />
          {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
        </div>

        {/* StartAt */}
        <div>
          <label className="block font-medium">Started date</label>
          <input
            name="startedAt"
            type="date"
            value={formData.startedAt?.toDateString() ?? ""}
            onChange={handleChange}
            className="mt-1 w-full rounded border px-3 py-2"
          />
          {errors.startedAt && (
            <p className="text-sm text-red-500">{errors.startedAt}</p>
          )}
        </div>

        {/* EndedAt */}
        <div>
          <label className="block font-medium">Ended date</label>
          <input
            name="endedAt"
            type="date"
            value={formData.startedAt?.toDateString() ?? ""}
            onChange={handleChange}
            className="mt-1 w-full rounded border px-3 py-2"
          />
          {errors.endedAt && (
            <p className="text-sm text-red-500">{errors.endedAt}</p>
          )}
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
