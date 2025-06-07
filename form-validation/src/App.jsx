import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const App = () => {
  const [formStatus, setFormStatus] = useState(null);
  const [formSubmittedData, setFormSubmittedData] = useState(null);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    countryCode: "+91",
    phoneNumber: "",
    country: "",
    city: "",
    panNumber: "",
    aadharNumber: "",
  });

  const countries = [
    "India",
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "Singapore",
    "UAE",
  ];

  const cities = {
    India: [
      "Mumbai",
      "Delhi",
      "Bangalore",
      "Chennai",
      "Kolkata",
      "Hyderabad",
      "Pune",
      "Ahmedabad",
    ],
    "United States": [
      "New York",
      "Los Angeles",
      "Chicago",
      "Houston",
      "Phoenix",
      "Philadelphia",
    ],
    "United Kingdom": [
      "London",
      "Manchester",
      "Birmingham",
      "Glasgow",
      "Liverpool",
      "Leeds",
    ],
    Canada: [
      "Toronto",
      "Vancouver",
      "Montreal",
      "Calgary",
      "Ottawa",
      "Edmonton",
    ],
    Australia: [
      "Sydney",
      "Melbourne",
      "Brisbane",
      "Perth",
      "Adelaide",
      "Gold Coast",
    ],
    Germany: [
      "Berlin",
      "Munich",
      "Hamburg",
      "Cologne",
      "Frankfurt",
      "Stuttgart",
    ],
    France: ["Paris", "Lyon", "Marseille", "Toulouse", "Nice", "Nantes"],
    Japan: ["Tokyo", "Osaka", "Kyoto", "Yokohama", "Kobe", "Nagoya"],
    Singapore: ["Singapore"],
    UAE: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Fujairah"],
  };

  const countryCodes = [
    { code: "+91", country: "India" },
    { code: "+1", country: "US/Canada" },
    { code: "+44", country: "UK" },
    { code: "+61", country: "Australia" },
    { code: "+49", country: "Germany" },
    { code: "+33", country: "France" },
    { code: "+81", country: "Japan" },
    { code: "+65", country: "Singapore" },
    { code: "+971", country: "UAE" },
  ];

  const ErrorInField = (field, value) => {
    let error = "";
    switch (field) {
      case "firstName":
        if (!value.trim()) {
          error = "First name is required";
        } else if (value.length < 2) {
          error = "First name must contain atleast two character";
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = "First name only contain letter";
        }
        break;
      case "lastName":
        if (!value.trim()) {
          error = "Last name is required";
        } else if (value.length < 2) {
          error = "Last name must contain atleast two character";
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = "Last name only contain letter";
        }
        break;
      case "username":
        if (!value.trim()) {
          error = "Username is required";
        } else if (value.length < 4) {
          error = "Username must be at least 4 characters";
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          error = "Username can only contain letters, numbers, and underscores";
        }
        break;

      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;

      case "password":
        if (!value) {
          error = "Password is required";
        } else if (value.length < 8) {
          error = "Password must be at least 8 characters";
        } else if (
          !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
            value
          )
        ) {
          error =
            "Password must contain uppercase, lowercase, number, and special character";
        }
        break;

      case "phoneNumber":
        if (!value.trim()) {
          error = "Phone number is required";
        } else if (!/^\d{10}$/.test(value.replace(/\s/g, ""))) {
          error = "Phone number must be 10 digits";
        }
        break;

      case "country":
        if (!value) {
          error = "Country is required";
        }
        break;

      case "city":
        if (!value) {
          error = "City is required";
        }
        break;

      case "panNumber":
        if (!value.trim()) {
          error = "PAN number is required";
        } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value.toUpperCase())) {
          error = "PAN number format: XYZOP1234Z";
        }
        break;

      case "aadharNumber":
        if (!value.trim()) {
          error = "Aadhar number is required";
        } else if (!/^\d{12}$/.test(value.replace(/\s/g, ""))) {
          error = "Aadhar number must be 12 digits";
        }
        break;

      default:
        break;
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let currentValue = value;
    if (name === "panNumber") {
      currentValue = value.toUpperCase();
    } else if (name === "aadharNumber") {
      currentValue = value.replace(/\D/g, "").slice(0, 12);
    } else if (name === "phoneNumber") {
      currentValue = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: currentValue,
    }));

    if (name === "country") {
      setFormData((prev) => ({
        ...prev,
        country: currentValue,
        city: "",
      }));
    }

    const error = ErrorInField(name, currentValue);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };
  const isFormValid = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "username",
      "email",
      "password",
      "phoneNumber",
      "country",
      "city",
      "panNumber",
      "aadharNumber",
    ];
    const allFieldsAreFilled = requiredFields.every((field) =>
      formData[field].toString().trim()
    );
    const noErrorFound = Object.values(errors).every((error) => !error);
    return allFieldsAreFilled && noErrorFound;
  };
  const handleFormSubmit = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      if (field !== "countryCode") {
        const error = ErrorInField(field, formData[field]);
        if (error) {
          newErrors[field] = error;
        }
      }
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length == 0) {
      setFormSubmittedData(formData);
      setFormStatus("true");
    }
  };

  if (formStatus == "true") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#74000b] via-[#110e1a] to-[#74000b]">
        <div className="px-4 sm:px-6 lg:px-20 pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-12">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Registration Successful
            </h1>
            <p className="text-amber-100">Registration Details </p>
          </div>
          <div className="grid md:grid-cols-2 text-white gap-6">
            <div className="bg-red-500 backdrop-blur-sm rounded-2xl shadow-xl p-4">
              <h4 className="text-sky-300">Personal Information</h4>
              <div className="space-y-2 p-2">
                <p>First Name : {formSubmittedData.firstName}</p>
                <p>Last Name : {formSubmittedData.lastName}</p>
                <p>UserName : {formSubmittedData.username}</p>
              </div>
            </div>
            <div className="bg-red-500 backdrop-blur-sm rounded-2xl shadow-xl p-4">
              <h4 className="text-sky-300">Contact Information</h4>
              <div className="space-y-2 p-2">
                <p>Email : {formSubmittedData.email}</p>
                <p> Number : {formSubmittedData.phoneNumber}</p>
                <p>Password:{formSubmittedData.password}</p>
              </div>
            </div>
            <div className="bg-red-500 backdrop-blur-sm rounded-2xl shadow-xl p-4">
              <h4 className="text-sky-300">Address Information</h4>
              <div className="space-y-2 p-2">
                <p>Country : {formSubmittedData.country}</p>
                <p>City : {formSubmittedData.city}</p>
              </div>
            </div>
            <div className="bg-red-500 backdrop-blur-sm rounded-2xl shadow-xl p-4">
              <h4 className="text-sky-300">Govt Documents Information</h4>
              <div className="space-y-2 p-2">
                <p>Pan Number : {formSubmittedData.panNumber}</p>
                <p> Aadhar Number : {formSubmittedData.aadharNumber}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#74000b] via-[#110e1a] to-[#74000b] text-white py-12 px-4">
      <div className="p-4 mt-2">
        <h1>Registration Form </h1>
      </div>
      <div className="p-8 ">
        <div>
          <h1>Personal Information</h1>
          <div className="space-y-4 p-2 m-2 grid grid-cols-2 space-x-6">
            <div>
              <label className="text-sm block">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                maxLength={12}
                placeholder="Please Enter Your First Name"
                className={`w-full py-2 border px-4 rounded-lg ${
                  errors.firstName ? "border-red-500" : "border-white"
                }`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label className="text-sm block">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Please Enter Your Last Name"
                className={`w-full py-2 px-4 border rounded-lg ${
                  errors.lastName ? "border-red-500" : "border-white"
                }`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label className="text-sm block">UserName *</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Please Enter Unique Username"
                className={`w-full py-2 border px-4 rounded-lg ${
                  errors.username ? "border-red-500" : "border-white"
                }`}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>
          </div>
        </div>
        <div>
          <h1>Contact Information</h1>
          <div className="space-y-4 p-2 m-2 grid grid-cols-2 space-x-6">
            <div>
              <label className="text-sm block">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Please Enter Your First Name"
                className={`w-full py-2 px-4 border rounded-lg ${
                  errors.email ? "border-red-500" : "border-white"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="text-sm block">Phone Number *</label>
              <div className="flex gap-2">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleInputChange}
                  className="px-3 py-2 border border-sky-300 rounded-lg  bg-red"
                >
                  {countryCodes.map((cc) => (
                    <option
                      key={cc.code}
                      value={cc.code}
                      className="bg-amber-600"
                    >
                      {cc.code} ({cc.country})
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your Phone Number :999999999"
                  className={`w-full py-2 px-4 border rounded-lg ${
                    errors.lastName ? "border-red-500" : "border-white"
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm py-4">Password *</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full py-2 px-4 border rounded-lg ${
                      errors.password ? "border-red-500" : "border-white"
                    }`}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 "
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1>Address Information</h1>
          <div className="space-y-4 p-2 m-2 grid grid-cols-2 space-x-6">
            <div>
              <label className="text-sm block">Country *</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className={`w-full py-2 border rounded-lg cursor-pointer ${
                  errors.country ? "border-red-500" : "border-white"
                }`}
              >
                <option value="" className="bg-amber-600 ">
                  Select your Country
                </option>
                {countries.map((country) => (
                  <option
                    className="bg-amber-600"
                    key={country}
                    value={country}
                  >
                    {country}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">{errors.country}</p>
              )}
            </div>
            <div>
              <label className="text-sm block">City *</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={`w-full py-2 border rounded-lg cursor-pointer ${
                  errors.city ? "border-red-500" : "border-white"
                }
                ${!formData.country ? "bg-orange-600 cursor-not-allowed" : ""}`}
              >
                <option value="" className="bg-amber-600">
                  Select your City
                </option>
                {formData.country &&
                  cities[formData.country]?.map((city) => (
                    <option key={city} className="bg-amber-600" value={city}>
                      {city}
                    </option>
                  ))}
              </select>
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
              )}
            </div>
          </div>
        </div>
        <div>
          <h1>Documents Information</h1>
          <div className="space-y-4 p-2 m-2 grid grid-cols-2 space-x-6">
            <div>
              <label className="text-sm block">Pan Number *</label>
              <input
                type="text"
                name="panNumber"
                value={formData.panNumber}
                onChange={handleInputChange}
                placeholder="Please Enter Your Pan Number : XYXXY8989Z"
                maxLength={10}
                className={`w-full py-2 border rounded-lg p-2 ${
                  errors.panNumber ? "border-red-500" : "border-white"
                }`}
              />
              {errors.panNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.panNumber}</p>
              )}
            </div>
            <div>
              <label className="text-sm block">Aadhar Number *</label>
              <input
                type="text"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleInputChange}
                placeholder="Please Enter Your Aadhar Number"
                className={`w-full py-2 border rounded-lg p-2 ${
                  errors.aadharNumber ? "border-red-500" : "border-white"
                }`}
              />
              {errors.aadharNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.aadharNumber}
                </p>
              )}
            </div>
          </div>
        </div>
        <div>
          <button
            type="button"
            onClick={handleFormSubmit}
            disabled={!isFormValid()}
            className={`px-6 py-3  rounded-lg text-lg font-medium transition-colors duration-300 bg-gradient-to-r from-[#811520] to-[#cb110d]  ${
              isFormValid()
                ? "hover:bg-amber-600 cursor-pointer"
                : "cursor-not-allowed"
            }`}
          >
            {isFormValid()
              ? "Resgistered YOurself"
              : "Please fill all required fields correctly"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
