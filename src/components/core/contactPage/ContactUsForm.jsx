import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CountryCode from "../../../data/countrycode.json";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {};

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstName: "",
        lastName: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);
  return (
    <>
      <form onSubmit={handleSubmit(submitContactForm)}>
        <div className="">
          <div className="flex">
            <div className="">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                {...register("firstName")}
              />
              {errors.firstName && <span>Please enter your first name</span>}
            </div>
            <div className="">
              <label htmlFor="firstName">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter last name"
                {...register("lastName")}
              />
              {errors.lastName && <span>Please enter your last name</span>}
            </div>
          </div>
          <div className="">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email address"
              {...register("email", { required: true })}
            />
            {errors.email && <span>Please enter a valid email address</span>}

            {/* phone number  */}
            <div className="">
              <label htmlFor="phoneNo">Phone Number</label>
              <div className="flex flex-col gap-5">
                <div className="w-[15%] flex gap-5">
                  <select
                    name="dropdown"
                    id="dropdown"
                    {...register("countrycode", { required: true })}
                  >
                    {CountryCode.map((code, ind) => {
                      return (
                        <option value={code.code} key={ind}>
                          {code?.code} - {code.country}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="w-[calc(100%-90px)] flex-col">
                  <input
                    type="text"
                    name="phoneNo"
                    id="phoneNo"
                    placeholder="Enter phone number"
                    {...register("phoneNo", {
                      required: {value:true, message:"please enter phone number"},
                      maxLength: {
                        value: 10,
                        message: "Please enter valid phone number",
                      },
                      minLength: {
                        value: 8,
                        message: "Please enter valid phone number",
                      },
                    })}
                  />
                  {errors.phoneNo && (
                    <span>Please enter a valid phone number</span>
                  )}
                </div>
              </div>
            </div>

            {/* message  */}
            <div className="">
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                id="message"
                cols="30"
                rows="7"
                placeholder="Enter you message"
                {...register("message", { required: true })}
              />
              {errors.message && <span>Please enter your message</span>}
            </div>
          </div>
        </div>
        <CTAButton>Send Message</CTAButton>
      </form>
    </>
  );
};

export default ContactUsForm;
