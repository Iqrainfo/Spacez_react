
export const validateField = async (value, setFieldError, errorMessage) => {
    if (!value || !value.trim()) {
      setFieldError(errorMessage);
    } else {
      setFieldError('');
    }
  };
