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
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* First Name */}
        <div>
          <label className="block font-medium">First Name</label>
          <input
            name="firstName"
            type="text"
            value={formData.firstName ?? ""}
            onChange={handleChange}
            className="mt-1 w-full rounded border px-3 py-2"
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block font-medium">Last Name</label>
          <input
            name="lastName"
            type="text"
            value={formData.lastName ?? ""}
            onChange={handleChange}
            className="mt-1 w-full rounded border px-3 py-2"
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName}</p>
          )}
        </div>

        {/* Username */}
        <div>
          <label className="block font-medium">Username</label>
          <input
            name="username"
            type="text"
            value={formData.username ?? ""}
            onChange={handleChange}
            className="mt-1 w-full rounded border px-3 py-2"
          />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email ?? ""}
            onChange={handleChange}
            className="mt-1 w-full rounded border px-3 py-2"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Bio */}
        <div>
          <label className="block font-medium">Bio</label>
          <textarea
            name="bio"
            value={formData.bio ?? ""}
            onChange={handleChange}
            className="mt-1 w-full rounded border px-3 py-2"
            rows={4}
          />
        </div>

        {/* Introduction Title */}
        <div>
          <label className="block font-medium">Introduction Title</label>
          <input
            name="introductionTitle"
            type="text"
            value={formData.introductionTitle ?? ""}
            onChange={handleChange}
            className="mt-1 w-full rounded border px-3 py-2"
          />
        </div>

        {/* Introduction Summary */}
        <div>
          <label className="block font-medium">Introduction Summary</label>
          <textarea
            name="introductionSummary"
            value={formData.introductionSummary ?? ""}
            onChange={handleChange}
            className="mt-1 w-full rounded border px-3 py-2"
            rows={4}
          />
        </div>

        {/* Profile Image */}
        <div>
          <label className="block font-medium">Profile Image</label>

          {formData.profileImage && (
            <div className="mb-2">
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
            className="bg-blue-500 px-4 py-2 rounded text-white"
          >
            Upload Image
          </button>
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block font-medium">LinkedIn</label>
          <input
            name="linkedin"
            type="text"
            value={formData.social?.linkedin ?? ""}
            onChange={(e) => handleSocialChange("linkedin", e.target.value)}
            className="mt-1 w-full rounded border px-3 py-2"
          />
        </div>

        {/* Instagram */}
        <div>
          <label className="block font-medium">Instagram</label>
          <input
            name="instagram"
            type="text"
            value={formData.social?.instagram ?? ""}
            onChange={(e) => handleSocialChange("instagram", e.target.value)}
            className="mt-1 w-full rounded border px-3 py-2"
          />
        </div>

        {/* GitHub */}
        <div>
          <label className="block font-medium">GitHub</label>
          <input
            name="github"
            type="text"
            value={formData.social?.github ?? ""}
            onChange={(e) => handleSocialChange("github", e.target.value)}
            className="mt-1 w-full rounded border px-3 py-2"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="rounded bg-blue-600 px-6 py-2 text-white disabled:opacity-50"
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
