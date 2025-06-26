"use client";

import { useState } from "react";
import axios from "axios";
import { UserForm } from "@/types/user";
import ImageUploadModal from "../ui/ImageUploadModal";
import { FormStatus,FormErrors } from "@/types/forms";


interface Props {
  user: UserForm;
}


export default function EditProfileForm({ user }: Props) {
  const [formData, setFormData] = useState<UserForm>(user);
  const [errors, setErrors] = useState<FormErrors<UserForm>>({});

  const [status, setStatus] = useState<FormStatus>("idle");
  const [showModal, setShowModal] = useState(false);

  const handleImageUploaded = (url: string) => {
    setFormData((prev) => ({ ...prev, profileImage: url }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = (): boolean => {
    const newErrors: FormErrors<UserForm> = {};

    if (!formData.firstName?.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName?.trim())
      newErrors.lastName = "Last name is required";
    if (!formData.username?.trim()) newErrors.username = "Username is required";
    if (!formData.email?.trim()) newErrors.email = "Email is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    try {
      await axios.put("/api/user", formData);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

const handleSocialChange = (field: keyof UserForm["social"], value: string) => {
const prevSocial = (formData.social ?? {}) as { linkedin?: string; instagram?: string; github?: string };
  setFormData({
    ...formData,
    social: { ...prevSocial, [field]: value },
  });
};



return (
  <>
    <form
      onSubmit={handleSubmit}
      className="space-y-6 text-zinc-600 dark:text-zinc-400"
    >
      {/* First Name */}
      <div>
        <label className="block font-medium mb-1">First Name</label>
        <input
          name="firstName"
          type="text"
          value={formData.firstName ?? ""}
          onChange={handleChange}
          className="mt-1 w-full rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-800"
        />
        {errors.firstName && (
          <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>
        )}
      </div>

      {/* Last Name */}
      <div>
        <label className="block font-medium mb-1">Last Name</label>
        <input
          name="lastName"
          type="text"
          value={formData.lastName ?? ""}
          onChange={handleChange}
          className="mt-1 w-full rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-800"
        />
        {errors.lastName && (
          <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
        )}
      </div>

      {/* Username */}
      <div>
        <label className="block font-medium mb-1">Username</label>
        <input
          name="username"
          type="text"
          value={formData.username ?? ""}
          onChange={handleChange}
          className="mt-1 w-full rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-800"
        />
        {errors.username && (
          <p className="text-sm text-red-500 mt-1">{errors.username}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block font-medium mb-1">Email</label>
        <input
          name="email"
          type="email"
          value={formData.email ?? ""}
          onChange={handleChange}
          className="mt-1 w-full rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-800"
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email}</p>
        )}
      </div>

      {/* Bio */}
      <div>
        <label className="block font-medium mb-1">Bio</label>
        <textarea
          name="bio"
          value={formData.bio ?? ""}
          onChange={handleChange}
          rows={4}
          className="mt-1 w-full rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-800"
        />
      </div>

      {/* Introduction Title */}
      <div>
        <label className="block font-medium mb-1">Introduction Title</label>
        <input
          name="introductionTitle"
          type="text"
          value={formData.introductionTitle ?? ""}
          onChange={handleChange}
          className="mt-1 w-full rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-800"
        />
      </div>

      {/* Introduction Summary */}
      <div>
        <label className="block font-medium mb-1">Introduction Summary</label>
        <textarea
          name="introductionSummary"
          value={formData.introductionSummary ?? ""}
          onChange={handleChange}
          rows={4}
          className="mt-1 w-full rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-800"
        />
      </div>

      {/* Profile Image */}
      <div className="flex flex-col items-start">
        <label className="block font-medium mb-2">Profile Image</label>
        {formData.profileImage && (
          <div className="mb-3">
            <img
              src={formData.profileImage}
              alt="Profile"
              className="h-32 w-32 object-cover rounded-full"
            />
          </div>
        )}
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
        >
          Upload Image
        </button>
      </div>

      {/* LinkedIn */}
      <div>
        <label className="block font-medium mb-1">LinkedIn</label>
        <input
          name="linkedin"
          type="text"
          value={formData.social?.linkedin ?? ""}
          onChange={(e) => handleSocialChange("linkedin", e.target.value)}
          className="mt-1 w-full rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-800"
        />
      </div>

      {/* Instagram */}
      <div>
        <label className="block font-medium mb-1">Instagram</label>
        <input
          name="instagram"
          type="text"
          value={formData.social?.instagram ?? ""}
          onChange={(e) => handleSocialChange("instagram", e.target.value)}
          className="mt-1 w-full rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-800"
        />
      </div>

      {/* GitHub */}
      <div>
        <label className="block font-medium mb-1">GitHub</label>
        <input
          name="github"
          type="text"
          value={formData.social?.github ?? ""}
          onChange={(e) => handleSocialChange("github", e.target.value)}
          className="mt-1 w-full rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-800"
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded w-full md:w-1/3 px-6 py-2 mt-6 mb-6 bg-fuchsia-800 text-white disabled:opacity-50 transition hover:bg-fuchsia-900"
        >
          {status === "submitting" ? "Saving..." : "Save Changes"}
        </button>
        {status === "success" && (
          <p className="mt-2 text-green-500">Profile updated successfully!</p>
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
