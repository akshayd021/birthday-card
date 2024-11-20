import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import Envelope from "../animation";
import BirthdayCake from "../github/birthdaycake";

const Landing = () => {
  const [customUrlEnabled, setCustomUrlEnabled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState("");
  const [animation, setAnimation] = useState(false);
  const [copyMessage, setCopyMessage] = useState(""); // State for copy feedback

  const baseCustomUrl = "http://192.168.29.47:3000/user/";

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      message: "",
      customUrlPart: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      age: Yup.number()
        .required("Age is required")
        .positive("Age must be a positive number")
        .integer("Age must be an integer"),
      message: Yup.string().required("Message is required"),
      customUrlPart: customUrlEnabled
        ? Yup.string().required("Custom URL part is required")
        : Yup.string().notRequired(),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const requestData = {
          ...values,
          customUrl: customUrlEnabled ? values.customUrlPart : undefined,
        };

        const response = await axios.post(
          "http://192.168.29.47:5000/api/create-user",
          requestData
        );

        const newUser = response?.data.user;

        const dummyLink = `http://192.168.29.47:3000/user/${
          customUrlEnabled ? values.customUrlPart : newUser._id
        }`;

        setUser({
          ...newUser,
          dummyLink,
        });
        setAnimation(true);
        setTimeout(() => {
          setModalOpen(true);
        }, 8000);
        resetForm();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  const handleToggle = () => {
    setCustomUrlEnabled(!customUrlEnabled);
    if (!customUrlEnabled) {
      formik.setFieldValue("customUrlPart", "");
    }
  };

  const handleCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(user?.dummyLink)
        .then(() => alert("URL copied to clipboard!"))
        .catch((error) => console.error("Failed to copy text:", error));
    } else {
      // Fallback for unsupported browsers
      const textArea = document.createElement("textarea");
      textArea.value = user?.dummyLink;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        alert("URL copied to clipboard!");
      } catch (error) {
        console.error("Failed to copy text:", error);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-md shadow-md mt-10">

      {!animation && (
        <>
          <h2 className="text-lg font-semibold mb-4">
            Enter the birthday person's name, age, and a custom message that
            will appear after they blow out their candles.
          </h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                type="text"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm">{formik.errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Age</label>
              <input
                type="number"
                name="age"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.age}
                className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.age && formik.errors.age && (
                <p className="text-red-500 text-sm">{formik.errors.age}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Message</label>
              <textarea
                name="message"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
                className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              ></textarea>
              {formik.touched.message && formik.errors.message && (
                <p className="text-red-500 text-sm">{formik.errors.message}</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="customUrlToggle"
                checked={customUrlEnabled}
                onChange={handleToggle}
                className="mr-2"
              />
              <label
                htmlFor="customUrlToggle"
                className="text-gray-700 font-medium"
              >
                Use Custom URL
              </label>
            </div>

            {customUrlEnabled && (
              <div>
                <label className="block text-gray-700 font-medium">
                  Custom URL Part
                </label>
                <input
                  type="text"
                  name="customUrlPart"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.customUrlPart}
                  className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter custom part of URL (e.g., test-test)"
                />
                <p className="text-sm text-gray-400">{`${baseCustomUrl}${formik.values.customUrlPart}`}</p>
                {formik.touched.customUrlPart &&
                  formik.errors.customUrlPart && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.customUrlPart}
                    </p>
                  )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Submit
            </button>
          </form>
        </>
      )}

      {animation && (
        <div className="flex justify-center items-center m-auto">
          <Envelope name={user?.name} />
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center transform transition-all duration-300 scale-105">
            <p className="mb-4 text-gray-600">Here's your Link URL:</p>
            <p className="text-blue-600 font-medium underline mb-4">
              <Link to={user?.dummyLink} target="_blank">
                {user?.dummyLink?.length > 40
                  ? `${user?.dummyLink.slice(0, 40)}...`
                  : user?.dummyLink}
              </Link>
            </p>
            <button
              onClick={handleCopy}
              className="px-4 mr-3 py-2 mb-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
            >
              Copy URL
            </button>
            <p className="text-green-500 text-sm mt-2">{copyMessage}</p>{" "}
            {/* Feedback message */}
            <button
              onClick={() => {
                setModalOpen(false);
                setAnimation(false);
              }}
              className="mt-4 ml-3 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
