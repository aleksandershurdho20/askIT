import Head from "next/head";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { apiInstance } from '../utils/apiInstance'
import InputGroup from "../common/InputGroup/InputGroup";
export default function Register() {
  const [registerData, setRegisterData] = useState({
    email: "",
    username: "",
    password: "",
    agreement: false,
  });
  const [errors, setErrors] = useState<any>({});
  const [hasErrors, setHasErrors] = useState(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    if (name === "agreement") {
      setRegisterData({
        ...registerData,
        agreement: checked
      })
    }
    else {
      setRegisterData({
        ...registerData,
        [name]: value
      })

    }
  }
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await apiInstance.post('auth/register', registerData, { withCredentials: true })
      console.log(data)
    } catch (err) {
      setErrors(err)
    }

  }
  const userNameSvg = (<svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
    />
  </svg>)
  const emailSvg = (<svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
    />
  </svg>)
  const passwordSvg = (<svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
      clipRule="evenodd"
    />
  </svg>)
  return (
    <div className="h-screen md:flex">
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
        <div>
          <h1 className="text-white font-bold text-4xl font-sans">
            GoFinance
          </h1>
          <p className="text-white mt-1">
            The most popular peer to peer lending at SEA
          </p>
          <button
            type="submit"
            className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
          >
            Read More
          </button>
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
      </div>
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        <form className="bg-white">
          <h1 className="text-gray-800 font-bold text-2xl mb-1">
            Hello Again!
          </h1>
          <p className="text-sm font-normal text-gray-600 mb-7">
            Welcome Back
          </p>
          <InputGroup
            type="text"
            placeholder="Username"
            value={registerData.username}
            name="username"
            handleChange={handleChange}
            Svg={userNameSvg}
            hasErrors={hasErrors}
            erorrMessage={errors.username}

          />
          <InputGroup
            type="email"
            placeholder="Email"
            value={registerData.email}
            name="email"
            handleChange={handleChange}
            Svg={emailSvg}
            hasErrors={hasErrors}
            erorrMessage={errors.email}

          />
          <InputGroup
            type="password"
            placeholder="Password"
            value={registerData.password}
            name="password"
            handleChange={handleChange}
            Svg={passwordSvg}
            hasErrors={hasErrors}
            erorrMessage={errors.password}

          />

          <div className="flex items-center justify-between  py-2 px-3 mt-4">
            <div className="flex items-center">
              <input
                id="agreement"
                name="agreement"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={registerData.agreement}
                onChange={handleChange}
              />
              <label
                htmlFor="agreement"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            onClick={onSubmit}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
