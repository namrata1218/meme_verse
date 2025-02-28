"use client";
import { useState, useEffect } from "react";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    avatar: "",
  });

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("profile"));
    if (storedProfile) setProfile(storedProfile);
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!profile.name || !profile.bio || !profile.avatar) {
      alert("Please fill all fields!");
      return;
    }

    localStorage.setItem("profile", JSON.stringify(profile));
    alert("Profile Updated!");

    // Clear input fields after saving
    setProfile({ name: "", bio: "", avatar: "" });
  };

  return (
    <div className=" flex flex-col items-center justify-center min-h-screen  p-4">
      <div className="profile-box w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">Edit Profile</h1>

        {/* Profile Picture Upload */}
        <div className="flex flex-col items-center">
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt="Profile"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-gray-300 mb-3"
            />
          ) : (
            <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 mb-3">
              No Image
            </div>
          )}
          <input type="file" onChange={handleImageUpload} className="text-sm text-gray-600" accept="image/*" />
        </div>

        {/* Name Input */}
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          className="block w-full p-2 border rounded mt-3 text-gray-800"
          placeholder="Enter your name"
        />

        {/* Bio Input */}
        <textarea
          name="bio"
          value={profile.bio}
          onChange={handleChange}
          className="block w-full p-2 border rounded mt-3 text-gray-800"
          placeholder="Write your bio"
          rows="3"
        />

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full mt-4 transition"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
}
