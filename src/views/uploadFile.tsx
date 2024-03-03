import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Metadata } from "next";
import { useRouter } from "next/router";
import { Field, Form, Formik } from "formik";
import { useCookies } from "react-cookie";
import useUploadFileStore, { UploadFileStore } from "../store/uploadFile.store";

export const metadata: Metadata = {
  title: "Next.js SignIn Page | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Signin Page TailAdmin Dashboard Template",
};

const UploadFileView: React.FC = () => {
  const router = useRouter();

  const uploadFile = useUploadFileStore((state: unknown) => (state as UploadFileStore).uploadFile);
  const isFileUploaded = useUploadFileStore((state: unknown) => (state as UploadFileStore).isFileUploaded);
  const resetUploadFlag = useUploadFileStore((state: unknown) => (state as UploadFileStore).resetUploadFlag);

  useEffect(() => {
    if (isFileUploaded) {
      router.push("/files");
    }

    return () => resetUploadFlag();
  }, [isFileUploaded]);


  const onSubmitForm = async () => {
    const fileInput = document.getElementById("file"); // Replace with your HTML element ID
    const file = fileInput?.files?.[0];
    const formData = new FormData();
    formData.append("file", file);
    uploadFile(formData, {"Content-Type": "multipart/form-data"});

  }

  return (
    <div className="px-48 py-24">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="w-full xl:block xl:w-full">
            <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
              <div className="w-full p-4 sm:p-12.5 xl:p-17.5"></div>
              <Formik
                initialValues={{}}
                onSubmit={(values) => onSubmitForm(values)}
              >
                {
                  () => (
                    <Form className="mb-4 p-24" encType="multipart/form-data" >
                      <div className=" space-y-6 rounded-md shadow-sm">
                        <div className="mb-6">
                          <div className="relative">
                            <Field
                              type="file"
                              id="file"
                              name="file"
                              accept=".pdf"
                              className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                              placeholder="File"
                            />
                            <span className="absolute right-4 top-4">
                              <svg
                                className="fill-current"
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g opacity="0.5">
                                  <path
                                    d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                                    fill=""
                                  />
                                  <path
                                    d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                                    fill=""
                                  />
                                </g>
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <button type="submit" className="px-12 py-4 w-48 mt-10 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                          Upload
                        </button>
                      </div>
                    </Form>
                  )
                }
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadFileView;