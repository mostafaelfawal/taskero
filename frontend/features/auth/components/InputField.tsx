import { ReactNode } from "react";

type InputFieldProps = {
  id: string;
  type?: string;
  placeholder?: string;
  icon: ReactNode;
  label: string;
  register: any;
};

export default function InputField({
  id,
  type = "text",
  placeholder,
  icon,
  label,
  register,
}: InputFieldProps) {
  return (
    <>
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      <div className="relative mt-1">
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          {...register}
          className="focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-shadow placeholder-gray-500 w-full rounded-xl border border-gray-200 shadow pl-10 py-2"
        />
        <div className="absolute top-3.5 left-3 text-gray-500">{icon}</div>
      </div>
    </>
  );
}
