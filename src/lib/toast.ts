import { toast } from "sonner";

export const showSuccessToast = (message: string) => {
  toast.success(message);
};

export const showErrorToast = (message: string) => {
  toast.error(message);
};

export const showInfoToast = (message: string) => {
  toast.info(message);
};

export const showWarningToast = (message: string) => {
  toast.warning(message);
};

export const showLoadingToast = (message: string) => {
  toast.loading(message);
};

export const dismissToast = () => {
  toast.dismiss();
};

// Export direct pour compatibilité
export { toast };
