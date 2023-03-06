import { create } from "zustand";
import { clsx } from "clsx";

type AlertType = "Error" | "Warning" | "Success" | "Info";

interface IUseAlertStore {
  alertText: string;
  alertTitle: string;
  isShowing: boolean;
  type: AlertType;
  trigger: (opts: {
    type?: AlertType;
    text: string;
    title: string;
    duration?: number;
  }) => void;
}

export const useAlertStore = create<IUseAlertStore>()((set) => ({
  alertText: "",
  alertTitle: "",
  isShowing: false,
  type: "Info",
  trigger: ({ duration = 3000, type = "Info", text, title }) => {
    set((_state) => ({
      alertText: text,
      alertTitle: title,
      type: type,
      isShowing: true,
    }));
    setTimeout(() => {
      set((_state) => ({
        alertText: text,
        alertTitle: title,
        type: type,
        isShowing: false,
      }));
    }, duration);
  },
}));

export const useAlert = () => useAlertStore((state) => state.trigger);

export const Alert = () => {
  const { alertText, alertTitle, isShowing, type } = useAlertStore();

  return (
    <div
      className={clsx(`${
        isShowing ? "absolute" : "hidden"
      } top-4 right-3 border-l-4 p-4 w-96 shadow rounded`,{
        'border-blue-500 bg-blue-100 text-blue-700': type === 'Info',
        'border-green-500 bg-green-100 text-green-700': type === 'Success',
        'border-orange-500 bg-orange-100 text-orange-700': type === 'Warning',
        'border-red-500 bg-red-100 text-orange-700': type === 'Error'
      })}
      role="alert"
    >
      <p className="font-bold">{alertTitle}</p>
      <p>{alertText}</p>
    </div>
  );
};
